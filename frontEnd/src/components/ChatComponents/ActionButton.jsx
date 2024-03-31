import React from 'react';
import Fab from '@mui/material/Fab';
import MessageIcon from '@mui/icons-material/Message';

const ActionButton = ({func}) => {

    return (
        <div>
            <Fab onClick={func} color="primary" aria-label="add" sx={{position:'fixed',bottom:'15px',right:'15px'}}>
                <MessageIcon />
            </Fab>
        </div>
    );
};

export default ActionButton;