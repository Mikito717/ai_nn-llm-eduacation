import React, { useState, useEffect, useRef } from 'react'; // 正しい書き方
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { marked } from 'marked'; // markedをインポート

// スタイル付きコンポーネントを定義
const StyledList = styled(List)(({ theme }) => ({
  width: '500px',
  maxWidth: 2000,
  backgroundColor: theme.palette.background.paper,
  color: '#000', // テキストの色を白に設定
  maxWidth: '100%', // 幅を100%に設定
  height: '380px', // 高さを300pxに設定
  overflow: 'auto', // オーバーフロー時にスクロールバーを表示
}));

const InlineListItemText = styled(ListItemText)({
  display: 'inline',
  color: '#000', // テキストの色を白に設定
});

const ChatContainer = styled('div')(({ theme }) => ({
  backgroundColor: '#FFFFFF ', // 背景色を白に設定
  padding: theme.spacing(2), // パディングを追加
  borderRadius: '8px', // 角を丸くする
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff', // ボタンのテキストの色を白に設定
  backgroundColor: theme.palette.primary.main, // MUIのプライマリカラーを使用
  '&:hover': {
    backgroundColor: theme.palette.primary.dark, // ホバー時の色を変更
  },
}));



const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async () => {
    try { 
      setMessages([...messages, { content: inputValue,sender: 'user' }]);
      const response = await axios.post('http://localhost:5000/run_LLM', { message: inputValue });
        setInputValue('');
        setMessages(prevMessages => [
          ...prevMessages,
          { content: response.data.message, sender: 'ai' }
        ])
    } catch (error) {
      console.error('メッセージの送信エラー:', error);
    }
  };

  const FlexContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between', // 余白を均等に
    alignItems: 'center', // 垂直方向に中央揃え
    width: '100%',
  });

  const listRef = useRef(null); // リストを参照するためのrefを作成

  useEffect(() => {
    if (listRef.current) {
      // リストの末尾にスクロール
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]); // messagesが変更されたときにスクロール
  return (
    <ChatContainer>
      <StyledList>
        {messages.map((message, index) => (
          <div key={index}>
            <ListItem alignItems="flex-start" style={{ padding: '10px' }}>
              <FlexContainer style={{
                backgroundColor: message.sender === 'ai' ? '#e0f7fa' : '#fff3e0', // 背景色の変更
                borderRadius: '8px', // 角の丸み
                padding: '10px'
              }}>
                {/* 送信者名の表示 */}
                <span style={{
                  fontSize: '0.8em', // 小さなフォントサイズ
                  color: message.sender === 'ai' ? '#00796b' : '#d84315', // テキスト色の変更
                  marginBottom: '10px', // メッセージとの間に空間を追加
                  display: 'block', // ブロック要素にしてメッセージの上に表示
                  marginRight: '10px' // メッセージとの間に空間を追加
                }}>
                  {message.sender === 'ai' ? 'AI' : 'You'}
                </span>
                <ListItemText 
                  primary={
                    message.sender === 'ai' ? ( // AIの場合のみマークダウンを適用
                      <span 
                        dangerouslySetInnerHTML={{ __html: marked(message.content) }} // マークダウンをHTMLに変換
                      />
                    ) : ( // ユーザーの場合は通常のテキスト
                      <span>{message.content}</span>
                    )
                  } 
                  style={{
                    color: message.sender === 'ai' ? '#00796b' : '#d84315', // テキスト色の変更
                    fontWeight: 'bold'
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
        InputLabelProps={{ style: { color: "#000" } }} // ラベルの色を黒に設定
        InputProps={{ style: { color: '#000' } }} // テキストフィールドのテキストの色を白に設定
      />
      <StyledButton variant="contained" onClick={handleSubmit}>
        送信
      </StyledButton>
    </ChatContainer>
  );
}

export default ChatUI;
