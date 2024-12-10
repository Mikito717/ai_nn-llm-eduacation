import React from 'react'

function Tutorial({ setPage }) {
  // 状態管理用のフックを追加
  const [isClicked, setIsClicked] = React.useState(false)
  const runKNN = async () => {
    // 「実行」ボタンが連続でクリックされた場合は処理を中断
    if (!isClicked) {
      setIsClicked(true)
      const kValue = document.getElementById('k-value').value
      const distanceMetric = document.getElementById('distance-metric').value
      // ここでPythonバックエンドと連携してK-NNを実行する処理を記述
      try {
        // app.pyの/run_knnエンドポイントに対してPOSTリクエストを送信
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}api/run_knn`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // リクエストボディにKの値と距離の計量法を含める
            body: JSON.stringify({
              k: kValue,
              distance_metric: distanceMetric,
            }),
          },
        )

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        // レスポンスのJSONを取得
        const data = await response.json()

        // 結果を処理（ここではコンソールにログ出力）
        console.log(data)
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error)
      } finally {
        setIsClicked(false)
      }
      alert(`K: ${kValue}, 距離の計量法: ${distanceMetric}`)
    } else {
      alert('処理中です。しばらくお待ちください。')
      return
    }
  }

  return (
    <div className="container">
      <h1>K-NN チュートリアル</h1>
      <div className="form-group">
        <label htmlFor="k-value">Kの値:</label>
        <input
          type="number"
          id="k-value"
          min="100"
          max="10000"
          defaultValue="100"
        />
      </div>
      <div className="form-group">
        <label htmlFor="distance-metric">距離の計量法:</label>
        <select id="distance-metric">
          <option value="ユークリッド距離">ユークリッド距離</option>
          <option value="マンハッタン距離<">マンハッタン距離</option>
          <option value="ミンコフスキー距離">ミンコフスキー距離</option>
        </select>
      </div>
      <div className="buttons">
        <button id="run-button" onClick={runKNN}>
          実行
        </button>
        <button onClick={() => setPage('home')}>戻る</button>
      </div>
    </div>
  )
}

export default Tutorial
