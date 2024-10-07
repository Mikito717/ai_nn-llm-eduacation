import Phaser from 'phaser'
import React from 'react'
import { createRoot } from 'react-dom/client'
import SelectedTask from '../../components/SelectedTask'

class SelectedTaskp extends Phaser.Scene {
  constructor() {
    super({ key: 'SelectedTaskp' })

    this.container = null // DOMコンテナの参照を保持
  }

  create() {
    // Mount React component inside Phaser scene
    this.container = document.createElement('div')
    this.container.style.position = 'absolute'
    this.updateContainerPosition() // 初期位置を設定
    document.body.appendChild(this.container)

    // Assuming title, description, rewards, and onAccept are defined somewhere in your code
    const title = 'Sample Title'
    const description = 'Sample Description'
    const rewards = ['Reward1', 'Reward2']
    const onAccept = () => {
      console.log('Accepted')
    }

    const root = createRoot(this.container)

    root.render(
      <SelectedTask
        title={title}
        description={description}
        rewards={rewards}
        onAccept={onAccept}
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

export default SelectedTaskp
