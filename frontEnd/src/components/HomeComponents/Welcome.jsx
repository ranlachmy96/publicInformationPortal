import React from 'react';
import styled from 'styled-components';
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
  borderRadius:'45px'
`;

const StyledLi = styled.li`
  margin-bottom: 1%;
`;

const StyledUl = styled.ul`
    margin: 5%;
    text-align: left;
`;

const Welcome = () => {
    return (
        <div>
            <StyledPaper elevation={3}>
                <ContentWrapper>
                    <Typography style={{marginTop:'15px',fontSize:'15px',fontWeight:'bold'}} variant="h6" component="h2" >
                        Stay Informed, Stay Safe<br />
                        “tarzan”
                    </Typography>
                    <InnerPaper>
                        <div style={{ margin: "3%" }}>
                            <Typography style={{fontSize:'24px',fontWeight:'bold'}}  variant="h5" component="h2" gutterBottom>
                                Active Alerts
                            </Typography>
                            <StyledUl>
                                <StyledLi>Alert 1</StyledLi>
                                <StyledLi>Alert 2</StyledLi>
                                <StyledLi>Alert 3</StyledLi>
                                <StyledLi>Alert 4</StyledLi>
                                <StyledLi>Alert 5</StyledLi>
                                <StyledLi>Alert 6</StyledLi>
                            </StyledUl>
                        </div>
                    </InnerPaper>
                </ContentWrapper>
            </StyledPaper>
        </div>
    );
};

export default Welcome;
