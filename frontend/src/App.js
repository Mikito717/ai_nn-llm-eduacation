import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import Home from './components/Home'
import Game from './components/Game'
import Phaser from 'phaser'
import config from './phaser/config/phaserconfig'
import LLMResultUI from './components/LLM_ResultUI'

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

const AppContent = () => {
  const [showGame, setShowGame] = useState(false)
  const [eventData, setEventData] = useState(null)
  const [phaserGame, setPhaserGame] = useState(null)
  const [showHome, setShowHome] = useState(true)

  const navigate = useNavigate()

  const toggleVisibility = () => {
    setShowGame(!showGame)
    if (!showGame) {
      navigate('/game')
    } else {
      navigate('/')
    }
  }

  const startGame = () => {
    const game = new Phaser.Game(config)
    setPhaserGame(game)
    setShowGame(true)
    setShowHome(false)
  }

  useEffect(() => {
    if (phaserGame) {
      phaserGame.events.on('toggle', (data) => {
        console.log('イベントが発生しました', data)
        setEventData(data)
        toggleVisibility()
      })
    }
  }, [phaserGame])

  return (
    <div className="App">
      <Routes>
        {!showGame ? (
          <Route path="/" element={<Home startGame={startGame} />} />
        ) : (
          <Route path="/game" element={<Game />} />
        )}
      </Routes>
    </div>
  )
}

export default App
