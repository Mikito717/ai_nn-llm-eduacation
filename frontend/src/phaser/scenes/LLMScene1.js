import Phaser from 'phaser'
import React from 'react'
import { createRoot } from 'react-dom/client'
import LLMEntrance from '../../components/LLMEntrance' // Adjust the path as necessary

class LLMScene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'LLMScene1' })

    this.container = null // DOMコンテナの参照を保持
    this.root = null // React rootの参照を保持
  }

  preload() {
    // Load any assets here
  }

  create() {
    // Mount React component inside Phaser scene
    this.container = document.createElement('div')
    this.container.style.position = 'absolute'
    this.updateContainerPosition() // 初期位置を設定
    document.body.appendChild(this.container)

    // Render the React component into the div using createRoot
    const container = this.container
    this.root = createRoot(container)

    this.root.render(
      <LLMEntrance
        startgame={() => {
          this.shutdown()
          this.scene.start('LLMScene3')
        }}
        endgame={() => {
          this.shutdown()
          this.scene.start('MainMenu')
        }}
      />,
    )

    // ウィンドウのサイズ変更イベントを監視
    window.addEventListener('resize', this.updateContainerPosition.bind(this))
  }

  updateContainerPosition() {
    console.log('updateContainerPosition')
    // Phaserゲームキャンバスのサイズを取得
    const canvas = this.game.canvas.getBoundingClientRect()
    this.container.style.left = `${canvas.left + 100}px`
    this.container.style.top = `${canvas.top + 20}px`
  }

  shutdown() {
    // シーンがシャットダウンするときにReactコンポーネントをクリーンアップ
    if (this.container && this.root) {
      this.root.unmount()
      document.body.removeChild(this.container)
      this.container = null // 参照をクリア
      this.root = null // 参照をクリア
    }
    // メモリリークを防ぐためにイベントリスナーを削除
    window.removeEventListener(
      'resize',
      this.updateContainerPosition.bind(this),
    )
  }
}

export default LLMScene1
