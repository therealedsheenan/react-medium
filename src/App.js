import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import Home from './pages/Home/';
import './App.css';

import 'semantic-ui-css/semantic.min.css';

const App = () => (
  <main className="App">
    <Navigation />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </main>
);

export default App;
