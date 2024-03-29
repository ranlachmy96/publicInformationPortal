import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

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
  animation: slide-up 1s ease infinite alternate; /* Animation added */
`;

const StyledUl = styled.ul`
  margin: 5%;
  text-align: left;
`;



const Welcome = () => {
  const alerts = ['Alert 1', 'Alert 2', 'Alert 3', 'Alert 4', 'Alert 5', 'Alert 6', 'Alert 7'];
  const [displayedIndex, setDisplayedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedIndex(prevIndex => (prevIndex + 1) % alerts.length);
    }, 3000); // Change this interval as needed

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [alerts.length]);

  const displayedAlerts = [
    alerts[displayedIndex],
    alerts[(displayedIndex + 1) % alerts.length],
    alerts[(displayedIndex + 2) % alerts.length],
    alerts[(displayedIndex + 3) % alerts.length],
  ];

  return (
    <div>
      <StyledPaper elevation={3}>
        <ContentWrapper>
          <Typography style={{ marginTop: '15px', fontSize: '15px', fontWeight: 'bold' }} variant="h6" component="h2">
            Stay Informed, Stay Safe<br />
            “tarzan”
          </Typography>
          <InnerPaper>
            <div style={{ margin: '3%' }}>
              <Typography style={{ fontSize: '24px', fontWeight: 'bold' }} variant="h5" component="h2" gutterBottom>
                Active Alerts
              </Typography>
              <StyledUl>
                {displayedAlerts.map((alert, index) => (
                  <StyledLi key={index}>{alert}</StyledLi>
                ))}
              </StyledUl>
            </div>
          </InnerPaper>
        </ContentWrapper>
      </StyledPaper>
    </div>
  );
};

export default Welcome;
