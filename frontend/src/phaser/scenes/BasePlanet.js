import Phaser from 'phaser'
import PreprocessData from './PreprocessData'

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
  }

  preload() {
    //basestation.jpgを読み込む
    this.load.image('base', 'assets/basestation.jpg')
  }

  create() {
    //flaskから取得したユーザー名を取得
    fetch(`${process.env.REACT_APP_API_URL}api/get_planet_number`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: this.registry.get('username') }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.data = data[0].trim().split(',')
        this.planets_gold = parseInt(this.data[0], 10) || 0
        this.planets_purple = parseInt(this.data[1], 10) || 0
        this.planets_blue = parseInt(this.data[2], 10) || 0
      })

    //flaskに、ml_modelのリクエストを送る
    fetch(`${process.env.REACT_APP_API_URL}/api/get_ml_models`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: this.registry.get('username') }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data:', data)
        // AIの選択ボタンを表示（6個）
        const buttonNames = ['K-NN', 'RF', 'SVM', 'RNN', 'PCA', 'K-means', 'NN']
        // dataでTrueとなっているものだけをフィルタリング
        this.filteredButtonNames = buttonNames.filter((name) => {
          const modelName = name.replace('-', '').toLowerCase()
          return data.some(
            (item) =>
              item.model_name.toLowerCase() === modelName &&
              item.having.toLowerCase() === 'true',
          )
        })
        // フィルタリングされたボタン名を表示
        console.log('Filtered Button Names:', this.filteredButtonNames)

        this.filteredButtonNames.forEach((name, index) => {
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
      })

    // basestation.jpgを表示
    this.add.image(400, 300, 'base')

    const cols = 2
    const buttonWidth = 300
    const buttonHeight = 100
    const startX = 200
    const startY = 100

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
  update() {
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
  }

  showAIDescription(name) {
    //どのAIが選択されているか
    this.selectedAI = name
    if (this.selectedAI === 'K-NN') {
      //this.scene.launch('AIDescription', { selectedAI: this.selectedAI })
      //this.scene.pause()
      this.scene.start('KNN_Paramator')
    } else if (this.selectedAI === 'RF') {
      this.scene.start('RF_paramator')
    } else if (this.selectedAI === 'SVM') {
      this.scene.start('SVM_paramator')
    } else if (this.selectedAI === 'Preprocessing') {
      this.scene.start('PreprocessingData')
    } else if (this.selectedAI === 'PCA') {
      this.scene.start('PCA_paramator')
    } else if (this.selectedAI === 'K-means') {
      this.scene.start('Kmeans_paramator')
    } else if (this.selectedAI === 'NN') {
      this.scene.start('NN_paramator')
    }
  }
}

export default BasePlanet
