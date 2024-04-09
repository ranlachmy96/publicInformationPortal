/***************************************************************
 * ActionButton Component
 * - Define a functional component named ActionButton
 * - Accepts props: func (function)
 * - Renders a floating action button with a message icon
 * - Executes the provided function on click event
 ***************************************************************/
import React from 'react';
import Fab from '@mui/material/Fab';
import MessageIcon from '@mui/icons-material/Message';

const ActionButton = ({ func }) => {

    return (
        <div>
            <Fab onClick={func} color="primary" aria-label="add"
                sx={{ position: 'fixed', bottom: '25px', right: '20px' }}>
                <MessageIcon />
            </Fab>
        </div>
    );
};

export default ActionButton;