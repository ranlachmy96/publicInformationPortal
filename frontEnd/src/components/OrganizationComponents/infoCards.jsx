import React from 'react';
import styled from 'styled-components';
import Button from '../OrganizationComponents/organizationButton.jsx';

const CardContainer = styled.div`
    width: 100%; /* Adjust width for responsiveness */
    max-width: 400px; /* Optional: Set maximum width to prevent stretching on larger screens */
    height: auto; /* Adjust height to auto for variable content */
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
    font-size: 1.2rem; /* Adjust font size for responsiveness */
`;

const Text = styled.p`
    text-align: start;
    margin-top: 5px;
    font-size: 1rem; /* Adjust font size for responsiveness */
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
    font-size: 0.9rem; /* Adjust font size for responsiveness */
`;

const InfoCards = ({ title, text, page, phone }) => {

    return (
        <CardContainer>
            <TextContainer>
                <Title>{title}</Title>
                <Text>{text}</Text>
            </TextContainer>
            <RowContainer>
                <Phone>Phone: {phone}</Phone>
                <Button text={'Link'} page={page} />
            </RowContainer>
        </CardContainer>
    );
};

export default InfoCards;
