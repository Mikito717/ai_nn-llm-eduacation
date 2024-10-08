import Phaser from 'phaser'
import React from 'react'
import ReactDOM from 'react-dom'
import ChatUI from '../../components/ChatUI'

class LLMScene2 extends Phaser.Scene {
  constructor() {
    super({ key: 'LLMScene2' })

    this.container = null // DOMコンテナの参照を保持
  }

  init(data) {
    this.buttonNumber = data.buttonNumber
  }

  create() {
    console.log(`Button number received: ${this.buttonNumber}`)
    // Mount React component inside Phaser scene
    this.container = document.createElement('div')
    this.container.style.position = 'absolute'
    this.updateContainerPosition() // 初期位置を設定
    document.body.appendChild(this.container)

    // Mount the React app with buttonNumber as a prop
    ReactDOM.render(<ChatUI chatNumber={this.buttonNumber} />, this.container)

    // ウィンドウのサイズ変更イベントを監視
    window.addEventListener('resize', this.updateContainerPosition.bind(this))

    // LLMScene1に戻るボタン
    const backButton = this.add.text(10, 550, 'Back to LLM Entrance', {
      backgroundColor: '#000',
      color: '#fff',
    })
  }

  updateContainerPosition() {
    console.log('updateContainerPosition')
    // Phaserゲームキャンバスのサイズを取得
    const canvas = this.game.canvas.getBoundingClientRect()
    this.container.style.left = `${canvas.left + 150}px`
    this.container.style.top = `${canvas.top + 20}px`
  }

  shutdown() {
    // シーンがシャットダウンするときにReactコンポーネントをクリーンアップ
    if (this.container) {
      ReactDOM.unmountComponentAtNode(this.container)
      document.body.removeChild(this.container)
    }
  }
}

export default LLMScene2
