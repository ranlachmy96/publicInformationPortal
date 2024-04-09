import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

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
        <div style={{ width: '100%' }}>
            <Paper elevation={3} style={{ width: '90%', margin: 'auto', marginTop: '30px', padding: '20px', display: 'flex', alignItems: 'center', borderRadius: '25px' }}>
                <div style={{ width: '20%' }}>
                    <img src={websiteImage} alt={website} style={{ width: '100%', height: 'auto', borderRadius: '25px' }} />
                </div>
                <div style={{ marginLeft: '30px', width: '80%' }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ width: '70%', textAlign: 'left', fontWeight: 'bold', fontSize: '18px' }}>
                        Title - {title}
                    </Typography>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'left', fontWeight: 'bold', fontSize: '18px' }}>
                        Source - {website}
                    </Typography>
                    {link && (
                        <Typography variant="h5" component="div" sx={{ width: '100%', textAlign: 'left', fontSize: '18px', marginTop: '10px' }}>
                            <a href={link} target="_blank" rel="noopener noreferrer"><b>Link</b></a>
                        </Typography>
                    )}
                </div>
            </Paper>
        </div>
    );
};

export default ArticleCard;
