import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Tutorial from './components/Tutorial';
import Navigation from './components/Navigation';
import PlayerNameInput from './components/PlayerNameInput';
import GameComponent from './components/GameComponent';
import Mainmenu from './components/Mainmenu';

function App() {
  // ローカルストレージから初期ページ状態を読み込む
  /*const getInitialPage = () => {
    const savedPage = localStorage.getItem('currentPage');
    return savedPage || 'home'; // ローカルストレージに保存されたページがなければ 'home' を返す
  };
  */
  //const [page, setPage] = useState(getInitialPage);
  const [page, setPage] = useState('home');
  /*
  // ページ状態が変更されるたびにローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('currentPage', page);
  }, [page]);
  */

  const renderPage = () => {
    switch (page) {
      //初期画面
      case 'home':
        return <Home setPage={setPage} />;
      //名前入力画面
      case 'playerNameInput':
        return <PlayerNameInput setPage={setPage} />;
      //チュートリアル画面
      case 'tutorial':
        return <Tutorial setPage={setPage} />;
      case 'game':
        return <GameComponent />;
      case 'mainmenu':
        return <Mainmenu setPage={setPage}/>;
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <div className="App">
      <Navigation setPage={setPage} />
      {renderPage()}
    </div>
  );
}

export default App;
