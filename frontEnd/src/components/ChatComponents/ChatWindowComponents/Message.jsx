/***************************************************************
 * Message Component
 * - Define a functional component named Message
 * - Utilizes styled-components for styling
 * - Renders a message with a body and timestamp
 * - Accepts a prop named 'message' containing the message content and timestamp
 * - Uses Typography component from MUI for text styling
 ***************************************************************/
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from "styled-components";

const StyledMessage = styled.div`
    display: flex;
    flex-direction: column;
`;

const BodyTypography = styled(Typography)`
    color: #333;
    font-weight: 500;
    display: flex;
    width: 100%;
    font-size: 16px;
`;

const CaptionTypography = styled(Typography)`
    color: #666;
    font-size: 10px;
`;

const Message = ({ message }) => {
    return (
        <StyledMessage data-testid={'Message'}>
            <BodyTypography variant="body2">
                {message.message}
            </BodyTypography>
            <CaptionTypography variant="caption">
                {message.timestamp}
            </CaptionTypography>
        </StyledMessage>
    );
};

export default Message;
