import React, { useState } from 'react'
import {
  TextField,
  MenuItem,
  Button,
  Container,
  Typography,
} from '@mui/material'

const SVM_UI = ({ back }) => {
  const [kernel, setKernel] = useState('linear')
  const [C, setC] = useState(1.0)
  const [gamma, setGamma] = useState('scale')

  const handleKernelChange = (event) => {
    setKernel(event.target.value)
  }

  const handleCChange = (event) => {
    setC(event.target.value)
  }

  const handleGammaChange = (event) => {
    setGamma(event.target.value)
  }
  const handleback = () => {
    back()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle the form submission logic here
    console.log('Kernel:', kernel)
    console.log('C:', C)
    console.log('Gamma:', gamma)
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        SVM Hyperparameter Settings
      </Typography>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            color: 'white',
            backgroundColor: 'skyblue',
            borderRadius: '10px',
          }}
        >
          <TextField
            select
            label="Kernel"
            value={kernel}
            onChange={handleKernelChange}
            variant="outlined"
            margin="normal"
            fullWidth
          >
            <MenuItem value="linear">Linear</MenuItem>
            <MenuItem value="poly">Polynomial</MenuItem>
            <MenuItem value="rbf">RBF</MenuItem>
            <MenuItem value="sigmoid">Sigmoid</MenuItem>
          </TextField>
        </div>
        <div style={{ backgroundColor: 'skyblue', borderRadius: '10px' }}>
          <TextField
            label="C"
            type="number"
            value={C}
            onChange={handleCChange}
            variant="outlined"
            margin="normal"
            fullWidth
            inputProps={{ step: 0.1 }}
          />
        </div>
        <div style={{ backgroundColor: 'skyblue', borderRadius: '10px' }}>
          <TextField
            select
            label="Gamma"
            value={gamma}
            onChange={handleGammaChange}
            variant="outlined"
            margin="normal"
            fullWidth
          >
            <MenuItem value="scale">Scale</MenuItem>
            <MenuItem value="auto">Auto</MenuItem>
          </TextField>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <div>
        <button onClick={handleback}>Back</button>
      </div>
    </Container>
  )
}

export default SVM_UI
