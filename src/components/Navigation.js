import React from 'react';

import { Link } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';

const Navigation = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item active={false}>
          <Link to="/">React Medium</Link>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navigation;
