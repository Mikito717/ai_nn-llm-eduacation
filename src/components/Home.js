import React from 'react';

function Home({ setPage }) {
  return (
    <div className="container">
      <h1>AI Learning Game</h1>
      <div className="buttons">
        <button onClick={() => setPage('tutorial')}>スタート</button>
        <button onClick={() => alert('設定画面を開きます')}>設定</button>
        <button onClick={() => alert('ヘルプ画面を開きます')}>ヘルプ</button>
      </div>
    </div>
  );
}

export default Home;
