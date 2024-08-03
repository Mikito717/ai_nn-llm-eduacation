import React, { useState } from 'react';

const MainMenu = ({setPage}) => {
  // 利用可能なゲームモード
  const gameModes = ['game', 'モード2', 'モード3'];
  // 選択されたゲームモードを管理する状態
  const [selectedMode, setSelectedMode] = useState('');

  // ゲームモードを選択するための関数
  const selectMode = (mode) => {
	setSelectedMode(mode);
	if(mode === 'game'){
		setPage('game');
	}
  };

  return (
	<div>
	  <h1>メインメニュー</h1>
	  <div>
		{gameModes.map((mode) => (
		  <button key={mode} onClick={() => selectMode(mode)}>
			{mode}
		  </button>
		))}
	  </div>
	  {selectedMode && <p>選択されたモード: {selectedMode}</p>}
	</div>
  );
};

export default MainMenu;