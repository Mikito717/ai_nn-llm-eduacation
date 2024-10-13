import React, { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'

const PlayerNameInputUI = ({ onNameSubmit }) => {
  const [playerName, setPlayerName] = useState('')

  const handleSubmit = (event) => {
    setPlayerName(event.target.value)
    event.preventDefault()
    onNameSubmit(playerName)
    setPlayerName('')
  }

  return (
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
      }}
    >
      <TextField
        label="プレイヤーの名前"
        variant="outlined"
        value={playerName}
        onChange={(event) => setPlayerName(event.target.value)}
        placeholder="名前を入力してください"
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        送信
      </Button>
    </Box>
  )
}

export default PlayerNameInputUI
