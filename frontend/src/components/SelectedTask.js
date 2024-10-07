// QuestCard.js
import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@mui/material'

const SelectedTask = ({ title, description, rewards, onAccept }) => {
  const [buttonText, setButtonText] = useState('Accept')
  const [buttonColor, setButtonColor] = useState('primary')

  const handleClick = () => {
    setButtonText('Accepted!')
    setButtonColor('secondary')
    onAccept()
  }

  const handleCancel = () => {
    setButtonText('Accept')
    setButtonColor('primary')
  }

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 2 }}
        >
          {description}
        </Typography>
        <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
          Rewards: {rewards.join(', ')}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color={buttonColor}
          onClick={handleClick}
        >
          {buttonText}
        </Button>
        <Button
          size="small"
          variant="contained"
          color="default"
          onClick={handleCancel}
        >
          キャンセル
        </Button>
      </CardActions>
    </Card>
  )
}

export default SelectedTask
