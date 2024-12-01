import Phaser from 'phaser'

class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' })
  }

  create() {
    // メインメニューのタイトル
    this.add
      .text(400, 100, 'MainMenu', { fontSize: '32px', color: '#fff' })
      .setOrigin(0.5)

    // ゲームモードのボタン
    const gameModes = ['Task', 'LLM']
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
    if (mode === 'Task') {
      this.scene.start('TaskList') // BasePlanet シーンへ遷移
    }
    if (mode === 'LLM') {
      this.scene.start('LLMScene1') // BasePlanet シーンへ遷移
    }
  }
}

export default MainMenu
