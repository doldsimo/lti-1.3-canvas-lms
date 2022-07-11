import React from 'react'
import Home from './pages/home'
import Grades from './pages/grades'
import NamesAndRoles from './pages/namesandroles'
import DeepLink from './pages/deeplink'
import LandingPage from './pages/landingPage'
import Informations from './pages/informations.js'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

export default function App () {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/grades'>
          <Grades />
        </Route>
        <Route path='/informations'>
          <Informations />
        </Route>
        <Route path='/namesandroles'>
          <NamesAndRoles />
        </Route>
        <Route path='/deeplink'>
          <DeepLink />
        </Route>
        <Route path='/nolti'>
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  )
}
