import React, { useState, useRef, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMessageSubmit = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      // You can add logic here for sending the message to the server or processing it
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior of newline on Enter
      handleMessageSubmit();
    } else if (e.key === 'Enter' && e.shiftKey) {
      // Add a newline character to the input
      setInputMessage((prevMessage) => prevMessage + '\n');
    }
  };

  const renderMessageText = (text) => {
    return text.split('\n').map((line, index) => (
      <Typography key={index} variant="body2" sx={{ color: '#333', fontWeight: 500, textAlign: 'left', width: '100%', fontSize: 16 }}>
        {line}
      </Typography>
    ));
  };

  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Paper
        ref={messageContainerRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: 2,
          minHeight: 0,
          '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar for WebKit browsers (Chrome, Safari, etc.)
          },
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{ textAlign: 'left', marginBottom: 8 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <Paper
                sx={{
                  backgroundColor: message.sender === 'user' ? '#DCF8C6' : '#E3E3E3',
                  padding: 1.1,
                  borderRadius: 4,
                  width: 'fit-content',
                  maxWidth: '70%', // Limit the maximum width of the chat bubble
                  wordWrap: 'break-word', // Allow long words to break and wrap to the next line
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  justifyContent: 'center',
                }}
              >
                {renderMessageText(message.text)}
                <Typography variant="caption" sx={{ color: '#666', fontSize: 10 }}>
                  {`${hours}:${minutes}`}
                </Typography>
              </Paper>
            </Typography>
          </div>
        ))}
      </Paper>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ px: 2, py: 1 }}>
        <TextField
          fullWidth
          label="Type your message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          multiline  // Enable multiline input
          rows={1}  // Set the initial number of rows
        />
        <Button variant="contained" sx={{ height: '100%' }} onClick={handleMessageSubmit}>
          <SendIcon />
        </Button>
      </Stack>
    </Paper>
  );
};

export default ChatWindow;
