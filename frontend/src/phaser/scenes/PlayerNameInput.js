import Phaser from 'phaser'
//todo:より見た目をかっこよくする

class PlayerNameInput extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayerNameInput' })
    this.name = '' // プレイヤーの名前を保存するための変数
  }

  preload() {
    // 暗い背景色とネオンカラーのテキスト
    this.cameras.main.setBackgroundColor(0x222222)
  }

  create() {
    // プレイヤー名前入力のタイトル
    this.add
      .text(400, 100, 'プレイヤー名前入力', {
        fontSize: '32px',
        fontFamily: 'Courier New',
        color: '#ff00ff', // マゼンタ
        stroke: '#0000ff', // 青色のアウトライン
        strokeThickness: 2,
      })
      .setOrigin(0.5)

    // 名前入力用のテキスト表示
    const nameText = this.add
      .text(400, 200, '名前: ', {
        fontSize: '24px',
        fontFamily: 'Courier New',
        color: '#00ffff', // シアン
      })
      .setOrigin(0.5)

    // ... (キーボード入力部分は変更なし)

    // 送信ボタン
    const submitButton = this.add
      .text(400, 300, '送信', {
        fontSize: '24px',
        fontFamily: 'Courier New',
        color: '#ff0000', // 赤色
        backgroundColor: '#0000ff', // 青色の背景
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      // ボタンに少し立体感を与える
      .setDepth(1)
      .setInteractive()
      // ホバー時の効果
      .on('pointerover', () => submitButton.setScale(1.1))
      .on('pointerout', () => submitButton.setScale(1))
      .on('pointerdown', () => this.handleSubmit())

    // メインメニューへ戻るボタン
    // ... (同様に変更)

    // 背景にノイズ効果を追加 (Phaser3のPostFXプラグインなどを使用)
    // ...

    // 背景に都市の夜景画像を配置 (Phaser3のImageオブジェクトを使用)
    // ...
  }

  handleSubmit() {
    //if (this.name !== '') {
    alert(`プレイヤーの名前: ${this.name}`)
    // 名前をサーバーに送信したり、他の処理を行うことができます
    this.scene.start('MainMenu')
    //} else {
    //  alert('名前を入力してください。')
    //}
  }
}

export default PlayerNameInput
