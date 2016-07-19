import 'babel-polyfill'

import express from 'express'
import serialize from 'serialize-javascript'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { configureStore } from './src/store'
import routes from './src/routes'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const app = express()
app.use('/public', express.static(__dirname + '/public'))

/* api endpoints */
import comments from './src/api/routes/comments'
app.use('/api/comments', comments)

const comment = require('./src/api/routes/comment')
app.use('/api/parent', comment)

const HTML = ({ content, store }) => (
  <html>
    <head>
      <title>Poem_for_your_sprog_tribute</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <link rel="icon" type="image/png" href="/public/favicon.ico" />

      <link rel='stylesheet' type='text/css' href='/public/style.css' />
      <link href="https://fonts.googleapis.com/css?family=Merriweather:900i|Roboto:300,400,500" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
    </head>
    <body>
      <div id='mount' dangerouslySetInnerHTML={{ __html: content }}/>
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
      <script src='/public/vendor.js' />
      <script src='/public/bundle.js' />
    </body>
  </html>
)

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import customTheme from './src/theme';

app.use(function (req, res, next) {

  const memoryHistory = createMemoryHistory(req.path)
  let store = configureStore(memoryHistory )
  const history = syncHistoryWithStore(memoryHistory, store)

  /* react router match history */
  match({ history, routes , location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            return res.status(500).send(error);
        }

        if (redirectLocation) {
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        if (!renderProps) {
            return next();
        }

       // Create the redux store.
       // const store = createStore();

        let { query, params } = renderProps;
        let url = req.protocol + '://' + req.get('host')
        
        customTheme.userAgent = req.headers['user-agent'];

        // Retrieve the promises from React Router components that have a fetchData method.
        //  We use this data to populate our store for server side rendering.
        const fetchedData = renderProps.components
            .filter(component => component.fetchData)
            .map(component => component.fetchData({params, store, url}));

        // Wait until ALL promises are successful before rendering.
        Promise.all(fetchedData)
            .then(() => {
              const content = renderToString(
                <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
                  <Provider store={store}>
                    <RouterContext {...renderProps}/>
                  </Provider>
                </MuiThemeProvider>
              )
              res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>))
            })
            .catch((err) => {
                // TODO: Perform better error logging.
                console.log(err);
            });
      

    
  })

})


app.listen(5000, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on http://127.0.0.1:5000')
})
