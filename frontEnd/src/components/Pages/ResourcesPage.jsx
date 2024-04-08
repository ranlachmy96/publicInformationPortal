import React from 'react';
import Box from '@mui/material/Box';
import styled from "styled-components";
import ResourceCard from '../ResourceComponents/ResourceCard.jsx'

const Title = styled.h3`
    margin-bottom: 10px;
`;

const ResourcesPage = () => {
    return (
        <div>
            <Title>Resources Information</Title>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', flexWrap: 'wrap' }}>
                <div style={{ width: '50%', padding: '20px' }}>
                    <img src="../../../public/Resources/Resource.png" alt="Resources" style={{ width: '100%' }} />
                </div>
                <div style={{
                    width: '50%',
                    maxHeight: '90%',
                    textAlign: 'left',
                    paddingLeft: '1.5%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <h2 style={{
                        color: '#486284',
                        fontWeight: 'bold',
                        fontSize: '37px',
                        margin: '0',
                        marginTop: '2%'
                    }}>Resources during crisis</h2>
                    <p style={{ color: '#8CA2C0' }}>During emergencies, a wide range of resources is required to ensure an effective disaster response and provide timely relief to affected individuals and communities. These resources are essential for addressing the immediate needs that arise during and after a disaster, such as natural calamities, conflicts, or public health crises. The significance of these resources becomes even more pronounced in situations where infrastructure, essential services, and livelihoods are disrupted or destroyed.</p>
                </div>
            </div>
            <Box style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />
                <ResourceCard />

            </Box>
        </div>
    );
};

export default ResourcesPage;
