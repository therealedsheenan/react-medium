import React from 'react';
import { Message, Container } from 'semantic-ui-react';

const NotFound = () => (
  <Container style={{ marginTop: '7em' }}>
    <Message align="center">
      <Message.Header>404 Error</Message.Header>
      <p>Page not found.</p>
    </Message>
  </Container>
);

export default NotFound;
