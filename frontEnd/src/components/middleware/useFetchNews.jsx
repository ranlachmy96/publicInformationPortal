/***************************************************************
 * useFetchNews Hook
 * - Define a custom hook named useFetchNews
 * - Initialize state variables: newsData, loading, and error using useState hook
 * - Define a useEffect hook to fetch news data when the component mounts
 * - Inside the useEffect, define a function fetchNews to make a GET request to the news API
 * - Set loading to true while fetching data
 * - If the request is successful, set newsData with the response data and setLoading to false
 * - If an error occurs during the request, set error with the error object and setLoading to false
 * - Return an object containing newsData, loading, and error
 ***************************************************************/
import {useState, useEffect} from 'react';
import axios from 'axios';

const useFetchNews = () => {
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            const options = {
                method: 'GET',
                url: 'https://israel-live-news-api.p.rapidapi.com/news',
                headers: {
                    'X-RapidAPI-Key': 'db6562e42bmsh58cdf15d9ea7e92p197a88jsnff808b80a1e8',
                    'X-RapidAPI-Host': 'israel-live-news-api.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                setNewsData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    return {newsData, loading, error};
};
export default useFetchNews;
