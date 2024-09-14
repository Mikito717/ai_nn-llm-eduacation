import Phaser from 'phaser'

class AI1 extends Phaser.Scene {
  constructor() {
    super({ key: 'AI1' }) //ここでは、K-NNを選択した場合の処理を記述
  }
  preload() {
    //送信データの読み込み
  }
  create() {
    //背景の描画
    const width = this.cameras.main.width
    const height = this.cameras.main.height
    this.add.graphics().fillStyle(0x000000, 0.7).fillRect(0, 0, width, height)
    //flaskでPythonのAIを呼び出す処理を記述
    //サーバーにデータを渡し、リクエストを送信
    fetch('http://localhost:5000/run_knn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //データを送信
        data: 'collected data', //ここにデータを入れる
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //AIの結果を表示
        this.add
          .text(400, 300, `AI1: ${data.message}`, {
            fontSize: '32px',
            fill: '#fff',
            wordWrap: { width: 600 },
          })
          .setOrigin(0.5)
      })
      .catch((error) => {
        console.error('Error:', error)
      })

    //戻るボタンを表示
    const backButton = this.add
      .text(200, 500, '戻る', {
        fontSize: '48px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => this.scene.start('BasePlanet'))
      .on('pointerover', () => {
        backButton.setStyle({ fill: '#ff0', backgroundColor: '#333' })
      })
      .on('pointerout', () => {
        backButton.setStyle({ fill: '#fff', backgroundColor: '#000' })
      })
  }
  update(time, delta) {}
}

export default AI1
