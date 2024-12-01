import React, { useState } from 'react'
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'

const algorithms = ['auto', 'ball_tree', 'kd_tree', 'brute']
const metrics = ['euclidean', 'manhattan', 'chebyshev', 'minkowski']

const KNN_UI = ({ task }) => {
  const [nNeighbors, setNNeighbors] = useState(5)
  const [algorithm, setAlgorithm] = useState('auto')
  const [metric, setMetric] = useState('minkowski')
  const [knndata, setKnnData] = useState({})

  const handleCreate = async () => {
    // Handle the submission of the form
    console.log('nNeighbors:', nNeighbors)
    console.log('Algorithm:', algorithm)
    console.log('Metric:', metric)
    try {
      const responce = await fetch('http://localhost:5000/run_knn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nNeighbors,
          algorithm,
          metric,
        }),
      })
      const data = await responce.json()
      console.log('Data:', data)
      setKnnData(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const handleSubmit = () => {
    if (knndata.accuracy * 100 > task.accuracy) {
      console.log('Clear')
    } else {
      console.log('Fail')
    }
  }

  return (
    <Container style={{ backgroundColor: 'white', width: '500px' }}>
      <Typography variant="h4" gutterBottom color="black">
        KNN Hyperparameter Configuration
      </Typography>
      <TextField
        label="Number of Neighbors"
        type="number"
        value={nNeighbors}
        onChange={(e) => setNNeighbors(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Algorithm</InputLabel>
        <Select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          {algorithms.map((algo) => (
            <MenuItem key={algo} value={algo}>
              {algo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Metric</InputLabel>
        <Select value={metric} onChange={(e) => setMetric(e.target.value)}>
          {metrics.map((metric) => (
            <MenuItem key={metric} value={metric}>
              {metric}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create Model
      </Button>
      <p style={{ color: 'black', fontWeight: 'bold' }}>
        Accuracy: {knndata.accuracy * 100}%
      </p>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Model
      </Button>
    </Container>
  )
}

export default KNN_UI
