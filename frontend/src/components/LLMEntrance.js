import React from 'react'
import { Button, Container, Typography, Box } from '@mui/material'

function LLMEntrance({ startgame, endgame }) {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to the LLM Entrance
      </Typography>
      <Typography variant="body1" paragraph>
        This is the starting point for interacting with our Language Learning
        Model.
      </Typography>
      <Box mt={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Rule Description.
        </Typography>
        <Typography variant="body2" paragraph>
          Six unusual LLMs appear in this game. These LLMs are independent of
          each other and do not know each other. You ask these LLMs questions
          and try to guess which LLM has what bias.
        </Typography>
      </Box>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={startgame}
          style={{ marginRight: '10px' }}
        >
          Start
        </Button>
        <Button variant="outlined" color="secondary" onClick={endgame}>
          End
        </Button>
      </Box>
    </Container>
  )
}

export default LLMEntrance
