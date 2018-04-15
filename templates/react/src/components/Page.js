import React from 'react';
import { HashRouter, Route, IndexRoute, Switch, Redirect } from 'react-router-dom';
import configData from '@/lib/config';
import App from './App';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" render={() => <Redirect to={`/${configData.defaultUrl}`} push />} />
      <Route exact path="*" component={App} />
    </Switch>
  </HashRouter>
)
