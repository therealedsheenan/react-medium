import React from 'react';
import { Container, Segment, Grid, Header, Divider } from 'semantic-ui-react';

const Footer = () => (
  <Segment
    inverted
    style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
    vertical
  >
    <Container textAlign="center">
      <Grid divided stackable inverted>
        <Grid.Row>
          <Grid.Column>
            <Header inverted as="h4" content="React-Medium" />
            <p>React implementation of Medium clone</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider inverted section />
    </Container>
  </Segment>
);

export default Footer;
