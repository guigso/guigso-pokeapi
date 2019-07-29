import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/lading';
import Pokedex from './pages/pokedex';
import Pokemon from './pages/pokemon';
import Layout from './components/layout';

const Routes = () => (
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/pokedex' component={Pokedex} />
        <Route path='/pokemon/:id' component={Pokemon} />
      </Switch>
    </Layout>
  </BrowserRouter>
);

export default Routes;
