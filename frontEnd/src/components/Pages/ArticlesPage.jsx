/***************************************************************
 * Import Dependencies
 ***************************************************************/
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import ArticleCard from '../ArticleComponents/ArticleCard';
import useFetchNews from '../middleware/useFetchNews';
/***************************************************************
 * Component: ArticlesPage
 * - Renders a page displaying Israeli articles from around the globe
 * - Fetches news data using useFetchNews hook
 ***************************************************************/
const ArticlesPage = () => {
    const { newsData, loading, error } = useFetchNews();

    return (
        <div data-testid={'articlePage'}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Israeli Articles<br />From Around The Globe
            </Typography>
            {loading &&
                <Box sx={{ display: 'flex', marginTop: '30px' }}>
                    <CircularProgress />
                </Box>
            }
            {error &&
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={'/Error.jpg'} alt="Error" style={{ width: '50%', height: 'auto', borderRadius: '25px' }} />
                    <Typography variant="h5" component="h2" gutterBottom sx={{ marginTop: '-40px', fontWeight: 'bold' }}>
                        Error fetching data
                    </Typography>
                </div>
            }
            {newsData && (
                <div style={{
                    display: 'flex',
                    width: '90vw',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {newsData.map((article, index) => (
                        <ArticleCard
                            key={index}
                            sx={{ width: '100%' }}
                            title={article.title}
                            link={article.url}
                            website={article.source}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArticlesPage;
