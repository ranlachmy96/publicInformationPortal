import React from 'react';
import styled from 'styled-components';
import Button from '../OrganizationComponents/organizationButton.jsx';

const CardContainer = styled.div`
    width: 40%;
    height: 250px;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    border-radius: 25px;
    padding: 20px;
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
`;

const Text = styled.p`
    text-align: start;
    margin-top: 5px;
`;

const RowContainer = styled.div`
    position: absolute; 
    bottom: 20px; 
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
