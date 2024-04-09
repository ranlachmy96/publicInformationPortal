/***************************************************************
 Import Dependencies
 ***************************************************************/
import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const StyledDiv = styled.div`
    padding: 1%;
    padding-left: 5%;
    padding-right: 5%;
    margin: 3%;
    background-color: #1976D2;
    color: white;
    text-align: center;
    font-weight: bold;
    display: inline-block;
    width: fit-content;
`;
/***************************************************************
 Title Component
 Renders a styled title with provided text
 ***************************************************************/
const Title = ({ text }) => {
    return (
        <StyledDiv>
            <Typography variant="h5" component="h2" gutterBottom>
                {text}
            </Typography>
        </StyledDiv>
    );
};

export default Title;
