import React, { useState } from 'react'

const LLMSelectionUI = ({ onchange }) => {
  const [selectedButton, setSelectedButton] = useState(null)

  const handleClick = (buttonNumber) => {
    console.log(`Button ${buttonNumber} clicked`)
    setSelectedButton(buttonNumber)
    onchange(buttonNumber)
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <button
          key={num}
          onClick={() => handleClick(num)}
          style={{
            backgroundColor: selectedButton === num ? '#4CAF50' : '#008CBA', // 選択されたボタンの色を変更
            color: 'white',
            fontSize: '20px',
            padding: '20px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            width: '150px', // 幅を100%に設定
            height: '100px', // 高さを100%に設定
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.3s', // 背景色のトランジションを追加
          }}
        >
          Button {num}
        </button>
      ))}
    </div>
  )
}

export default LLMSelectionUI
