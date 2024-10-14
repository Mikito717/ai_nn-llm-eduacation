import Phaser from 'phaser'
import React from 'react'
import { createRoot } from 'react-dom/client'
import LLMResultUI from '../../components/LLM_ResultUI'

class LLMScene4 extends Phaser.Scene {
  constructor() {
    super({ key: 'LLMScene4' })
    this.container = null // DOMコンテナの参照を保持
  }

  init(data) {
    this.finalanswer = data.finalanswer
    this.correctanswer = data.correctanswer
    this.username = this.registry.get('username')
  }

  create() {
    // Mount React component inside Phaser scene
    this.container = document.createElement('div')
    this.container.style.position = 'absolute'
    this.updateContainerPosition() // 初期位置を設定
    document.body.appendChild(this.container)

    // Mount the React component
    const root = createRoot(this.container)
    root.render(
      <LLMResultUI
        finalanswer={this.finalanswer}
        correctanswer={this.correctanswer}
        onback={() => {
          this.shutdown()
          this.scene.start('LLMScene1')
        }}
        username={this.username}
      />,
    )

    // ウィンドウのサイズ変更イベントを監視
    window.addEventListener('resize', this.updateContainerPosition.bind(this))
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
      const root = createRoot(this.container)
      root.unmount()
      document.body.removeChild(this.container)
      this.container = null // 参照をクリア
    }
    // メモリリークを防ぐためにイベントリスナーを削除
    window.removeEventListener(
      'resize',
      this.updateContainerPosition.bind(this),
    )
  }
}

export default LLMScene4
