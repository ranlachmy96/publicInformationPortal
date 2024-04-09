/***************************************************************
 * Button Component
 * - Define a functional component named Button
 * - Accepts props: text and page (URL)
 * - Renders a StyledButton component as an anchor tag
 * - Uses the href attribute to link to the specified page
 * - Uses target="_blank" to open the link in a new tab
 * - Displays the text content inside the button
 * - Returns the JSX structure for the Button component
 ***************************************************************/
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.a`
    background-color: #1976D2;
    color: #fff;
    font-weight: bold;
    text-decoration: none;
    padding: 9px 20px;
    border-radius: 15px;
    cursor: pointer;
    border: 3px solid #fff;

    &:hover {
        color: #1976D2;
        background-color: #fff;
        border: 3px solid #1976D2;
    }
`;

const Button = ({ text, page }) => {
    return (
        <StyledButton href={page} target="_blank">
            {text}
        </StyledButton>
    );
};

export default Button;
