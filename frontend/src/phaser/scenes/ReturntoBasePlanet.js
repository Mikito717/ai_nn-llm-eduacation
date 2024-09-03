import Phaser from 'phaser'
import BasePlanet from './BasePlanet'

class ReturntoBasePlanet extends Phaser.Scene {
  constructor() {
    super({ key: 'ReturntoBasePlanet' })
  }
  preload() {}
  create() {
    //オーバーレイ背景（グレー）を作成する
    this.add.rectangle(0, 0, 800, 600, 0x000000, 0.5).setOrigin(0, 0)
    //基地に戻るか、ゲームを続けるかの選択肢を表示する
    this.add
      .text(400, 300, 'Return to Base?', { fontSize: '32px', fill: '#fff' })
      .setOrigin(0.5)
    //ボタンを作成する
    const returnButton = this.add
      .text(400, 350, 'Return', { fontSize: '24px', fill: '#fff' })
      .setOrigin(0.5)
    returnButton.setInteractive()
    returnButton.on('pointerdown', () => {
      this.scene.start('BasePlanet')
      this.scene.stop('ReturntoBasePlanet')
      this.scene.stop('GameScene0')
    })
    const continueButton = this.add
      .text(400, 400, 'Continue', { fontSize: '24px', fill: '#fff' })
      .setOrigin(0.5)
    continueButton.setInteractive()
    continueButton.on('pointerdown', () => {
      this.scene.stop('ReturntoBasePlanet')
    })
  }
  update(time, delta) {
    // Game logic goes here
  }
}
