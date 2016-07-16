import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'

/* container components */
import App from './containers/App'
import Home from './containers/Home/Home'
import List from './containers/List/List'


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="list" component={List} />
  </Route>
)

export default routes
