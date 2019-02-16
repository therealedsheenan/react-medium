import React from 'react';
import { Item, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export const getFullName = (firstName, lastName) => (
  <p>
    {firstName} - {lastName}
  </p>
);

const Author = ({ author }) => (
  <Item.Group>
    <Header as="h3" dividing>
      About the author
    </Header>
    <Item>
      <Item.Image size="tiny" src="http://i.pravatar.cc/300" />
      <Item.Content>
        <Item.Header>
          {getFullName(
            author.userProfile.firstName,
            author.userProfile.lastName
          )}
        </Item.Header>
        <Item.Meta>Contact</Item.Meta>
        <Item.Description>{author.email}</Item.Description>
      </Item.Content>
    </Item>
  </Item.Group>
);

Author.propTypes = {
  author: PropTypes.object.isRequired
};

export default Author;
