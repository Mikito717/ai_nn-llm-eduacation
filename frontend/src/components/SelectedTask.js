// QuestCard.js
import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material'

const SelectedTask = () => {
  const [cardsData, setCardsData] = useState([])

  const fetchData = () => {
    fetch('http://localhost:5000/api/quests') // Flask backend endpoint
      .then((response) => response.json())
      .then((data) => setCardsData(data))
      .catch((error) => console.error('Error fetching data:', error))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Button variant="contained" color="primary" onClick={fetchData}>
        リロード
      </Button>
      {cardsData.map((card, index) => (
        <Card key={index} sx={{ maxWidth: 345, margin: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {card.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginBottom: 2 }}
            >
              {card.description}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{ fontWeight: 'bold' }}
            >
              Rewards: {card.rewards.join(', ')}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color={card.buttonColor}
              onClick={() => handleClick(card.id)}
            >
              {card.buttonText}
            </Button>
            <Button
              size="small"
              variant="contained"
              color="default"
              onClick={() => handleCancel(card.id)}
            >
              キャンセル
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}

const handleClick = (id) => {
  console.log('Clicked card with id:', id)
  // Add your click handling logic here
}

const handleCancel = (id) => {
  console.log('Cancelled card with id:', id)
  // Add your cancel handling logic here
}

export default SelectedTask
