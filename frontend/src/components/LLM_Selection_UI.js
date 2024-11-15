import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const LLMSelectionUI = ({ onchange, goback, currentanswer, gotoresult }) => {
  const [selectedButton, setSelectedButton] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleClick = (buttonNumber) => {
    console.log(`Button ${buttonNumber} clicked`)
    setSelectedButton(buttonNumber)
    onchange(buttonNumber)
  }

  const handlegoBack = () => {
    goback()
  }

  const handleSubmit = () => {
    const isConfirmed = window.confirm('Do you really want to submit it?')
    if (isConfirmed) {
      // 提出のロジックをここに追加
      console.log('Submission confirmed.')
      setSnackbarOpen(true)
      gotoresult()
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const announceAnswer = () => {
    if (!currentanswer || !Array.isArray(currentanswer)) {
      return null
    }

    const answerLabels = {
      '-1': 'unanswered',
      1: 'Language.',
      2: 'politics',
      3: 'ethics',
      4: 'science',
      5: 'social norm',
      6: 'health',
      7: 'joke',
    }

    const validAnswers = currentanswer.slice(0, 6)
    if (validAnswers.length > 0) {
      return (
        <div>
          <p>Current answers:</p>
          <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
            {validAnswers.map((answer, index) => (
              <li key={index} style={{ marginRight: '10px' }}>
                {index + 1}: {answerLabels[answer] || '不明'}
              </li>
            ))}
          </ul>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <div>
        <h1>LLMs Selection </h1>
      </div>
      <div>{announceAnswer()}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num)}
            style={{
              backgroundColor: selectedButton === num ? '#4CAF50' : '#008CBA', // 選択されたボタンの色を変更
              color: 'white',
              fontSize: '20px',
              padding: '20px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              width: '130px', // 幅を100%に設定
              height: '50px', // 高さを100%に設定
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {num}
          </button>
        ))}
      </div>
      <button
        onClick={() => handlegoBack()}
        style={{
          marginTop: '5px',
          padding: '5px 20px',
          fontSize: '16px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          height: '30px',
          width: '150px',
          marginRight: '10px', // Add margin to the right
        }}
      >
        Back
      </button>
      <button
        onClick={() => handleSubmit()}
        style={{
          marginTop: '5px',
          padding: '5px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          height: '30px',
          width: '150px',
        }}
      >
        Submit
      </button>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Submission confirmed.
        </MuiAlert>
      </Snackbar>

      <div>
        <h1>Rule Description.</h1>
        <p>1. Select one of the six buttons.</p>
        <p>2. The dialogue with the selected LLM begins.</p>
        <p>
          3. These LLMs have one of the following biases
          <br />
          Spot the lies and choose which LLMs have which bias.
        </p>
        <p>
          bias collection
          <br />
          A: Language, B: Politics, C: Ethics, D: Science, E: Social norms, F:
          Health, G: Jokes
        </p>
      </div>
    </>
  )
}

export default LLMSelectionUI
