/***************************************************************
 * Styled Components
 * - Define styled components for different parts of the card:
 *   - CardContainer: Container for the entire card
 *   - TextContainer: Container for text content
 *   - Title: Styled heading for the card title
 *   - Text: Styled paragraph for the card text
 *   - RowContainer: Container for the row at the bottom of the card
 *   - Phone: Styled paragraph for the phone number
 ***************************************************************/

/***************************************************************
 * InfoCards Component
 * - Define a functional component named InfoCards
 * - Accepts props: title, text, page, and phone
 * - Render the card using styled components
 * - Display the title and text inside the TextContainer
 * - Display the phone number and a button in the RowContainer
 * - Return the JSX structure for the InfoCards component
 ***************************************************************/
import React from 'react';
import styled from 'styled-components';
import Button from '../OrganizationComponents/organizationButton.jsx';

const CardContainer = styled.div`
    width: 100%;
    max-width: 400px;
    height: auto;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
    padding-bottom: 7%;
    padding-left: 2%;
    padding-right: 2%;
    margin: 20px;
    position: relative;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;

const Title = styled.h3`
    margin-bottom: 0;
    font-size: 1.2rem;
`;

const Text = styled.p`
    text-align: start;
    margin-top: 5px;
    font-size: 1rem;
`;

const RowContainer = styled.div`
    position: absolute;
    bottom: 10px;
    left: 20px;
    right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Phone = styled.p`
    text-align: start;
    margin-top: 5px;
    font-weight: bold;
    font-size: 1rem;
`;

const InfoCards = ({ title, text, page, phone }) => {

    return (
        <CardContainer>
            <TextContainer>
                <Title data-testid={'title'}>{title}</Title>
                <Text data-testid={'text'}>{text}</Text>
            </TextContainer>
            <RowContainer>
                <Phone data-testid={'phone'}>Phone: {phone}</Phone>
                <Button text={'Link'} page={page} />
            </RowContainer>
        </CardContainer>
    );
};

export default InfoCards;
