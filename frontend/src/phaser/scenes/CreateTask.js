import Phaser from 'phaser'
import React from 'react'
import ReactDOM from 'react-dom'
import TaskCreator from '../../components/TaskCreator'

class CreateTask extends Phaser.Scene {
  constructor() {
    super({ key: 'CreateTask' })
    this.container = null // DOMコンテナの参照を保持
  }

  create() {
    // Mount React component inside Phaser scene
    this.container = document.createElement('div')
    this.container.style.position = 'absolute'
    this.updateContainerPosition() // 初期位置を設定
    document.body.appendChild(this.container)

    ReactDOM.render(
      <TaskCreator
        onSubmitTask={(taskName) => {
          console.log('Task submitted:', taskName)
          // Handle task submission in Phaser scene
        }}
        onSelectAI={(ai) => {
          console.log('AI selected:', ai)
          // Handle AI selection in Phaser scene
        }}
        onBack={() => {
          this.shutdown()
          this.scene.start('TaskList')
        }}
      />,
      this.container,
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
      ReactDOM.unmountComponentAtNode(this.container)
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

export default CreateTask
