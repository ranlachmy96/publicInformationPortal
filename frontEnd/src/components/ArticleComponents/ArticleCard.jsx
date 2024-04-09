/***************************************************************
 * Styled Components
 * - Define styled components for various elements using styled-components library
 * - Customize styles for a div, Paper component, image container, article image, and content container
 ***************************************************************/

/***************************************************************
 * ArticleCard Component
 * - Define a functional component named ArticleCard
 * - Accepts props: title (string), link (string), website (string)
 * - Renders a paper component containing an image and content of an article
 * - Displays title, source, and link (if available)
 ***************************************************************/
import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import styled from "styled-components";

const StyledDiv = styled.div`
    width: 100%;
`;

const StyledPaper = styled(Paper)`
    width: 90%;
    margin: auto;
    margin-top: 30px;
    padding: 20px;
    display: flex;
    align-items: center;
    border-radius: 25px;
`;

const ImageContainer = styled.div`
    width: 20%;
`;

const ArticleImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 25px;
`;

const ContentContainer = styled.div`
    margin-left: 30px;
    width: 80%;
`;

const ArticleCard = ({ title, link, website }) => {
    const websiteDict = {
        'guardian': '/Websites/Guardian.jpg',
        'nyt': '/Websites/nytimes.png',
        'thetimes': '/Websites/TheTimes.png',
        'es': '/Websites/TheStandard.jpg',
        'bbc': '/Websites/bbc.jpg',
        'telegraph': '/Websites/The_Telegraph.jpg',
        'latimes': '/Websites/LaTimes.png',
        'smh': '/Websites/Sydney.png',
    };

    const websiteImage = websiteDict[website] || '/Default.png';

    return (
        <StyledDiv>
            <StyledPaper elevation={3}>
                <ImageContainer>
                    <ArticleImage src={websiteImage} alt={website} />
                </ImageContainer>
                <ContentContainer>
                    <Typography variant="h5" component="h2" gutterBottom
                        sx={{ width: '70%', textAlign: 'left', fontWeight: 'bold', fontSize: '18px' }}>
                        Title - {title}
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom
                        sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: '18px' }}>
                        Source - {website}
                    </Typography>
                    {link && (
                        <Typography variant="h5" component="div"
                            sx={{ width: '100%', textAlign: 'left', fontSize: '18px', marginTop: '10px' }}>
                            <a href={link} target="_blank" rel="noopener noreferrer"><b>Link</b></a>
                        </Typography>
                    )}
                </ContentContainer>
            </StyledPaper>
        </StyledDiv>
    );
};

export default ArticleCard;
