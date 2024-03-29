import React from 'react';
import Fab from '@mui/material/Fab';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const ActionButton = ({func}) => {

    return (
        <div>
            <Fab onClick={func} color="primary" aria-label="add" sx={{position:'fixed',bottom:'15px',right:'15px'}}>
                <QuestionMarkIcon />
            </Fab>
        </div>
    );
};

export default ActionButton;