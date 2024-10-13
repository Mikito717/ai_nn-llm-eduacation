import Phaser from 'phaser'
import React from 'react'
import LLMSelectionUI from '../../components/LLM_Selection_UI'
import { createRoot } from 'react-dom/client'

class LLMScene3 extends Phaser.Scene {
  constructor() {
    super({ key: 'LLMScene3' })
    this.container = null // DOMコンテナの参照を保持
    this.root = null // Store the root instance
  }

  init() {
    if (!this.registry.get('answer'))
      this.registry.set('answer', [-1, -1, -1, -1, -1, -1, -1])
    //個々の正答は実際のゲームではランダム化する
    if (!this.registry.get('coorectanswer'))
      this.registry.set('correctanswer', [1, 2, 3, 4, 5, 6])
  }

  create() {
    //現在の解答がある場合、それを取得
    this.currentanswer = this.registry.get('answer')
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

    // Define the goback function
    const goback = () => {
      console.log('Go back button clicked')
      this.shutdown()
      this.scene.start('LLMScene1')
    }

    const gotoresult = () => {
      console.log('Go to result button clicked')
      this.finalanswer = this.registry.get('answer')
      this.correctanswer = this.registry.get('correctanswer')
      this.shutdown()
      this.scene.start('LLMScene4', {
        finalanswer: this.finalanswer,
        correctanswer: this.correctanswer,
      })
    }

    // Mount the React component
    this.root = createRoot(this.container)
    this.root.render(
      <LLMSelectionUI
        onchange={handleChange}
        goback={goback}
        currentanswer={this.currentanswer}
        gotoresult={gotoresult}
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
    if (this.container && this.root) {
      this.root.unmount()
      document.body.removeChild(this.container)
      this.root = null // Clear the root reference
    }
  }
}

export default LLMScene3
