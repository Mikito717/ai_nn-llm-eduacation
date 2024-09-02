import Phaser from 'phaser'
import BasePlanet from './BasePlanet'

class AIDescription extends Phaser.Scene {
  constructor() {
    super({ key: 'AIDescription' })
  }

  preload() {}

  create() {
    //どのAIが選択されているか
    this.selectedAI = this.scene.settings.data.selectedAI
    //画面の大きさを取得
    const width = this.cameras.main.width
    const height = this.cameras.main.height
    //オーバーレイで表示
    this.add.graphics().fillStyle(0x000000, 0.7).fillRect(0, 0, width, height)
    //選択されたAIの説明を表示
    this.add.text(200, 100, this.selectedAI, {
      fontSize: '48px',
      fill: '#fff',
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

  update(time, delta) {
    // Game logic goes here
  }
}

export default AIDescription
