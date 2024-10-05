import React, { useState } from 'react'

function TaskCreator({ onSubmitTask, onSelectAI, onBack }) {
  const [taskName, setTaskName] = useState('')
  const [selectedAI, setSelectedAI] = useState('')
  const [device, setDevice] = useState('')
  const [memory, setMemory] = useState('')
  const [accuracy, setAccuracy] = useState('')

  const handleaccuracyChange = (event) => {
    setAccuracy(event.target.value)
  }

  const handleMemoryChange = (event) => {
    setMemory(event.target.value)
  }

  const handleDeviceChange = (event) => {
    setDevice(event.target.value)
  }
  const handleTaskSubmit = () => {
    if (onSubmitTask) onSubmitTask(taskName)
  }

  const handleAIChange = (event) => {
    setSelectedAI(event.target.value)
    if (onSelectAI) onSelectAI(event.target.value)
  }

  return (
    <div>
      <h1>Create Task</h1>
      <input
        type="text"
        placeholder="Enter Task Name Here"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        style={{ fontSize: '24px', width: '300px', marginBottom: '10px' }}
      />
      <br />
      <select
        value={selectedAI}
        onChange={handleAIChange}
        style={{ fontSize: '24px', width: '300px' }}
      >
        <option value="">--choose the AI--</option>
        <option value="ai1">AI 1</option>
        <option value="ai2">AI 2</option>
        <option value="ai3">AI 3</option>
        <option value="ai4">No AI Chosen</option>
      </select>
      <br />
      <textarea
        type="text"
        placeholder="Enter Task Description Here"
        style={{
          fontSize: '24px',
          width: '350px',
          height: '100px',
          marginBottom: '10px',
        }}
      />
      <br />
      <select
        value={device}
        onChange={handleDeviceChange}
        style={{ fontSize: '24px', width: '300px', marginRight: '10px' }}
      >
        <option value="">--choose the device--</option>
        <option value="CPU">CPU</option>
        <option value="GPU">GPU</option>
        <option value="None">No Device chosen</option>
      </select>
      <select
        value={memory}
        onChange={handleMemoryChange}
        style={{ fontSize: '24px', width: '300px' }}
      >
        <option value="">--choose the memory--</option>
        <option value="1GB">1GB</option>
        <option value="4GB">4GB</option>
        <option value="8GB">8GB</option>
        <option value="16GB">16GB</option>
        <option value="None">No Memory Limit</option>
      </select>
      <br />
      <select
        value={accuracy}
        onChange={handleaccuracyChange}
        style={{ fontSize: '24px', width: '300px' }}
      >
        <option value="">--choose the accuracy--</option>
        <option value="90">90%</option>
        <option value="85">85%</option>
        <option value="80">80%</option>
        <option value="75">75%</option>
        <option value="70">70%</option>
      </select>
      <br />
      <button
        onClick={handleTaskSubmit}
        style={{ fontSize: '24px', marginTop: '0px' }}
      >
        Submit Task
      </button>
      <br />
      <button onClick={onBack} style={{ fontSize: '24px', marginTop: '0px' }}>
        Back
      </button>
    </div>
  )
}

export default TaskCreator
