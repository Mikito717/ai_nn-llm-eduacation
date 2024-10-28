import React, { useState } from 'react'
import { TextField, Button, Grid, Typography, Container } from '@mui/material'

const NeuralNetworkUI = () => {
  const [layers, setLayers] = useState('')
  const [neurons, setNeurons] = useState('')
  const [learningRate, setLearningRate] = useState('')
  const [epochs, setEpochs] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const hyperparameters = {
      layers: parseInt(layers),
      neurons: parseInt(neurons),
      learningRate: parseFloat(learningRate),
      epochs: parseInt(epochs),
    }
    console.log(hyperparameters)
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Neural Network Hyperparameters
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Number of Layers"
              variant="outlined"
              fullWidth
              value={layers}
              onChange={(e) => setLayers(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Neurons per Layer"
              variant="outlined"
              fullWidth
              value={neurons}
              onChange={(e) => setNeurons(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Learning Rate"
              variant="outlined"
              fullWidth
              value={learningRate}
              onChange={(e) => setLearningRate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Epochs"
              variant="outlined"
              fullWidth
              value={epochs}
              onChange={(e) => setEpochs(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default NeuralNetworkUI
