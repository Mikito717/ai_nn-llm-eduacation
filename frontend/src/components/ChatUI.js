import React, { useState, useEffect, useRef } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import { marked, use } from 'marked'
import { Typography, MenuItem, Select, Snackbar } from '@mui/material'

// スタイル付きコンポーネントを定義
const StyledList = styled(List)(({ theme }) => ({
  width: '500px',
  maxWidth: 2000,
  backgroundColor: theme.palette.background.paper,
  color: '#808080',
  height: '340px',
  overflow: 'auto',
}))

const ChatContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#808080',
}))

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))

const AnswerButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}))

// 例: marked関数を使用する部分
const renderMarkdown = (input) => {
  if (!input) {
    console.error('marked(): input parameter is undefined or null')
    return ''
  }
  return marked(input)
}

const ChatUI = ({ chatNumber, answerSelected, username }) => {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [selectedValue, setSelectedValue] = useState(1)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  console.log('chatNumber:', chatNumber, 'username:', username)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/run_LLM', {
          chatNumber: chatNumber,
          username: username,
          resetflag: true,
        })

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: response.data.message,
            sender:
              response.data.role === 'system'
                ? 'ai'
                : response.data.role === 'assistant'
                ? 'ai'
                : response.data.role === 'user'
                ? 'user'
                : 'ai',
          },
        ])
      } catch (error) {
        console.error('初期データの取得エラー:', error)
      }
    }

    fetchData()
  }, []) // 空の依存配列を渡すことで、コンポーネントのマウント時に1度だけ実行される

  const handleSubmit = async () => {
    try {
      //messagesが空の場合、resetflagをtrueにする
      if (messages.length === 0) {
        console.log('resetflag is true')
      }
      setMessages([...messages, { content: inputValue, sender: 'user' }])
      setInputValue('')
      const response = await axios.post('http://localhost:5000/run_LLM', {
        message: inputValue,
        chatNumber: chatNumber,
        username: username,
      })

      const aiMessage = response.data.message
      const renderedMessage = renderMarkdown(aiMessage)

      setMessages((prevMessages) => [
        ...prevMessages,
        { content: renderedMessage, sender: 'ai' },
      ])
    } catch (error) {
      console.error('メッセージの送信エラー:', error)
    }
  }

  const handleAnswer = () => {
    console.log('Answer button clicked')
    console.log('answernumber:', selectedValue)
    setOpenSnackbar(true)
    answerSelected(selectedValue)
  }

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  const FlexContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  })

  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  return (
    <ChatContainer>
      <Typography variant="h6">
        Here is No.<span style={{ color: 'blue' }}>{chatNumber}</span> room
      </Typography>
      <StyledList style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'rgba(128, 128, 128, 0.3)',
            fontSize: '5em',
            fontWeight: 'bold',
            zIndex: 0,
          }}
        >
          AI
        </div>
        {messages.map((message, index) => (
          <div key={index} style={{ position: 'relative', zIndex: 1 }}>
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
                          __html: message.content
                            ? marked(message.content)
                            : '',
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
        label="Enter message."
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        InputLabelProps={{ style: { color: '#000' } }}
        InputProps={{ style: { color: '#000', backgroundColor: '#FFFFF' } }}
      />
      <StyledButton variant="contained" onClick={handleSubmit}>
        Submit
      </StyledButton>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Select value={selectedValue} onChange={handleSelectChange}>
          {[
            { value: 1, label: 'Language' },
            { value: 2, label: 'Politics' },
            { value: 3, label: 'Ethics' },
            { value: 4, label: 'Science' },
            { value: 5, label: 'Social norm' },
            { value: 6, label: 'Health' },
            { value: 7, label: 'Joke' },
          ].map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <AnswerButton onClick={handleAnswer}>Answer</AnswerButton>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Answers accepted."
      />
    </ChatContainer>
  )
}

export default ChatUI
