import React, { useState } from 'react'

function TaskCreator({ onSubmitTask, onSelectAI, onBack }) {
  const [taskName, setTaskName] = useState('')
  const [selectedAI, setSelectedAI] = useState('')

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
      </select>
      <br />
      <button
        onClick={handleTaskSubmit}
        style={{ fontSize: '24px', marginTop: '10px' }}
      >
        Submit Task
      </button>
      <br />
      <button onClick={onBack} style={{ fontSize: '24px', marginTop: '10px' }}>
        Back
      </button>
    </div>
  )
}

export default TaskCreator
