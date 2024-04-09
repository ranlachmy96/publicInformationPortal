import React from 'react';
import Typography from '@mui/material/Typography';


const Message = ({ message }) => {
    return (
        <div data-testid={'Message'} style={{ display: 'flex', flexDirection: 'column' }}>
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

export default Message;