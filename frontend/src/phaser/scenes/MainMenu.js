import Phaser from 'phaser'

class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' })
  }

  create() {
    // メインメニューのタイトル
    this.add
      .text(400, 100, 'メインメニュー', { fontSize: '32px', color: '#fff' })
      .setOrigin(0.5)

    // ゲームモードのボタン
    const gameModes = ['game', 'BasePlanet', 'タスク', 'LLM']
    gameModes.forEach((mode, index) => {
      const button = this.add
        .text(400, 200 + index * 50, mode, { fontSize: '24px', color: '#fff' })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => this.selectMode(mode))
        .on('pointerover', () => button.setStyle({ fill: '#ff0' }))
        .on('pointerout', () => button.setStyle({ fill: '#fff' }))
    })
  }

  selectMode(mode) {
    if (mode === 'game') {
      this.scene.start('GameScene0') // game シーンへ遷移
    }
    if (mode === 'BasePlanet') {
      this.scene.start('BasePlanet') // BasePlanet シーンへ遷移
    }
    if (mode === 'タスク') {
      this.scene.start('TaskList') // BasePlanet シーンへ遷移
    }
    if (mode === 'LLM') {
      this.scene.start('LLMScene1') // BasePlanet シーンへ遷移
    }
  }
}

export default MainMenu
