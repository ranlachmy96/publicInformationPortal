import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ResourceCard() {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ bgcolor: 'grey.200', width:'45%',marginLeft:'4%',marginBottom:'4%' }}>
            <CardActions sx={{display:'flex',justifyContent:'space-between'}} >
                <span> • Financial Resources</span>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div>This is the content of the dropdown.</div>
            </Collapse>
        </Card>
    );
}
