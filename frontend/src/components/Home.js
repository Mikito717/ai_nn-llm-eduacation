import React from 'react'

function Home({ startGame }) {
  return (
    <div className="container">
      <h1>AI Learning Game</h1>
      <div className="buttons">
        <button onClick={startGame}>スタート</button>
      </div>
    </div>
  )
}

export default Home
