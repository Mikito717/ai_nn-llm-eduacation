import React from 'react';

function Tutorial({ setPage }) {
  const runKNN = () => {
    const kValue = document.getElementById('k-value').value;
    const distanceMetric = document.getElementById('distance-metric').value;
    // ここでPythonバックエンドと連携してK-NNを実行する処理を記述
    alert(`K: ${kValue}, 距離の計量法: ${distanceMetric}`);
  };

  return (
    <div className="container">
      <h1>K-NN チュートリアル</h1>
      <div className="form-group">
        <label htmlFor="k-value">Kの値:</label>
        <input type="number" id="k-value" min="1" max="100" defaultValue="5" />
      </div>
      <div className="form-group">
        <label htmlFor="distance-metric">距離の計量法:</label>
        <select id="distance-metric">
          <option value="euclidean">ユークリッド距離</option>
          <option value="manhattan">マンハッタン距離</option>
          <option value="minkowski">ミンコフスキー距離</option>
        </select>
      </div>
      <div className="buttons">
        <button onClick={runKNN}>実行</button>
        <button onClick={() => setPage('home')}>戻る</button>
      </div>
    </div>
  );
}

export default Tutorial;
