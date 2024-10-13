import Phaser from 'phaser'
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import PlayerNameInputUI from '../../components/PlayerNameInputUI'
//todo:より見た目をかっこよくする

class PlayerNameInput extends Phaser.Scene {
  constructor() {
    super({ key: 'PlayerNameInput' })
    this.name = '' // プレイヤーの名前を保存するための変数
    this.container = null // DOMコンテナの参照を保持
    this.onNameSubmit = this.onNameSubmit.bind(this)
  }

  create() {
    // Mount React component inside Phaser scene
    this.container = document.createElement('div')
    this.container.style.position = 'absolute'
    this.updateContainerPosition() // 初期位置を設定
    document.body.appendChild(this.container)

    // Mount the React component
    const root = createRoot(this.container)
    root.render(<PlayerNameInputUI onNameSubmit={this.onNameSubmit} />)

    // ウィンドウのサイズ変更イベントを監視
    window.addEventListener('resize', this.updateContainerPosition.bind(this))
  }

  onNameSubmit(submitname) {
    this.name = submitname
    console.log('プレイヤーの名前:', this.name)
    // シーンを切り替える
    this.registry.set('username', this.name)
    this.shutdown()
    this.scene.start('MainMenu', { playerName: this.name })
  }

  updateContainerPosition() {
    console.log('updateContainerPosition')
    // Phaserゲームキャンバスのサイズを取得
    const canvas = this.game.canvas.getBoundingClientRect()
    this.container.style.left = `${canvas.left + 150}px`
    this.container.style.top = `${canvas.top + 20}px`
  }

  shutdown() {
    if (this.root) {
      this.root.unmount() // 既存の createRoot() インスタンスを使用してコンポーネントを削除
    }
    // シーンがシャットダウンするときにReactコンポーネントをクリーンアップ
    if (this.container) {
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

export default PlayerNameInput
