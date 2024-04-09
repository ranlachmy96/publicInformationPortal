/***************************************************************
 * Import Dependencies
 ***************************************************************/
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import InfoCards from '../OrganizationComponents/infoCards.jsx';
import styled from 'styled-components';
import { GetAllOrganizations } from '../../API/Organizations.api.js';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h3`
    margin-bottom: 10px;
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 85%;
`;

const Heading = styled.h2`
    color: #486284;
    font-weight: bold;
    font-size: 33px;
    margin: 0;
    margin-top: 20px;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;
/***************************************************************
 * Component: OrganizationPage
 * - Renders a page displaying important emergency organizations
 * - Fetches organizations data using GetAllOrganizations
 ***************************************************************/
const OrganizationPage = () => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetAllOrganizations()
            .then(data => {
                setOrganizations(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching organizations:', error);
                setLoading(false);
            });
    }, []);
    return (
        <Container>
            <Title>Important Emergency Organizations</Title>
            <Header>
                <Heading>Organizations List:</Heading>
            </Header>
            <StyledDiv>
                {loading ? (
                    <CircularProgress />
                ) : (
                    organizations.map(org => (
                        <InfoCards
                            key={org._id}
                            title={org.title}
                            text={org.description}
                            page={org.url}
                            phone={org.phone}
                        />
                    ))
                )}
            </StyledDiv>
        </Container>
    );
};

export default OrganizationPage;
