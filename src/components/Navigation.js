import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react';

const Navigation = () => {
  return (
    <Menu pointing secondary>
      <Menu.Item
        name="React-Medium"
        active={false}
        content="React-Medium"
        onClick={() => {}}
      />
    </Menu>
  );
};

export default Navigation;
