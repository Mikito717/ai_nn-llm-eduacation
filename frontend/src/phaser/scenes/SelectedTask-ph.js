import Phaser from 'phaser'
import React from 'react'
import { createRoot } from 'react-dom/client'
import SelectedTask from '../../components/SelectedTask'

class SelectedTaskp extends Phaser.Scene {
  constructor() {
    super({ key: 'SelectedTaskp' })
    this.container = null // DOMコンテナの参照を保持
    this.root = null // Reactルートの参照を保持
  }

  create() {
    // Mount React component inside Phaser scene
    this.container = document.createElement('div')
    this.container.style.position = 'absolute'
    this.updateContainerPosition() // 初期位置を設定
    document.body.appendChild(this.container)

    // Mount the React component
    this.root = createRoot(this.container)
    this.root.render(<SelectedTask handleback={this.handleback.bind(this)} />)

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

  handleback() {
    console.log('back')
    this.shutdown()
    this.scene.start('TaskList')
  }

  shutdown() {
    // シーンがシャットダウンするときにReactコンポーネントをクリーンアップ
    if (this.root) {
      console.log('unmounting')
      this.root.unmount()
    }
    if (this.container) {
      document.body.removeChild(this.container)
      this.container = null // 参照をクリア
    }
    console.log('shutdown')
    // メモリリークを防ぐためにイベントリスナーを削除
    window.removeEventListener(
      'resize',
      this.updateContainerPosition.bind(this),
    )
  }
}

export default SelectedTaskp
