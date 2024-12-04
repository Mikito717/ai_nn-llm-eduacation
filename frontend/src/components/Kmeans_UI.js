import React, { useState } from 'react'
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
} from '@mui/material'

const Kmeans_UI = ({ task, username, backToTaskList }) => {
  const [nClusters, setNClusters] = useState(8)
  const [init, setInit] = useState('k-means++')
  const [nInit, setNInit] = useState(10)
  const [maxIter, setMaxIter] = useState(300)
  const [tol, setTol] = useState(0.0001)
  const [kmeansData, setKmeansData] = useState({})
  const [loading, setLoading] = useState(false)
  const [kmeansResult, setKmeansResult] = useState('')
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [isClear, setIsClear] = useState(false)

  const handleCreate = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/run_kmeans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          n_clusters: nClusters,
          init,
          n_init: nInit,
          max_iter: maxIter,
          tol,
          task,
        }),
      })
      const data = await response.json()
      setKmeansData(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = () => {
    if (
      kmeansData.silhouette < task.accuracy &&
      kmeansData.elapsed_time < task.timelimit &&
      kmeansData.memory_usage < task.memory
    ) {
      setKmeansResult('Clear')
      setIsClear(true)
    } else {
      if (kmeansData.silhouette >= task.accuracy) {
        setKmeansResult('Fail: Inertia too high')
      }
      if (kmeansData.elapsed_time >= task.timelimit) {
        setKmeansResult('Fail: Time limit exceeded')
      }
      if (kmeansData.memory_usage >= task.memory) {
        setKmeansResult('Fail: Memory usage too high')
      }
    }
    setIsOverlayVisible(true)
  }

  const handleBack = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/task_clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          accuracy: kmeansData.silhouette,
          elapsed_time: kmeansData.elapsed_time,
          memory_usage: kmeansData.memory_usage,
          task_id: task.id,
          model: 'KMeans',
        }),
      })
    } catch (error) {
      console.error('Error:', error)
    }

    backToTaskList()
  }

  return (
    <Container style={{ backgroundColor: 'white', width: '500px' }}>
      <Typography variant="h5" gutterBottom color="black">
        KMeansのハイパーパラメータ設定
      </Typography>
      <FormControl fullWidth margin="normal" style={{ color: 'white' }}>
        <TextField
          label="n_clusters"
          type="number"
          value={nClusters}
          onChange={(e) => setNClusters(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="init"
          type="text"
          value={init}
          onChange={(e) => setInit(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="n_init"
          type="number"
          value={nInit}
          onChange={(e) => setNInit(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="max_iter"
          type="number"
          value={maxIter}
          onChange={(e) => setMaxIter(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="tol"
          type="number"
          value={tol}
          onChange={(e) => setTol(e.target.value)}
        />
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create Model
      </Button>
      {loading ? (
        <p style={{ color: 'black', fontWeight: 'bold' }}>Loading...</p>
      ) : (
        <p style={{ color: 'black', fontWeight: 'bold' }}>
          silhouette: {kmeansData.silhouette}, Elapsed Time:{' '}
          {kmeansData.elapsed_time}, Memory Usage: {kmeansData.memory_usage}GB,
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
            <h2 style={{ color: 'black' }}>{kmeansResult}</h2>
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
            </Button>{' '}
          </div>
        </div>
      )}
    </Container>
  )
}

export default Kmeans_UI
