import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import useScroll from 'scroll-behavior/lib/useStandardScroll'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import { configureStore } from './src/store'
import routes from './src/routes'


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import customTheme from './src/theme';

let state = window.__initialState__ || undefined
const store = configureStore(browserHistory, state)

//const createScrollHistory = useScroll(createBrowserHistory)
//const appHistory = useRouterHistory(createScrollHistory)()
const history = syncHistoryWithStore(browserHistory, store)

render(
	<MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
	  <Provider store={store}>
	    <Router onUpdate={() => window.scrollTo(0, 0)} history={history} routes={routes} />
	  </Provider>
	</MuiThemeProvider>,
  	document.getElementById('mount')
)
