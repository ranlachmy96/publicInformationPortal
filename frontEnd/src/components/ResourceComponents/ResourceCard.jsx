/***************************************************************
 * ResourceCard Component
 * - Define a functional component named ResourceCard
 * - Accepts props: campaign (an object containing campaign details)
 * - Uses state to manage the expanded/collapsed state of the card
 * - Defines a function handleExpandClick to toggle the expansion state
 * - Returns a Card component with MUI styling
 * - Displays campaign title and type in the card header
 * - Provides an IconButton to expand/collapse additional content
 * - Uses Collapse component to conditionally render additional content
 *   when the card is expanded
 * - Additional content includes campaign description and goal amount
 ***************************************************************/
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ResourceCard({ campaign }) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ bgcolor: 'grey.200', width: '45%', marginLeft: '4%', marginBottom: '4%' }}>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <span> • {campaign.title} {campaign.campaignType}</span>
                <IconButton
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div>
                    <p>{campaign.campaignDesc}</p>
                    <span>Goal Amount: {campaign.goal}</span>
                </div>
            </Collapse>
        </Card>
    );
}
