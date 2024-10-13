import Phaser from 'phaser'
import React from 'react'
import { createRoot } from 'react-dom/client'
import ChatUI from '../../components/ChatUI'

class LLMScene2 extends Phaser.Scene {
  constructor() {
    super({ key: 'LLMScene2' })

    this.container = null // DOMコンテナの参照を保持
    this.root = null // Store the root instance
  }

  init(data) {
    this.buttonNumber = data.buttonNumber
    console.log(`Button number received: ${this.buttonNumber}`)
  }

  create() {
    console.log(`Button number received: ${this.buttonNumber}`)
    // Mount React component inside Phaser scene
    this.container = document.createElement('div')
    this.container.style.position = 'absolute'
    this.updateContainerPosition() // 初期位置を設定
    document.body.appendChild(this.container)

    // Mount the React app with buttonNumber as a prop
    this.root = createRoot(this.container)
    this.root.render(
      <ChatUI
        chatNumber={this.buttonNumber}
        answerSelected={this.answerSelected.bind(this)}
        username={this.registry.get('username')}
      />,
    )

    // ウィンドウのサイズ変更イベントを監視
    window.addEventListener('resize', this.updateContainerPosition.bind(this))

    // LLMScene1に戻るボタン
    const backButton = this.add.text(10, 550, 'Back to LLM Entrance', {
      backgroundColor: '#000',
      color: '#fff',
    })

    // マウスオーバー時の処理を追加
    backButton.setInteractive()
    backButton.on('pointerover', function () {
      backButton.setStyle({ backgroundColor: '#555', color: '#ff0' })
    })

    // マウスアウト時の処理を追加
    backButton.on('pointerout', function () {
      backButton.setStyle({ backgroundColor: '#000', color: '#fff' })
    })

    backButton.on('pointerdown', () => {
      this.shutdown()
      this.scene.start('LLMScene3')
    })
  }

  answerSelected(answer) {
    this.currentAnswer = this.registry.get('answer')
    console.log(`currentanswer: ${this.currentAnswer}`)
    this.currentAnswer[this.buttonNumber - 1] = answer
    this.registry.set('answer', this.currentAnswer)
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
    if (this.container && this.root) {
      this.root.unmount()
      document.body.removeChild(this.container)
      this.root = null // Clear the root reference
    }
  }
}

export default LLMScene2
