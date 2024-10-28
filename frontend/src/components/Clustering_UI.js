import React, { useState } from 'react'
import { TextField, Button, Grid, Typography, Container } from '@mui/material'

const ClusteringUI = () => {
  const [numClusters, setNumClusters] = useState('')
  const [maxIterations, setMaxIterations] = useState('')
  const [tolerance, setTolerance] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle the form submission logic here
    console.log('Number of Clusters:', numClusters)
    console.log('Max Iterations:', maxIterations)
    console.log('Tolerance:', tolerance)
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Clustering Hyperparameters
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Number of Clusters"
              variant="outlined"
              fullWidth
              value={numClusters}
              onChange={(e) => setNumClusters(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Max Iterations"
              variant="outlined"
              fullWidth
              value={maxIterations}
              onChange={(e) => setMaxIterations(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tolerance"
              variant="outlined"
              fullWidth
              value={tolerance}
              onChange={(e) => setTolerance(e.target.value)}
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

export default ClusteringUI
