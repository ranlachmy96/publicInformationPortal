import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import Title from '../Title';
import Welcome from '../HomeComponents/Welcome';
import InfoOptionCard from '../HomeComponents/infoOptionCard'
import Video from '../HomeComponents/Video'

const StyledDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2%;
`

const HomePage = ({ handleItemClick }) => {
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Typography style={{ fontWeight: 'bold' }} variant="h4" component="h2" gutterBottom>
                Welcome to the Home Page
            </Typography>
            <Welcome />
            <div>
                <Title text="Information Options" />

                <StyledDiv>
                    <InfoOptionCard icon={0} title="Live Articles" text="Current Israeli news coverage from global sources." page={'Articles'} handleItemClick={handleItemClick} />
                    <InfoOptionCard icon={1} title="Safety Instruction" text="This website provides safety  instructions on various topics during emergency situations." page={'Health & Safety'} handleItemClick={handleItemClick} />
                </StyledDiv>
                <StyledDiv>
                    <InfoOptionCard icon={2} title="Organization" text="A compilation of safety and emergency organizations along with relevant information." page={'Business'} handleItemClick={handleItemClick} />
                    <InfoOptionCard icon={3} title="Resources" text="Information about available resources, recourse options, and demand." page={'Inventory'} handleItemClick={handleItemClick} />
                </StyledDiv>
            </div>
            <div style={{ width: '100%' }}>
                <Video />
            </div>
        </div>
    );
};

export default HomePage;
