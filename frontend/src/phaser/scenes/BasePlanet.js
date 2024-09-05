import Phaser from 'phaser'

//todo:UI作成
//todo:使用AIを羅列する
//todo:AIを選択すると、そのAIの説明が表示される
class BasePlanet extends Phaser.Scene {
  constructor() {
    super({ key: 'BasePlanet' })
    //どのAIが選択されているか
    this.selectedAI = null
  }

  preload() {
    //basestation.jpgを読み込む
    this.load.image('base', 'assets/basestation.jpg')
  }

  create() {
    // basestation.jpgを表示
    this.add.image(400, 300, 'base')

    // AIの選択ボタンを表示（6個）
    const buttonNames = ['AI1', 'AI2', 'AI3', 'AI4', 'AI5', 'AI6']
    const cols = 2
    const buttonWidth = 300
    const buttonHeight = 100
    const startX = 200
    const startY = 100

    buttonNames.forEach((name, index) => {
      const x = startX + (index % cols) * buttonWidth
      const y = startY + Math.floor(index / cols) * buttonHeight

      const button = this.add
        .text(x, y, name, {
          fontSize: '48px',
          fill: '#fff',
          backgroundColor: '#000',
          padding: { x: 10, y: 5 },
        })
        .setInteractive()
        .on('pointerdown', () => this.showAIDescription(name))
        .on('pointerover', () => {
          button.setStyle({ fill: '#ff0', backgroundColor: '#333' })
        })
        .on('pointerout', () => {
          button.setStyle({ fill: '#fff', backgroundColor: '#000' })
        })
    })

    // AIを選択すると、そのAIの説明が表示される
    // AIの説明を表示
    //MainMenuへ戻るボタンを表示
    const backButton = this.add
      .text(200, 500, 'MainMenu', {
        fontSize: '48px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => this.scene.start('MainMenu'))
      .on('pointerover', () => {
        backButton.setStyle({ fill: '#ff0', backgroundColor: '#333' })
      })
      .on('pointerout', () => {
        backButton.setStyle({ fill: '#fff', backgroundColor: '#000' })
      })
  }

  showAIDescription(name) {
    //どのAIが選択されているか
    this.selectedAI = name
    this.scene.launch('AIDescription', { selectedAI: this.selectedAI })
  }

  update() {
    // ここにフレームごとの更新処理を追加
  }
}

export default BasePlanet
