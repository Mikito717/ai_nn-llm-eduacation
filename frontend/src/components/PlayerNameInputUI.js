import React, { useState } from 'react'
import { TextField, Button, Box, Typography } from '@mui/material'

const PlayerNameInputUI = ({ onNameSubmit }) => {
  const [playerName, setPlayerName] = useState('')
  const [password, setPassword] = useState('')
  const [initialRegistration, setInitialRegistration] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault()
    setInitialRegistration(false)
    console.log(playerName, password, initialRegistration)
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: playerName,
          password,
          initialRegistration,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        onNameSubmit(data.playerName)
        alert(data.message) // アラートボックスで通知
      } else {
        alert(data.message) // アラートボックスで通知
        console.error('Error submitting name:', response.statusText)
      }
    } catch (error) {
      console.error('Error submitting name:', error)
    }
    setPassword('')
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          p: 2,
          border: '1px solid #ccc',
          borderRadius: 1,
          backgroundColor: 'white',
          width: '100%',
        }}
      >
        <Typography variant="h5" component="div" color="black">
          ログイン(login)/登録(registration)
        </Typography>
        <TextField
          label="ユーザー名"
          variant="outlined"
          value={playerName}
          onChange={(event) => setPlayerName(event.target.value)}
          placeholder="ユーザー名を入力してください"
          fullWidth
        />
        <TextField
          label="パスワード"
          variant="outlined"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="パスワードを入力してください"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          送信
        </Button>
      </Box>
    </>
  )
}

export default PlayerNameInputUI
