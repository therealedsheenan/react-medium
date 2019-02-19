import React from 'react';
import { Message, Container } from 'semantic-ui-react';

import Navigation from './Navigation';

const NotFound = () => (
  <Container className="container-main">
    <Navigation />
    <Message align="center">
      <Message.Header>404 Error</Message.Header>
      <p>Page not found.</p>
    </Message>
  </Container>
);

export default NotFound;
