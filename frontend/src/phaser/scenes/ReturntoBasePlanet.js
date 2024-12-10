import Phaser from 'phaser'

class ReturntoBasePlanet extends Phaser.Scene {
  constructor() {
    super({ key: 'ReturntoBasePlanet' })
    this.planets_gold = 0
    this.planets_purple = 0
    this.planets_blue = 0
  }
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
      this.planets_gold = this.registry.get('gotplanets_gold')
      this.planets_purple = this.registry.get('gotplanets_purple')
      this.planets_blue = this.registry.get('gotplanets_blue')
      this.username = this.registry.get('username')

      fetch(`${process.env.REACT_APP_API_URL}set_planet_number`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: this.username,
          gold: this.planets_gold,
          purple: this.planets_purple,
          blue: this.planets_blue,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data)
        })
        .catch((error) => {
          console.error('Error:', error)
        })

      this.scene.stop('ReturntoBasePlanet')
      this.scene.stop('GameScene0')
      this.scene.start('BasePlanet')
    })
    const continueButton = this.add
      .text(400, 400, 'Continue', { fontSize: '24px', fill: '#fff' })
      .setOrigin(0.5)
    continueButton.setInteractive()
    continueButton.on('pointerdown', () => {
      this.scene.stop('ReturntoBasePlanet')
      this.scene.resume('GameScene0')
    })
  }
  update(time, delta) {
    // Game logic goes here
  }
}

export default ReturntoBasePlanet
