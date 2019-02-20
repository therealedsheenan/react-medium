import React from 'react';
import { Container, Segment, Grid, Header, Divider } from 'semantic-ui-react';

const Footer = () => (
  <footer className="footer">
    <Divider section />
    <Segment vertical>
      <Container textAlign="center">
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column>
              <Header as="h4" content="React-Medium" />
              <p>React implementation of Medium clone</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </footer>
);

export default Footer;
