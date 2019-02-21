import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from './components/NotFound';
import Footer from './components/Footer';
import ShowPost from './pages/Post/show';
import List from './pages/Post/';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import UserProfile from './pages/User/profile';
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
      <Route exact path="/post/:postId" component={ShowPost} />
      <Route exact path="/user/login" component={Login} />
      <Route exact path="/user/profile" component={UserProfile} />
      <Route exact path="/user/new" component={Register} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </main>
);

export default App;
