import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.a`
    background-color: #1976D2;
    color: #fff;
    font-weight: bold;
    text-decoration: none; 
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        color: #486284; 
    }
`;

const Button = ({ text, page }) => {
    return (
        <StyledButton href={page} target="_blank"> {/* Use href to specify the URL */}
            {text}
        </StyledButton>
    );
};

export default Button;
