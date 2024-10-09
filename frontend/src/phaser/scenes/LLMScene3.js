import Phaser from 'phaser'
import React from 'react'
import LLMSelectionUI from '../../components/LLM_Selection_UI'
import { createRoot } from 'react-dom/client'

class LLMScene3 extends Phaser.Scene {
  constructor() {
    super({ key: 'LLMScene3' })
    this.container = null // DOMコンテナの参照を保持
  }

  create() {
    // Mount React component inside Phaser scene
    this.container = document.createElement('div')
    this.container.style.position = 'absolute'
    this.updateContainerPosition() // 初期位置を設定
    document.body.appendChild(this.container)

    // Define the onchange function
    const handleChange = (buttonNumber) => {
      console.log(`Button ${buttonNumber} clicked`)
      this.shutdown()
      this.scene.start('LLMScene2', { buttonNumber })
      // ここにボタンがクリックされたときの処理を追加
    }

    // Mount the React component
    const root = createRoot(this.container)
    root.render(<LLMSelectionUI onchange={handleChange} />)

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
    }
  }
}

export default LLMScene3
