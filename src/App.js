import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import Home from './pages/Home/';
import Post from './pages/Post/';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import './App.css';

import 'semantic-ui-css/semantic.min.css';

const App = () => (
  <main className="App">
    <Navigation />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/post/:postId" component={Post} />
      <Route path="/user/login" component={Login} />
      <Route path="/user/new" component={Register} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </main>
);

export default App;
