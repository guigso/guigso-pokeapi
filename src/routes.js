import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/lading';
import Pokedex from './pages/pokedex';
import Layout from './components/layout';

const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/pokedex' component={Pokedex} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Routes;
