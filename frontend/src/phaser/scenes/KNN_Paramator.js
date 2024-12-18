import Phaser from 'phaser'
import React from 'react'
import { createRoot } from 'react-dom/client'
import KNN_UI from '../../components/KNN_UI' // Adjust the path as necessary

class KNN_Paramator extends Phaser.Scene {
  constructor() {
    super({ key: 'KNN_Paramator' })
    this.container = null // DOMコンテナの参照を保持
  }

  create() {
    // Mount React component inside Phaser scene
    this.container = document.createElement('div')
    this.container.style.position = 'absolute'
    this.updateContainerPosition() // 初期位置を設定
    document.body.appendChild(this.container)
    this.task = this.registry.get('NowTask')
    this.username = this.registry.get('username')
    // Mount the React component
    this.root = createRoot(this.container)
    this.root.render(
      <KNN_UI
        task={this.task}
        username={this.username}
        backToTaskList={this.backToTaskList.bind(this)}
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

  backToTaskList() {
    this.shutdown()
    this.scene.start('TaskList')
  }

  shutdown() {
    // シーンがシャットダウンするときにReactコンポーネントをクリーンアップ
    if (this.container) {
      this.root.unmount()
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

export default KNN_Paramator
