/***************************************************************
 * ChatWindow Component
 * - Define a functional component named ChatWindow
 * - Utilizes React hooks (useState, useRef, useEffect) for managing state and side effects
 * - Renders a chat window with a message input field, send button, and message history
 * - Handles user input, message sending, and displaying bot responses
 * - Debounces message sending to avoid rapid API calls
 * - Provides loading indicator during message sending
 * - Scrolls to bottom of message container when new messages are added
 ***************************************************************/
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import LinearProgress from '@mui/material/LinearProgress';

import emergencyKeywords from './ChatWindowComponents/Keywords';
import Message from './ChatWindowComponents/Message';
import Validate from '../middleware/messageValidator';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messageContainerRef = useRef(null);
  const debouncedSend = debounce(handleSend, 500);

  useEffect(() => {
    addIntroductoryMessage();
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  function checkEmergencyRelated(message) {
    const lowerCaseMessage = message.toLowerCase();
    return emergencyKeywords.some(keyword => lowerCaseMessage.includes(keyword));
  }

  const handleMessageSubmit = () => {
    if (inputMessage.trim() !== '') {
      debouncedSend(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleMessageSubmit();
    } else if (e.key === 'Enter' && e.shiftKey) {
      setInputMessage(prevMessage => prevMessage + '\n');
    }
  };

  const addIntroductoryMessage = () => {

    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const timestamp = `${hours}:${minutes}`;

    const introMessage = {
      message: "Hello, I'm an emergency bot powered by ChatGPT. Ask me anything related to emergency information.",
      sender: 'ChatGPT',
      direction: 'incoming',
      timestamp,
    };
    setMessages([introMessage]);
  };

  async function handleSend(message) {
    setLoading(true);
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const timestamp = `${hours}:${minutes}`;

    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
      timestamp,
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    let isEmergencyRelated = checkEmergencyRelated(message);
    const validResault = await Validate(message);
    if (validResault != 'error') {
      isEmergencyRelated = validResault;
    }

    try {
      if (isEmergencyRelated) {
        const options = {
          method: 'POST',
          url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'db6562e42bmsh58cdf15d9ea7e92p197a88jsnff808b80a1e8',
            'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
          },
          data: {
            messages: newMessages.map(msg => ({ role: 'user', content: msg.message })),
            web_access: false,
            system_prompt: 'Emergency information chatbot.',
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256
          }
        };

        const response = await axios.request(options);
        console.log('API Response:', response.data);

        const { result, status, server_code } = response.data;
        if (result && status && server_code === 1) {
          const botMessage = {
            message: result,
            sender: 'ChatGPT',
            direction: 'incoming',
            timestamp,
          };
          setMessages([...newMessages, botMessage]);
        } else {
          console.error('Invalid response format from ChatGPT API');
          console.error('Response:', response.data);
        }
      } else {
        console.log('User message is not related to emergency time information. Skipping API request.');
        setMessages([...newMessages, {
          message: "I'm sorry, I can only provide emergency information. Please ask me something related to that.",
          sender: 'ChatGPT',
          direction: 'incoming',
          timestamp,
        }]);
      }
    } catch (error) {
      console.error('Error while sending message to ChatGPT API:', error);
    }
    setLoading(false);
  }

  return (
    <Paper
      data-testid="chat-window"
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
          backgroundImage: 'url(/chatWallpaper.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',

        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: message.sender === 'ChatGPT' ? 'right' : 'left',
            marginBottom: 8
          }}>
            <Paper
              sx={{
                backgroundColor: message.sender === 'user' ? '#DCF8C6' : '#E3E3E3',
                padding: 1.1,
                borderRadius: 4,
                marginBottom: 1,
                width: 'fit-content',
                maxWidth: '70%',
                wordWrap: 'break-word',
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                justifyContent: message.sender === 'user' ? 'flex-start' : 'flex-end',
              }}
            >
              <Message message={message} />
            </Paper>
          </div>
        ))}
      </Paper>
      {loading && (
        <LinearProgress sx={{ height: 2 }} />
      )}
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
