import React, { useState, useEffect } from 'react'
import Phaser from 'phaser'
import Home from './components/Home'
import phaserConfig from './phaser/config/phaserconfig' // 正しいパスに修正

function App() {
  const [phaserGame, setPhaserGame] = useState(null)
  const [showGame, setShowGame] = useState(false)

  /* useEffect(() => {
    if (phaserGame) {
      if (showGame) {
        phaserGame.scene.start('MainMenu') // ゲームが初期化済みであれば、シーンを開始
      } else {
        phaserGame.destroy(true) // ゲームインスタンスを破棄して表示エリアを隠す
        setPhaserGame(null)
      }
    }
  }, [phaserGame, showGame])*/

  const startGame = () => {
    if (!phaserGame) {
      const game = new Phaser.Game(phaserConfig)
      setPhaserGame(game)
    }
    setShowGame(true) // ゲーム表示を切り替え
  }

  return (
    <div className="App">
      {showGame ? <div id="phaser-game"></div> : <Home startGame={startGame} />}
    </div>
  )
}

export default App
