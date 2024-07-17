import React, { useState } from 'react';
import Home from './components/Home';
import Tutorial from './components/Tutorial';
import Navigation from './components/Navigation';

function App() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home setPage={setPage} />;
      case 'tutorial':
        return <Tutorial setPage={setPage} />;
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
