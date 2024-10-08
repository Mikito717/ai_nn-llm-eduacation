import Phaser from 'phaser'
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import LLMSelectionUI from ファイルパス

class 名前を入力 extends Phaser.Scene {
    constructor() {
        super({ key: 名前を入力 })
        this.container = null // DOMコンテナの参照を保持
    }

    create() {
        // Mount React component inside Phaser scene
        this.container = document.createElement('div')
        this.container.style.position = 'absolute'
        this.updateContainerPosition() // 初期位置を設定
        document.body.appendChild(this.container)

        // Mount the React component
        const root = createRoot(this.container);
        root.render(<名前を入力 />);

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

export default 名前を入力
