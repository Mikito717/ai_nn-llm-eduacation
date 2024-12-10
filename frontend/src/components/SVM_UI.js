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

const kernels = ['linear', 'poly', 'rbf', 'sigmoid']
const gammas = ['scale', 'auto']

const SVM_UI = ({ task, username, backToTaskList }) => {
  const [kernel, setKernel] = useState('linear')
  const [C, setC] = useState(1.0)
  const [gamma, setGamma] = useState('scale')
  const [degree, setDegree] = useState(3)
  const [svmdata, setSvmData] = useState({})
  const [loading, setLoading] = useState(false)
  const [svmresult, setSvmResult] = useState('')
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [isclear, setIsClear] = useState(false)

  const handleCreate = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}api/run_svm`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            kernel,
            C,
            gamma,
            degree,
            task,
          }),
        },
      )
      const data = await response.json()
      setSvmData(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = () => {
    if (
      svmdata.accuracy * 100 > task.accuracy &&
      svmdata.elapsed_time < task.timelimit &&
      svmdata.memory_usage < task.memory
    ) {
      setSvmResult('Clear')
      setIsClear(true)
    } else {
      if (svmdata.accuracy * 100 <= task.accuracy) {
        setSvmResult('Fail: Accuracy too low')
      }
      if (svmdata.elapsed_time >= task.timelimit) {
        setSvmResult('Fail: Time limit exceeded')
      }
      if (svmdata.memory_usage >= task.memory) {
        setSvmResult('Fail: Memory usage too high')
      }
    }
    setIsOverlayVisible(true)
  }

  const handleBack = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}api/task_clear`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            accuracy: svmdata.accuracy * 100,
            elapsed_time: svmdata.elapsed_time,
            memory_usage: svmdata.memory_usage,
            task_id: task.id,
            model: 'SVM',
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
        SVM Hyperparameter Configuration
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel>Kernel</InputLabel>
        <Select value={kernel} onChange={(e) => setKernel(e.target.value)}>
          {kernels.map((kernel) => (
            <MenuItem key={kernel} value={kernel}>
              {kernel}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="C"
          type="number"
          value={C}
          onChange={(e) => setC(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Gamma</InputLabel>
        <Select value={gamma} onChange={(e) => setGamma(e.target.value)}>
          {gammas.map((gamma) => (
            <MenuItem key={gamma} value={gamma}>
              {gamma}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Degree"
          type="number"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create Model
      </Button>
      {loading ? (
        <p style={{ color: 'black', fontWeight: 'bold' }}>Loading...</p>
      ) : (
        <p style={{ color: 'black', fontWeight: 'bold' }}>
          Accuracy: {svmdata.accuracy * 100}%, Elapsed Time:{' '}
          {svmdata.elapsed_time} , Memory Usage: {svmdata.memory_usage}GB,
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
            backgroundColor: isclear ? 'green' : 'red',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <div className="overlay-content">
            <h2 style={{ color: 'black' }}>{svmresult}</h2>
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

export default SVM_UI
