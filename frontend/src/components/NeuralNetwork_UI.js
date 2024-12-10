import React, { useState } from 'react'
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'

const NeuralNetworkUI = ({ task, username, backToTaskList }) => {
  const [layers, setLayers] = useState([32, 64])
  const [learningRate, setLearningRate] = useState('')
  const [epochs, setEpochs] = useState('')
  const [modelType, setModelType] = useState('NN') // モデルタイプの状態を追加
  const [nnData, setNnData] = useState({})
  const [loading, setLoading] = useState(false)
  const [nnResult, setNnResult] = useState('')
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [isClear, setIsClear] = useState(false)
  const [algorithm, setAlgorithm] = useState('adam')

  const handleLayerChange = (index, value) => {
    const newLayers = [...layers]
    newLayers[index] = value
    setLayers(newLayers)
  }

  const addLayer = () => {
    setLayers([...layers, ''])
  }

  const removeLayer = (index) => {
    const newLayers = layers.filter((_, i) => i !== index)
    setLayers(newLayers)
  }

  const handleCreate = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/run_NN`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          layers: layers.map(Number),
          learning_rate: parseFloat(learningRate),
          epochs: parseInt(epochs),
          task,
          model_type: modelType, // モデルタイプを送信
          algorithm, // アルゴリズムを送信
        }),
      })
      const data = await response.json()
      setNnData(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = () => {
    if (
      nnData.accuracy * 100 > task.accuracy &&
      nnData.elapsed_time < task.timelimit &&
      nnData.memory_usage < task.memory
    ) {
      setNnResult('Clear')
      setIsClear(true)
    } else {
      if (nnData.accuracy * 100 <= task.accuracy) {
        setNnResult('Fail: Accuracy too low')
      }
      if (nnData.elapsed_time >= task.timelimit) {
        setNnResult('Fail: Time limit exceeded')
      }
      if (nnData.memory_usage >= task.memory) {
        setNnResult('Fail: Memory usage too high')
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
            accuracy: nnData.accuracy * 100,
            elapsed_time: nnData.elapsed_time,
            memory_usage: nnData.memory_usage,
            task_id: task.id,
            model: 'NeuralNetwork',
            algorithm: algorithm, // 学習アルゴリズムを追加
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
      <Typography variant="h5" gutterBottom color="black">
        ニューラルネットワークのハイパーパラメータ設定
      </Typography>
      <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
        {layers.map((layer, index) => (
          <FormControl fullWidth margin="normal" key={index}>
            <TextField
              label={`Layer ${index + 1} Neurons`}
              type="number"
              value={layer}
              onChange={(e) => handleLayerChange(index, e.target.value)}
            />
            <Button onClick={() => removeLayer(index)}>Remove Layer</Button>
          </FormControl>
        ))}
      </div>
      <Button onClick={addLayer}>Add Layer</Button>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Learning Rate"
          type="number"
          value={learningRate}
          onChange={(e) => setLearningRate(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Epochs"
          type="number"
          value={epochs}
          onChange={(e) => setEpochs(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <Select
          value={modelType}
          onChange={(e) => setModelType(e.target.value)}
        >
          <MenuItem value="NN">NN</MenuItem>
          <MenuItem value="CNN">CNN</MenuItem>
          <MenuItem value="RNN">RNN</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <Select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          displayEmpty
        >
          <MenuItem value="adam">Adam</MenuItem>
          <MenuItem value="sgd">SGD</MenuItem>
          <MenuItem value="rmsprop">RMSprop</MenuItem>
          {/* 他のアルゴリズムも追加可能 */}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Create Model
      </Button>
      {loading ? (
        <p style={{ color: 'black', fontWeight: 'bold' }}>Loading...</p>
      ) : (
        <p style={{ color: 'black', fontWeight: 'bold' }}>
          Accuracy: {nnData.accuracy * 100}%, Elapsed Time:{' '}
          {nnData.elapsed_time} , Memory Usage: {nnData.memory_usage}GB,
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
            <h2 style={{ color: 'black' }}>{nnResult}</h2>
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

export default NeuralNetworkUI
