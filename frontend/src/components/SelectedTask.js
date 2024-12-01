// QuestCard.js
import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material'

const SelectedTask = ({ handleback, handleClick }) => {
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
    <div
      style={{
        width: '680px',
        height: '550px',
        position: 'relative',
        overflow: 'auto',
      }}
    >
      <Box position="absolute" top={0} right={150}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleback()}
        >
          Back Button
        </Button>
      </Box>
      <Button variant="contained" color="primary" onClick={fetchData}>
        リロード
      </Button>
      {cardsData.map((card, index) => (
        <Card key={index} sx={{ maxWidth: 600, margin: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {card[0].taskName}
            </Typography>
            <Typography sx={{ marginBottom: 2, color: 'blue' }}>
              {card[0].description}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{ fontWeight: 'bold', color: 'green' }}
            >
              Rewards: {card[0].rewards}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{ fontWeight: 'bold', color: 'purple' }}
            >
              Device: {card[0].device}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{ fontWeight: 'bold', color: 'orange' }}
            >
              Memory: {card[0].memory}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{ fontWeight: 'bold', color: 'brown' }}
            >
              Selected AI: {card[0].selectedAI}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{ fontWeight: 'bold', color: 'blue' }}
            >
              Accuracy: {card[0].accuracy}%
            </Typography>
            <Box
              sx={{
                maxHeight: 100,
                overflow: 'auto',
                padding: 1,
                borderRadius: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="body2" component="div" color="black">
                Task Description: {card[0].taskDescription}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              color={card.buttonColor}
              onClick={() => {
                handleClick(card[0])
                console.log('ClickTask', card[0])
              }}
            >
              Create ML Model
            </Button>
            <Button
              size="small"
              variant="contained"
              color="default"
              onClick={() => handleCancel(card[0].id)}
            >
              キャンセル
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}

const handleCancel = (id) => {
  console.log('Cancelled card with id:', id)
  // Add your cancel handling logic here
}

export default SelectedTask
