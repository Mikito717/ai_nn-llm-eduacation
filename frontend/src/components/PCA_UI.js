import React, { useState } from 'react'
import { TextField, Button, Container, Typography, Slider } from '@mui/material'

const PCAUI = () => {
  const [nComponents, setNComponents] = useState(2)
  const [tolerance, setTolerance] = useState(0.0)
  const [maxIter, setMaxIter] = useState(1000)

  const handleSubmit = () => {
    // Handle the submission of PCA parameters
    console.log({ nComponents, tolerance, maxIter })
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        PCA Hyperparameter Settings
      </Typography>
      <TextField
        label="Number of Components"
        type="number"
        value={nComponents}
        onChange={(e) => setNComponents(Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      <Typography gutterBottom>Tolerance</Typography>
      <Slider
        value={tolerance}
        onChange={(e, newValue) => setTolerance(newValue)}
        step={0.01}
        min={0.0}
        max={1.0}
        valueLabelDisplay="auto"
      />
      <TextField
        label="Max Iterations"
        type="number"
        value={maxIter}
        onChange={(e) => setMaxIter(Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  )
}

export default PCAUI
