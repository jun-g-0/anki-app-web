import React from 'react';
import { Container, Typography } from '@material-ui/core';

export default function AnkiQuesList(props) {
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          各種設定
        </Typography>
      </Container>
    </React.Fragment>
  );
}
