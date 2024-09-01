import React from 'react'
import Phaser from 'phaser'

function Home({ startGame }) {
  return (
    <div className="container">
      <h1>AI Learning Game</h1>
      <div className="buttons">
        <button onClick={startGame}>スタート</button>
        <button onClick={() => alert('設定画面を開きます')}>設定</button>
        <button onClick={() => alert('ヘルプ画面を開きます')}>ヘルプ</button>
      </div>
    </div>
  )
}

export default Home
