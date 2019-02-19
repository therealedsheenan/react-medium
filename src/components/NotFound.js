import React from 'react';
import { Message, Container } from 'semantic-ui-react';

const NotFound = () => (
  <Container className="container-main">
    <Message align="center">
      <Message.Header>404 Error</Message.Header>
      <p>Page not found.</p>
    </Message>
  </Container>
);

export default NotFound;
