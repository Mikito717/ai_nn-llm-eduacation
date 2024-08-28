import Phaser from 'phaser'

//todo:UI作成
//todo:使用AIを羅列する
//todo:AIを選択すると、そのAIの説明が表示される
class BasePlanet extends Phaser.Scene {
  constructor() {
    super({ key: 'BasePlanet' })
  }

  preload() {
    // ここにアセットの読み込み処理を追加
    this.load.image('basePlanet', 'assets/baseplanet.png')
  }

  create() {
    // ここにシーンの初期化処理を追加
    const x = 400
    const y = 300
    const radius = 20
    const graphics = this.add.graphics()
    const textureKey = 'basePlanet'
    graphics.generateTexture(textureKey, radius * 2, radius * 2)
    graphics.destroy()
    const basePlanet = this.physics.add.staticSprite(x, y, textureKey)
    basePlanet.setScale(0.5)
    this.planets = this.physics.add.staticGroup()
    this.planets.add(basePlanet)

    // 基地の位置を保存
    this.basePlanetPosition = { x, y }
  }

  update() {
    // ここにフレームごとの更新処理を追加
  }
}

export default BasePlanet
