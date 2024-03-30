import React, { useState, useRef, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }

    socket.on("receive_message", (data) => {
      setMessages([...messages, { text: data.message, sender: 'other', timestamp: new Date() }]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [messages]);

  const handleMessageSubmit = () => {
    if (inputMessage.trim() !== '') {
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');

      setMessages([...messages, { text: inputMessage, sender: 'user', timestamp: currentTime }]);
      socket.emit("send_message", { message: inputMessage });

      setInputMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleMessageSubmit();
    } else if (e.key === 'Enter' && e.shiftKey) {
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
            display: 'none',
          },
          scrollbarWidth: 'none',
        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{ textAlign: 'left', marginBottom: 8 }}>
            <Typography variant="body1" sx={{ mb: 1,display:'flex',justifyContent: message.sender === 'user' ? 'flex-start' : 'flex-end', }}>
              <Paper
                sx={{
                  backgroundColor: message.sender === 'user' ? '#DCF8C6' : '#E3E3E3',
                  padding: 1.1,
                  borderRadius: 4,
                  width: 'fit-content',
                  maxWidth: '70%',
                  wordWrap: 'break-word',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {renderMessageText(message.text)}
                <Typography variant="caption" sx={{ color: '#666', fontSize: 10 }}>
                  {`${message.timestamp.getHours().toString().padStart(2, '0')}:${message.timestamp.getMinutes().toString().padStart(2, '0')}`}
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
          multiline
          rows={1}
        />
        <Button variant="contained" sx={{ height: '100%' }} onClick={handleMessageSubmit}>
          <SendIcon />
        </Button>
      </Stack>
    </Paper>
  );
};

export default ChatWindow;
