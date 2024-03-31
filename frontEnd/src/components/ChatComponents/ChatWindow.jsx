import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import emergencyKeywords from './Keywords'; // Assuming you have a file containing emergencyKeywords

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const debouncedSend = debounce(handleSend, 1000); // Debounce handleSend

  async function handleSend(message) {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const timestamp = `${hours}:${minutes}`;

    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
      timestamp, // Add timestamp to the user message object
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

    setIsTyping(true);

    // Check if the user's message contains keywords related to emergency time information
    const isEmergencyRelated = checkEmergencyRelated(message);

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
            system_prompt: '',
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
            timestamp, // Add timestamp to the chatbot response object
          };
          setMessages([...newMessages, botMessage]);
        } else {
          console.error('Invalid response format from ChatGPT API');
          console.error('Response:', response.data);
        }
      } else {
        console.log('User message is not related to emergency time information. Skipping API request.');
        setMessages([...newMessages, {
          message: "I'm sorry, I can only provide emergency time information. Please ask me something related to that.",
          sender: 'ChatGPT',
          direction: 'incoming',
          timestamp, // Add timestamp to the chatbot response object
        }]);
      }
    } catch (error) {
      console.error('Error while sending message to ChatGPT API:', error);
    } finally {
      setIsTyping(false);
    }
  }

  // Function to check if the user's message contains keywords related to emergency time information
  function checkEmergencyRelated(message) {
    // Example keywords related to emergency time information
    const lowerCaseMessage = message.toLowerCase();
    return emergencyKeywords.some(keyword => lowerCaseMessage.includes(keyword));
  }

  const handleMessageSubmit = () => {
    if (inputMessage.trim() !== '') {
      debouncedSend(inputMessage); // Send the message through debouncedSend
      setInputMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior of newline on Enter
      handleMessageSubmit();
    } else if (e.key === 'Enter' && e.shiftKey) {
      // Add a newline character to the input
      setInputMessage(prevMessage => prevMessage + '\n');
    }
  };

  const renderMessageText = (message) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="body2" sx={{
          color: '#333',
          fontWeight: 500,
          display: 'flex',
          width: '100%',
          fontSize: 16,
        }}>
          {message.message}
        </Typography>
        <Typography variant="caption" sx={{ color: '#666', fontSize: 10 }}>
          {message.timestamp}
        </Typography>
      </div>
    );
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
            display: 'none', // Hide scrollbar for WebKit browsers (Chrome, Safari, etc.)
          },
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{ display:'flex',justifyContent: message.sender === 'ChatGPT' ? 'right' : 'left', marginBottom: 8 }}>
            <Paper
              sx={{
                backgroundColor: message.sender === 'user' ? '#DCF8C6' : '#E3E3E3',
                padding: 1.1,
                borderRadius: 4,
                marginBottom: 1,
                width: 'fit-content',
                maxWidth: '70%', // Limit the maximum width of the chat bubble
                wordWrap: 'break-word', // Allow long words to break and wrap to the next line
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                justifyContent: message.sender === 'user' ? 'flex-start' : 'flex-end',
              }}
            >
              {renderMessageText(message)}
            </Paper>
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
