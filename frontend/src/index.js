// Code: Reactのエントリーポイント
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container) // createRootコンテナを作成
root.render(<App />) // Appコンポーネントをレンダリング
