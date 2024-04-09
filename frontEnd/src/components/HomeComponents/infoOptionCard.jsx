/***************************************************************
 * InfoOptionCard Component
 * - Define a functional component named InfoOptionCard
 * - Utilizes styled-components for styling
 * - Renders a card component with an icon, title, text, and a button
 * - Accepts props for icon type, title, text, page, and click handler for the button
 * - Maps icon type to corresponding Material-UI icon component
 * - Renders the icon, title, text, and button inside the card container
 ***************************************************************/
import React from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import styled from 'styled-components';

import Button from './HomeButton';

const CardContainer = styled.div`
    width: 50%;
    height: 300px;
    background-color: #f1f1f1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 25px;
    padding: 20px;
    margin: 20px;
`;

const IconContainer = styled.div`
    display: flex;
    align-items: start;
    margin-left: 30px;
    height: 30%;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-left: 30px;
    height: 60%;
`;

const Title = styled.h3`
    margin-bottom: 0px;
`;

const Text = styled.p`
    text-align: start;
    margin-top: 5px;
`;

const InfoOptionCard = ({icon, title, text, page, handleItemClick}) => {
    const iconsDict = {
        0: <ArticleIcon sx={{width: '50px', height: '50px'}}/>,
        1: <HealthAndSafetyIcon sx={{width: '50px', height: '50px'}}/>,
        2: <BusinessIcon sx={{width: '50px', height: '50px'}}/>,
        3: <InventoryIcon sx={{width: '50px', height: '50px'}}/>,
    };

    return (
        <CardContainer>
            <IconContainer>{iconsDict[icon]}</IconContainer>
            <TextContainer>
                <Title>{title}</Title>
                <Text>{text}</Text>
            </TextContainer>
            <Button text={'here'} page={page} handleItemClick={handleItemClick}/>
        </CardContainer>
    );
};

export default InfoOptionCard;
