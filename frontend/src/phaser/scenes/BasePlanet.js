import Phaser from 'phaser'

//todo:UI作成
//todo:使用AIを羅列する
//todo:AIを選択すると、そのAIの説明が表示される
class BasePlanet extends Phaser.Scene {
  constructor() {
    super({ key: 'BasePlanet' })
    //どのAIが選択されているか
    this.selectedAI = null
    //惑星数
    this.planets_gold = 0
    this.planets_purple = 0
    this.planets_blue = 0
    this.baseplanets_gold = 0
    this.baseplanets_purple = 0
    this.baseplanets_blue = 0
  }

  preload() {
    //basestation.jpgを読み込む
    this.load.image('base', 'assets/basestation.jpg')
  }

  create() {
    // basestation.jpgを表示
    this.add.image(400, 300, 'base')

    // AIの選択ボタンを表示（6個）
    const buttonNames = [
      'K-NN',
      'ランダムフォレスト',
      'SVM',
      'Preprocessing',
      'PCA',
      'K-means',
      'NN',
    ]
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

    //保存した惑星数を取得
    this.baseplanets_gold = this.registry.get('baseplanets_gold')
    this.baseplanets_purple = this.registry.get('baseplanets_purple')
    this.baseplanets_blue = this.registry.get('baseplanets_blue')
    this.planets_gold = this.registry.get('gotplanets_gold')
    this.planets_purple = this.registry.get('gotplanets_purple')
    this.planets_blue = this.registry.get('gotplanets_blue')

    //惑星数を更新
    this.baseplanets_gold += this.planets_gold
    this.baseplanets_purple += this.planets_purple
    this.baseplanets_blue += this.planets_blue

    //惑星を保存
    this.registry.set('baseplanets_gold', this.baseplanets_gold)
    this.registry.set('baseplanets_purple', this.baseplanets_purple)
    this.registry.set('baseplanets_blue', this.baseplanets_blue)

    //帳尻合わせ
    this.planets_gold = this.baseplanets_gold
    this.planets_purple = this.baseplanets_purple
    this.planets_blue = this.baseplanets_blue
    this.registry.set('gotplanets_gold', 0)
    this.registry.set('gotplanets_purple', 0)
    this.registry.set('gotplanets_blue', 0)

    if (isNaN(this.planets_gold)) {
      this.planets_gold = 0
    }
    if (isNaN(this.planets_purple)) {
      this.planets_purple = 0
    }
    if (isNaN(this.planets_blue)) {
      this.planets_blue = 0
    }

    //惑星数を表示
    this.add.text(0, 0, `gold: ${this.planets_gold}`, {
      fontSize: '30px',
      fill: '#ffd700',
      backgroundColor: '#000',
      padding: { x: 10, y: 5 },
    })
    this.add.text(0, 50, `purple: ${this.planets_purple}`, {
      fontSize: '30px',
      fill: '#800080',
      backgroundColor: '#000',
      padding: { x: 10, y: 5 },
    })
    this.add.text(0, 100, `blue: ${this.planets_blue}`, {
      fontSize: '30px',
      fill: '#0000ff',
      backgroundColor: '#000',
      padding: { x: 10, y: 5 },
    })

    //貯蔵した惑星数をストレージに保管
    localStorage.setItem('planets_gold', this.planets_gold)
    localStorage.setItem('planets_purple', this.planets_purple)
    localStorage.setItem('planets_blue', this.planets_blue)
  }

  showAIDescription(name) {
    //どのAIが選択されているか
    this.selectedAI = name
    if (this.selectedAI === 'K-NN') {
      this.scene.launch('AIDescription', { selectedAI: this.selectedAI })
      this.scene.pause()
    } else if (this.selectedAI === 'ランダムフォレスト') {
      this.scene.start('RF_paramator')
    } else if (this.selectedAI === 'SVM') {
      this.scene.start('SVM_paramator')
    } else if (this.selectedAI === 'Preprocessing') {
      this.scene.start('PreprocessingData')
    } else if (this.selectedAI === 'PCA') {
      this.scene.start('PCA_paramator')
    } else if (this.selectedAI === 'K-means') {
      this.scene.start('Clustering_mount')
    } else if (this.selectedAI === 'NN') {
      this.scene.start('NN_mount')
    }
  }
}

export default BasePlanet
