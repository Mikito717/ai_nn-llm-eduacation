import React from 'react'

function LLMEntrance(startgame) {
  const handlestart = () => {
    console.log('start')
    startgame()
  }
  return (
    <div>
      <h1>Welcome to the LLM Entrance</h1>
      <p>
        This is the starting point for interacting with our Language Learning
        Model.
      </p>
      <button onClick={handlestart}>
        Start
        <style>
          {`
            button {
                background-color: #4CAF50;
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
            }
            `}
        </style>
      </button>
    </div>
  )
}

export default LLMEntrance
