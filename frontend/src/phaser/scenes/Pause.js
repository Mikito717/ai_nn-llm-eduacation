import Phaser from 'phaser'

class Pause extends Phaser.Scene {
  constructor() {
    super({ key: 'Pause' })
  }

  create() {
    //ポーズ画面の背景を表示
    this.add
      .graphics()
      .fillStyle(0x000000, 0.7)
      .fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)
    this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'PAUSE',
        {
          fontSize: '32px',
          fill: '#ffffff',
        },
      )
      .setOrigin(0.5)

    // TABキーでポーズを解除
    this.input.keyboard.on('keydown-TAB', () => {
      const pausedSceneKey = this.scene.get('Pause').data.get('pausedSceneKey')
      this.scene.stop() // ポーズシーンを閉じる
      this.scene.resume(pausedSceneKey) // 一時停止していたシーンを再開
    })

    //メインメニューに戻るボタンを表示
    this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 50,
        'Main Menu',
        {
          fontSize: '32px',
          fill: '#ffffff',
        },
      )
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.stop() // ポーズシーンを閉じる
        this.scene.stop(this.scene.get('Pause').data.get('pausedSceneKey')) // 一時停止していたシーンを閉じる
        this.scene.start('MainMenu') // メインメニューシーンを開く
      })
  }
}

export default Pause
