import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { GetAllAlerts } from '../../API/Alerts.api';

const StyledPaper = styled(Paper)`
  width: 80vw;
  height: 70vh;
  background-image: url('../../../public/Welcome.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InnerPaper = styled(Paper)`
  width: 70%;
  height: 100%;
  margin: 2%;
  border-radius: 45px;
`;

const StyledLi = styled.li`
  margin-bottom: 2%;
  max-width: 90%; /* Adjust the max-width as needed */
  opacity: 0;
  animation: fadeInOut 2s forwards; /* Fade-in and fade-out animation */
`;

const scroll = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;

const StyledUl = styled.ul`
  margin: 5%;
  text-align: left;
  overflow: hidden;
  position: relative;
  height: 160px; 
`;

const ScrollingContainer = styled.div`
  animation: ${scroll} 15s linear infinite; 
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const Welcome = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAlerts = await GetAllAlerts();
        setAlerts(fetchedAlerts);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };
    fetchData();

    const interval = setInterval(() => {
      setAlerts(prevAlerts => {
        const newAlerts = [...prevAlerts];
        newAlerts.push(newAlerts.shift()); // Rotate alerts array
        return newAlerts;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div data-testid={'welcome'}>
        <StyledPaper elevation={3}>
          <ContentWrapper>
            <Typography style={{ marginTop: '15px', fontSize: '15px', fontWeight: 'bold' }} variant="h6" component="h2">
              Stay Informed, Stay Safe<br />
              “Eido Peretz & Ran Lachmy”
            </Typography>
            <InnerPaper>
              <div style={{ margin: '3%' }}>
                <Typography style={{ fontSize: '24px', fontWeight: 'bold' }} variant="h5" component="h2" gutterBottom>
                  Active Alerts
                </Typography>
                <StyledUl>
                  <ScrollingContainer>
                    {alerts.map((alert, index) => (
                        <StyledLi key={index} style={{ animationDelay: `${index * 2}s`, opacity: 1 }}>
                          <div>{alert.description}</div>
                          <div>{alert.date}</div>
                        </StyledLi>
                    ))}
                  </ScrollingContainer>
                </StyledUl>
              </div>
            </InnerPaper>
          </ContentWrapper>
        </StyledPaper>
      </div>
  );
};

export default Welcome;
