import axios from 'axios';

const API_URL = 'https://opentdb.com/api.php?amount=10&type=multiple';

const fetchWithRetry = async (url, retries = 3, delay = 2000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.get(url);
            return response.data.results.map((question) => ({
                question: question.question,
                options: [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5),
                correctAnswer: question.correct_answer,
            }));
        } catch (error) {
            if (error.response && error.response.status === 429 && i < retries - 1) {
                console.warn(`Rate limit hit! Retrying in ${delay / 1000} seconds...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
                console.error('Error fetching quiz data:', error);
                throw error;
            }
        }
    }
};

export const fetchQuizData = async () => {
    const cachedData = localStorage.getItem('quizData');
    const cacheTime = localStorage.getItem('quizCacheTime');

    if (cachedData && cacheTime && Date.now() - cacheTime < 5 * 60 * 1000) { 
        console.log('Using cached quiz data');
        return JSON.parse(cachedData);
    }

    const data = await fetchWithRetry(API_URL);
    localStorage.setItem('quizData', JSON.stringify(data));
    localStorage.setItem('quizCacheTime', Date.now());
    return data;
};
