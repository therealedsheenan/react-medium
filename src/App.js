import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import Home from './pages/Home/';
import Post from './pages/Post/';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';

// Styles
import 'semantic-ui-css/semantic.min.css';
import './styles/main.scss';

const App = () => (
  <main className="App">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/post/:postId" component={Post} />
      <Route exact path="/user/login" component={Login} />
      <Route exact path="/user/new" component={Register} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </main>
);

export default App;
