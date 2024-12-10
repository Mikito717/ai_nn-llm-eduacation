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
const memoryLimits = ['1', '2', '4', '8', '16']

const KNN_UI = ({ task, username, backToTaskList }) => {
  const [nNeighbors, setNNeighbors] = useState(5)
  const [algorithm, setAlgorithm] = useState('auto')
  const [metric, setMetric] = useState('minkowski')
  const [memorylimit, setMemoryLimit] = useState('1')
  const [knndata, setKnnData] = useState({})
  const [loading, setLoading] = useState(false)
  const [knnresult, setKnnResult] = useState('')
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [isclear, setIsClear] = useState(false)

  const handleCreate = async () => {
    setLoading(true)
    try {
      const responce = await fetch(`${process.env.REACT_APP_API_URL}/run_knn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nNeighbors,
          algorithm,
          metric,
          memorylimit,
          task,
        }),
      })
      const data = await responce.json()
      setKnnData(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = () => {
    if (
      knndata.accuracy * 100 > task.accuracy &&
      knndata.elapsed_time < task.timelimit &&
      knndata.memory_usage < task.memory
    ) {
      setKnnResult('Clear')
      setIsClear(true)
    } else {
      if (knndata.accuracy * 100 <= task.accuracy) {
        setKnnResult('Fail: Accuracy too low')
      }
      if (knndata.elapsed_time >= task.timelimit) {
        setKnnResult('Fail: Time limit exceeded')
      }
      if (knndata.memory_usage >= task.memory) {
        setKnnResult('Fail: Memory usage too high')
      }
    }
    setIsOverlayVisible(true)
  }

  const handleBack = async () => {
    try {
      const responce = await fetch(
        `${process.env.REACT_APP_API_URL}api/task_clear`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            accuracy: knndata.accuracy * 100,
            elapsed_time: knndata.elapsed_time,
            memory_usage: knndata.memory_usage,
            task_id: task.id,
            model: 'KNN',
          }),
        },
      )
    } catch (error) {
      console.error('Error:', error)
    }

    backToTaskList()
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
      <FormControl fullWidth margin="normal">
        <InputLabel>Memory Limit</InputLabel>
        <Select
          value={memorylimit}
          onChange={(e) => setMemoryLimit(e.target.value)}
        >
          {memoryLimits.map((limit) => (
            <MenuItem key={limit} value={limit}>
              {limit}GB
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create Model
      </Button>
      {loading ? (
        <p style={{ color: 'black', fontWeight: 'bold' }}>Loading...</p>
      ) : (
        <p style={{ color: 'black', fontWeight: 'bold' }}>
          Accuracy: {knndata.accuracy * 100}%, Elapsed Time:{' '}
          {knndata.elapsed_time} , Memory Usage: {knndata.memory_usage}
          {'GB'},
        </p>
      )}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Model
      </Button>
      {isOverlayVisible && (
        <div
          className="overlay"
          style={{
            position: 'fixed',
            zIndex: 1000,
            top: '50%',
            backgroundColor: { isclear } ? 'green' : 'red',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <div className="overlay-content">
            <h2 style={{ color: 'black' }}>{knnresult}</h2>
            {isclear && (
              <Button variant="contained" color="primary" onClick={handleBack}>
                Back to Task List
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsOverlayVisible(false)}
            >
              Retry
            </Button>
          </div>
        </div>
      )}
    </Container>
  )
}

export default KNN_UI
