import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ChatWindow from './ChatWindow';
// import { Chatbot } from 'react-chatbot-kit';
// import 'react-chatbot-kit/build/main.css';
// import config from './Chatbot/config';
// import ActionProvider from './Chatbot/ActionProvider';
// import MessageParser from './Chatbot/MessageParser';

import ActionButton from './ActionButton';

import './ChatBot.style.css';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <ActionButton func={handleClickOpen} />
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                PaperProps={{
                    sx: {
                        width: '25%',
                        height: '70%',
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        borderRadius: '15px 0px 0px 0px',
                    },
                }}
            >
                <AppBar sx={{ position: 'relative', height: '12%', display: 'flex', justifyContent: 'center' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Chat
                        </Typography>   
                    </Toolbar>
                </AppBar>
                {/* content here */}
                {/* <Chatbot 
                    config={config}
                    actionProvider={ActionProvider}
                    messageParser={MessageParser}
                /> */}
                <ChatWindow />

            </Dialog>
        </React.Fragment>
    );
}
