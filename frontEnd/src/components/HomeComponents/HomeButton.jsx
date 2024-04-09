/***************************************************************
 * Button Component
 * - Define a functional component named Button
 * - Utilizes styled-components for styling
 * - Renders a button with custom styling
 * - Accepts props for button text, page, and click handler
 * - Calls handleItemClick function when the button is clicked
 ***************************************************************/
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #1976D2;
    color: #fff;
    font-weight: bold;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
    padding-right: 10px;
    height: 20%;
`;

const Button = ({text, page, handleItemClick}) => {
    const handleClick = () => {
        handleItemClick(page);
    };

    return (
        <ButtonContainer>
            <StyledButton onClick={handleClick}>
                {text}
            </StyledButton>
        </ButtonContainer>
    );
};

export default Button;
