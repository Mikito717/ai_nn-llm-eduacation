import React from 'react';

function Navigation({ setPage }) {
  return (
    <nav>
      <button onClick={() => setPage('home')}>ホーム</button>
      <button onClick={() => setPage('tutorial')}>チュートリアル</button>
    </nav>
  );
}

export default Navigation;
