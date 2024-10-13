import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const LLMSelectionUI = ({ onchange, goback, currentanswer, gotoresult }) => {
  const [selectedButton, setSelectedButton] = useState(null)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleClick = (buttonNumber) => {
    console.log(`Button ${buttonNumber} clicked`)
    setSelectedButton(buttonNumber)
    onchange(buttonNumber)
  }

  const handlegoBack = () => {
    goback()
  }

  const handleSubmit = () => {
    const isConfirmed = window.confirm('本当に提出しますか？')
    if (isConfirmed) {
      // 提出のロジックをここに追加
      console.log('提出が確認されました')
      setSnackbarOpen(true)
      gotoresult()
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  const announceAnswer = () => {
    if (!currentanswer || !Array.isArray(currentanswer)) {
      return null
    }

    const answerLabels = {
      '-1': '未回答',
      1: '言語',
      2: '政治',
      3: '倫理',
      4: '科学',
      5: '社会規範',
      6: '健康',
      7: '冗談',
    }

    const validAnswers = currentanswer.slice(0, 6)
    if (validAnswers.length > 0) {
      return (
        <div>
          <p>現在の解答:</p>
          <ul style={{ display: 'flex', listStyleType: 'none', padding: 0 }}>
            {validAnswers.map((answer, index) => (
              <li key={index} style={{ marginRight: '10px' }}>
                {index + 1}: {answerLabels[answer] || '不明'}
              </li>
            ))}
          </ul>
        </div>
      )
    }
    return null
  }

  return (
    <>
      <div>
        <h1>LLMs Selection </h1>
      </div>
      <div>{announceAnswer()}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
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
              width: '130px', // 幅を100%に設定
              height: '50px', // 高さを100%に設定
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {num}
          </button>
        ))}
      </div>
      <button
        onClick={() => handlegoBack()}
        style={{
          marginTop: '5px',
          padding: '5px 20px',
          fontSize: '16px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          height: '30px',
          width: '150px',
          marginRight: '10px', // Add margin to the right
        }}
      >
        前画面に戻る
      </button>
      <button
        onClick={() => handleSubmit()}
        style={{
          marginTop: '5px',
          padding: '5px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          height: '30px',
          width: '150px',
        }}
      >
        解答提出
      </button>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          提出が確認されました
        </MuiAlert>
      </Snackbar>

      <div>
        <h1>ルール説明</h1>
        <p>1. 6つのボタンから1つを選択してください。</p>
        <p>2. 選択したLLMとの対話が始まります。</p>
        <p>
          3. これらのLLMは以下のいずれかのバイアスをもっています。
          <br />
          その嘘を見抜き、どのLLMがどのバイアスをもっているか選んでください。
        </p>
        <p>
          バイアス集
          <br />
          A:言語,B:政治,C:倫理,D:科学,E:社会規範,F:健康,G:冗談
        </p>
      </div>
    </>
  )
}

export default LLMSelectionUI
