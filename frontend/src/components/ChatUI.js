import React, { useState } from 'react'

const ChatUI = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const handleSend = async () => {
    if (input.trim() === '') return

    const userMessage = { sender: 'user', text: input }
    setMessages([...messages, userMessage])

    // Simulate LLM response
    const llmResponse = await getLLMResponse(input)
    const botMessage = { sender: 'bot', text: llmResponse }
    setMessages([...messages, userMessage, botMessage])

    setInput('')
  }

  const getLLMResponse = async (message) => {
    // Simulate an API call to an LLM service
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`LLM response to: "${message}"`)
      }, 1000)
    })
  }

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={
              msg.sender === 'user' ? styles.userMessage : styles.botMessage
            }
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder="Type a message..."
        />
        <button onClick={handleSend} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBox: {
    width: '80%',
    height: '70%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    overflowY: 'scroll',
    marginBottom: '10px',
  },
  userMessage: {
    textAlign: 'right',
    margin: '5px 0',
    padding: '10px',
    backgroundColor: '#daf8cb',
    borderRadius: '10px',
  },
  botMessage: {
    textAlign: 'left',
    margin: '5px 0',
    padding: '10px',
    backgroundColor: '#f1f0f0',
    borderRadius: '10px',
  },
  inputContainer: {
    display: 'flex',
    width: '80%',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  sendButton: {
    padding: '10px 20px',
    marginLeft: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
}

export default ChatUI
