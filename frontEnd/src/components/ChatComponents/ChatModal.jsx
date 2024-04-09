/***************************************************************
 * Transition Component
 * - Define a custom transition component using Slide from MUI
 ***************************************************************/

/***************************************************************
 * FullScreenDialog Component
 * - Define a functional component named FullScreenDialog
 * - Utilizes React.useState hook to manage dialog state
 * - Defines handleClickOpen and handleClose functions for opening and closing the dialog
 * - Renders a full-screen dialog with an action button and chat window
 * - Provides AppBar with a close button and title
 ***************************************************************/
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import SmartToyIcon from '@mui/icons-material/SmartToy';

import ChatWindow from './ChatWindow';
import ActionButton from './ActionButton';

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
                        width: '30%',
                        height: '75%',
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
                        <Typography sx={{ display: "flex", alignItems: 'center' }} variant="h6" component="div">
                            Information Bot
                            <SmartToyIcon sx={{ marginLeft: '10px' }} />

                        </Typography>
                    </Toolbar>
                </AppBar>
                <ChatWindow />

            </Dialog>
        </React.Fragment>
    );
}
