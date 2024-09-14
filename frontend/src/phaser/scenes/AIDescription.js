import Phaser from 'phaser'

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

    //選択されたAIによって表示する文章を変える
    let description = ''
    if (this.selectedAI === 'K-NN') {
      description =
        'K-NNは、k-Nearest Neighborsの略で、k個の最近傍のデータを見て、多数決で分類する手法です。'
    } else if (this.selectedAI === 'SVM') {
      description =
        'SVMは、Support Vector Machineの略で、データを分類する境界線を決定する手法です。'
    } else if (this.selectedAI === 'Random Forest') {
      description =
        'Random Forestは、ランダムに複数の決定木を作成し、多数決で分類する手法です。'
    } else if (this.selectedAI === 'Neural Network') {
      description =
        'Neural Networkは、人間の脳の仕組みを模倣した機械学習の手法です。'
    } else {
      description = 'AIの説明が見つかりませんでした。'
    }

    //AIそれぞれのシーンに進むボタンを表示
    const startButton = this.add
      .text(200, 200, 'AIを実行', {
        fontSize: '48px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => this.scene.start(this.selectedAI))
      .on('pointerover', () => {
        startButton.setStyle({ fill: '#ff0', backgroundColor: '#333' })
      })
      .on('pointerout', () => {
        startButton.setStyle({ fill: '#fff', backgroundColor: '#000' })
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

    //使用する学習データ量を指定するボタンを表示
    const dataButton = this.add
      .text(200, 300, 'データ量を指定', {
        fontSize: '48px',
        fill: '#fff',
        backgroundColor: '#000',
        padding: { x: 10, y: 5 },
      })
      .setInteractive()
      .on('pointerdown', () => this.scene.start('DataSelect'))
      .on('pointerover', () => {
        dataButton.setStyle({ fill: '#ff0', backgroundColor: '#333' })
      })
      .on('pointerout', () => {
        dataButton.setStyle({ fill: '#fff', backgroundColor: '#000' })
      })
  }

  update(time, delta) {
    // Game logic goes here
  }
}

export default AIDescription
