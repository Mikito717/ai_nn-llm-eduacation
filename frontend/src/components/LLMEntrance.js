import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';

function LLMEntrance({ startgame, endgame }) {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to the LLM Entrance
      </Typography>
      <Typography variant="body1" paragraph>
        This is the starting point for interacting with our Language Learning Model.
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={startgame} style={{ marginRight: '10px' }}>
          Start
        </Button>
        <Button variant="outlined" color="secondary" onClick={endgame}>
          End
        </Button>
      </Box>
    </Container>
  );
}

export default LLMEntrance;
