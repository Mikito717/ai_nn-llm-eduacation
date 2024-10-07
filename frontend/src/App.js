import React, { useState, useEffect } from 'react'
import Phaser from 'phaser'
import Home from './components/Home'
import phaserConfig from './phaser/config/phaserconfig' // 正しいパスに修正

function App() {
  const [phaserGame, setPhaserGame] = useState(null)
  const [showGame, setShowGame] = useState(false)
  const [eventData, setEventData] = useState(null) // イベントデータを保存するための状態

  const startGame = () => {
    if (!phaserGame) {
      const game = new Phaser.Game(phaserConfig)
      setPhaserGame(game)
    }
    setShowGame(true) // ゲーム表示を切り替え
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const togglevisibility = () => {
    setShowGame(!showGame)
  }

  useEffect(() => {
    if (phaserGame) {
      // ゲームのイベントを監視
      phaserGame.events.on('toggle', (data) => {
        console.log('イベントが発生しました', data)
        setEventData(data) // イベントデータを保存
        togglevisibility() // ゲーム表示を切り替え
      })
    }
  }, [phaserGame, togglevisibility])

  return (
    <div className="App">
      {showGame ? <div id="phaser-game"></div> : <Home startGame={startGame} />}
    </div>
  )
}

export default App
