import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import Post from './pages/Post/';
import List from './pages/Post/list';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import { postType } from './store/posts/actions';

// Styles
import 'semantic-ui-css/semantic.min.css';
import './styles/main.scss';

const App = () => (
  <main className="App">
    <Switch>
      <Route
        exact
        path="/"
        render={props => <List {...props} postType={postType.published} />}
      />
      <Route
        exact
        path="/drafts"
        render={props => <List {...props} postType={postType.draft} />}
      />
      <Route exact path="/post/:postId" component={Post} />
      <Route exact path="/user/login" component={Login} />
      <Route exact path="/user/new" component={Register} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </main>
);

export default App;
