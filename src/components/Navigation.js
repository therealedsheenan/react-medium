import React from 'react';

import { Link } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react';

const Navigation = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item active={false}>
          <Link to="/">React Medium</Link>
        </Menu.Item>
        <Menu.Item active={false} position="right">
          <Button inverted>
            <Link to="/user/login">Login </Link>
          </Button>
          <Button inverted style={{ marginLeft: '0.5em' }}>
            <Link to="/user/new"> Sign Up</Link>
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navigation;
