import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'

const LLMResultUI = ({ finalanswer, correctanswer, onback }) => {
  const score = finalanswer.filter((v, i) => v === correctanswer[i]).length
  const results = finalanswer.map((v, i) => ({
    text: `${i + 1}: ${v === correctanswer[i] ? '○' : '×'}`,
    isCorrect: v === correctanswer[i],
  }))

  const sendResultsToBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          finalanswer,
          correctanswer,
          score,
        }),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log('Success:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    sendResultsToBackend()
  }, [])

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="500px"
      width="500px"
      bgcolor="grey.200"
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        style={{ color: '#3f51b5' }}
      >
        ゲームのスコア
      </Typography>
      <Typography variant="h4" component="p" style={{ color: 'green' }}>
        あなたのスコアは
        <span style={{ color: '#ff4081' }}>{score}</span>
      </Typography>
      <Box mt={2} display="flex" flexWrap="wrap" justifyContent="center">
        {results.map((result, index) => (
          <Typography
            key={index}
            variant="h6"
            component="span"
            style={{
              margin: '0 8px',
              color: result.isCorrect ? 'green' : 'red',
            }}
          >
            {result.text}
          </Typography>
        ))}
      </Box>
      <Typography variant="h6" component="span" style={{ color: 'white' }}>
        <button
          onClick={onback}
          style={{
            marginTop: '20px',
            backgroundColor: 'green',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = 'darkgreen')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'green')}
        >
          最初に戻る
        </button>
      </Typography>
    </Box>
  )
}

export default LLMResultUI
