import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import InfoCards from '../OrganizationComponents/infoCards.jsx'
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { GetAllOrganizations } from '../../API/Organizations.api.js';

const StyledDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`

const OrganizationPage = () => {
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from your API or database
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
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h3>Important Emergency Organizations</h3>
            <div style={{display:"flex",justifyContent:'flex-start',width:"85%"}}>
            <h2 style={{
                color: '#486284',
                fontWeight: 'bold',
                fontSize: '33px',
                margin: '0',
                marginTop: '2%'
            }}>Organizations List:</h2>
            </div>
            <StyledDiv>
                {loading ? (
                    <CircularProgress/>
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
        </div>
    );
};

export default OrganizationPage;
