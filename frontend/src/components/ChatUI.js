import React, { useState, useEffect, useRef } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { marked } from 'marked'
import { Typography } from '@mui/material' // 修正箇所

// スタイル付きコンポーネントを定義
const StyledList = styled(List)(({ theme }) => ({
  width: '500px',
  maxWidth: 2000,
  backgroundColor: theme.palette.background.paper,
  color: '#808080',
  maxWidth: '100%',
  height: '380px',
  overflow: 'auto',
}))

const InlineListItemText = styled(ListItemText)({
  display: 'inline',
  color: '#808080',
})

const ChatContainer = styled('div')(({ theme }) => ({
  // ここにスタイルを追加
  backgroundColor: '#808080',
}))

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const ChatUI = ({ chatNumber }) => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = async () => {
    try {
      setMessages([...messages, { content: inputValue, sender: 'user' }])
      const response = await axios.post('http://localhost:5000/run_LLM', {
        message: inputValue,
        chatNumber: chatNumber, // chatNumberを追加
      })
      setInputValue('')
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: response.data.message, sender: 'ai' },
      ])
    } catch (error) {
      console.error('メッセージの送信エラー:', error)
    }
  }

  const FlexContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  })

  const listRef = useRef(null) // リストを参照するためのrefを作成

  useEffect(() => {
    if (listRef.current) {
      // リストの末尾にスクロール
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages]) // messagesが変更されたときにスクロール

  return (
    <ChatContainer>
      <Typography variant="h6">Here is {chatNumber} room</Typography>
      <StyledList>
        {messages.map((message, index) => (
          <div key={index}>
            <ListItem alignItems="flex-start" style={{ padding: '10px' }}>
              <FlexContainer
                style={{
                  backgroundColor:
                    message.sender === 'ai' ? '#e0f7fa' : '#fff3e0',
                  borderRadius: '8px',
                  padding: '10px',
                }}
              >
                <span
                  style={{
                    fontSize: '0.8em',
                    color: message.sender === 'ai' ? '#00796b' : '#d84315',
                    marginBottom: '10px',
                    display: 'block',
                    marginRight: '10px',
                  }}
                >
                  {message.sender === 'ai' ? 'AI' : 'You'}
                </span>
                <ListItemText
                  primary={
                    message.sender === 'ai' ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: marked(message.content),
                        }}
                      />
                    ) : (
                      <span>{message.content}</span>
                    )
                  }
                  style={{
                    color: message.sender === 'ai' ? '#00796b' : '#d84315',
                    fontWeight: 'bold',
                  }}
                />
              </FlexContainer>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </StyledList>
      <TextField
        id="standard-basic"
        label="メッセージを入力"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        InputLabelProps={{ style: { color: '#000' } }}
        InputProps={{ style: { color: '#000', backgroundColor: '#FFFFF' } }}
      />
      <StyledButton variant="contained" onClick={handleSubmit}>
        送信
      </StyledButton>
    </ChatContainer>
  )
}

export default ChatUI
