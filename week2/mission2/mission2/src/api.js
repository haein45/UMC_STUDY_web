import axios from 'axios';

const API_KEY = '82d96a19dcd5debe0fd8501ccc9dfeec';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmQ5NmExOWRjZDVkZWJlMGZkODUwMWNjYzlkZmVlYyIsIm5iZiI6MTcxOTA2NjQ1NS4yMDA3MzQsInN1YiI6IjY2NDQ2ZDlmZjI0NDJkZWJhNjI0MTk4YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BmxkF9LyEkIyM4e6iqn_l04t2tayQ4icBl_aRiZzftM';
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`
    }
};

export const fetchMovies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, options);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};
