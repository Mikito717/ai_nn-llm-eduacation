import React, { useState } from 'react'
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
} from '@mui/material'

const RF_UI = ({ task, username, backToTaskList }) => {
  const [nEstimators, setNEstimators] = useState(100)
  const [maxDepth, setMaxDepth] = useState(null)
  const [minSamplesSplit, setMinSamplesSplit] = useState(2)
  const [minSamplesLeaf, setMinSamplesLeaf] = useState(1)
  const [rfData, setRfData] = useState({})
  const [loading, setLoading] = useState(false)
  const [rfResult, setRfResult] = useState('')
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [isClear, setIsClear] = useState(false)

  const handleCreate = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/run_randomforest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          n_estimators: nEstimators,
          max_depth: maxDepth,
          min_samples_split: minSamplesSplit,
          min_samples_leaf: minSamplesLeaf,
          task,
        }),
      })
      const data = await response.json()
      setRfData(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = () => {
    if (
      rfData.accuracy * 100 > task.accuracy &&
      rfData.elapsed_time < task.timelimit &&
      rfData.memory_usage < task.memory
    ) {
      setRfResult('Clear')
      setIsClear(true)
    } else {
      if (rfData.accuracy * 100 <= task.accuracy) {
        setRfResult('Fail: Accuracy too low')
      }
      if (rfData.elapsed_time >= task.timelimit) {
        setRfResult('Fail: Time limit exceeded')
      }
      if (rfData.memory_usage >= task.memory) {
        setRfResult('Fail: Memory usage too high')
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
            accuracy: rfData.accuracy * 100,
            elapsed_time: rfData.elapsed_time,
            memory_usage: rfData.memory_usage,
            task_id: task.id,
            model: 'RandomForest',
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
        ランダムフォレストのハイパーパラメータ設定
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="n_estimators"
          type="number"
          value={nEstimators}
          onChange={(e) => setNEstimators(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="max_depth"
          type="number"
          value={maxDepth}
          onChange={(e) => setMaxDepth(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="min_samples_split"
          type="number"
          value={minSamplesSplit}
          onChange={(e) => setMinSamplesSplit(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="min_samples_leaf"
          type="number"
          value={minSamplesLeaf}
          onChange={(e) => setMinSamplesLeaf(e.target.value)}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create Model
      </Button>
      {loading ? (
        <p style={{ color: 'black', fontWeight: 'bold' }}>Loading...</p>
      ) : (
        <p style={{ color: 'black', fontWeight: 'bold' }}>
          Accuracy: {rfData.accuracy * 100}%, Elapsed Time:{' '}
          {rfData.elapsed_time} , Memory Usage: {rfData.memory_usage}GB,
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
            backgroundColor: isClear ? 'green' : 'red',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          <div className="overlay-content">
            <h2 style={{ color: 'black' }}>{rfResult}</h2>
            {isClear && (
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

export default RF_UI
