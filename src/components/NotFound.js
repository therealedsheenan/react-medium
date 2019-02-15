import React from 'react';
import { Message } from 'semantic-ui-react';

const NotFound = () => (
  <Message>
    <Message.Header>404 Error</Message.Header>
    <p>Page not found.</p>
  </Message>
);

export default NotFound;
