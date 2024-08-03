import React, { useState } from 'react';

function PlayerNameInput(props) {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
	event.preventDefault();
	alert(`プレイヤーの名前: ${name}`);
	// ここで名前をサーバーに送信したり、他の処理を行うことができます
  };

  return (
	<div>
	  <h2>プレイヤー名前入力</h2>
	  <form onSubmit={handleSubmit}>
		<label htmlFor="name">名前:</label>
		<input
		  type="text"
		  id="name"
		  value={name}
		  onChange={(e) => setName(e.target.value)}
		  required
		/>
		<button type="submit" onClick={() => props.setPage('mainmenu')}>送信</button>
	  </form>
	</div>
  );
}

export default PlayerNameInput;