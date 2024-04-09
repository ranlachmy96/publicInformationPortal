/***************************************************************
 * Import Dependencies
 ***************************************************************/
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import styled from "styled-components";
import { PieChart } from '@mui/x-charts/PieChart';
import ResourceCard from '../ResourceComponents/ResourceCard.jsx';
import { GetAllCampaigns } from '../../API/Campaigns.api.js';
import Title from '../Title';

const Titles = styled.h3`
    margin-bottom: 10px;
`;

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
`;

const InnerDiv = styled.div`
    width: 50%;
    padding: 20px;
`;

const InfoDiv = styled.div`
    width: 50%;
    max-height: 90%;
    text-align: left;
    padding-left: 1.5%;
    display: flex;
    flex-direction: column;
`;

const TitleHeader = styled.h2`
    color: #486284;
    font-weight: bold;
    font-size: 37px;
    margin: 0;
    margin-top: 2%;
`;

const Description = styled.p`
    color: #8CA2C0;
`;

const StyledPieChart = styled(PieChart)`
    border: 2px solid white;
    border-radius: 5px;
`;
/***************************************************************
 * Component: ResourcesPage
 * - Renders a page displaying information about resources during crisis
 * - Fetches campaigns data using fetchCampaigns
 * - Counts campaigns by category and renders a pie chart
 ***************************************************************/
const ResourcesPage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [categoryCounts, setCategoryCounts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const campaignsData = await GetAllCampaigns();
                setCampaigns(campaignsData);
                countCampaignsByCategory(campaignsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const countCampaignsByCategory = (campaignsData) => {
        const counts = {};
        campaignsData.forEach(campaign => {
            counts[campaign.campaignCategory] = (counts[campaign.campaignCategory] || 0) + 1;
        });
        setCategoryCounts(counts);
    };

    const pieChartData = Object.entries(categoryCounts).map(([category, count], index) => ({
        id: index,
        value: count,
        label: category,
    }));

    return (
        <div>
            <Titles>Resources Information</Titles>
            <StyledDiv>
                <InnerDiv>
                    <img src="/Resources/Resource.png" alt="Resources" style={{ width: '100%' }} />
                </InnerDiv>
                <InfoDiv>
                    <TitleHeader>Resources during crisis</TitleHeader>
                    <Description>During emergencies, a wide range of resources is required to ensure an
                        effective disaster response and provide timely relief to affected individuals and communities.
                        These resources are essential for addressing the immediate needs that arise during and after a
                        disaster, such as natural calamities, conflicts, or public health crises. The significance of
                        these resources becomes even more pronounced in situations where infrastructure, essential
                        services, and livelihoods are disrupted or destroyed.</Description>
                </InfoDiv>
            </StyledDiv>
            <Box style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {campaigns.map(campaign => (
                    <ResourceCard
                        key={campaign._id}
                        campaign={campaign}
                    />
                ))}
            </Box>
            <Title text="Most Donated Resources" />
            <StyledDiv>
                <div style={{
                    backgroundColor: '#F5F5F5',
                    paddingLeft: '2%',
                    paddingTop: '1.5%',
                    borderRadius: '5px',
                    border: '2px solid #1976D2'
                }}>
                    <StyledPieChart
                        series={[
                            {
                                data: pieChartData,
                                label: pieChartData.category,
                            },
                        ]}
                        width={550}
                        height={250}
                    />
                </div>
            </StyledDiv>
        </div>
    );
};

export default ResourcesPage;
