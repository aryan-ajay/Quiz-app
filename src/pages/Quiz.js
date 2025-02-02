import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuizData } from '../utils/api';
import QuizCard from '../components/QuizCard';

const Quiz = () => {
    const [quizData, setQuizData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadQuizData = async () => {
            try {
                const data = await fetchQuizData();
                if (data && Array.isArray(data)) {
                    setQuizData(data);
                } else {
                    setError('Invalid quiz data format.');
                }
            } catch (error) {
                setError('Failed to load quiz data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        loadQuizData();
    }, []);

    const handleAnswer = (selectedOption) => {
        if (quizData.length === 0) return;

        if (selectedOption === quizData[currentQuestion].correctAnswer) {
            setScore((prevScore) => prevScore + 1);
        }

        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        } else {
            setTimeout(() => {
                navigate('/result', { state: { score: score + 1, totalQuestions: quizData.length } });
            }, 100);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!quizData || quizData.length === 0) {
        return <div>No quiz data available.</div>;
    }

    return (
        <div className="quiz">
            <QuizCard
                question={quizData[currentQuestion].question}
                options={quizData[currentQuestion].options}
                onAnswer={handleAnswer}
            />
        </div>
    );
};

export default Quiz;
