import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';

const Result = () => {
    const location = useLocation();
    const { score, totalQuestions } = location.state;
    const navigate = useNavigate();

    const restartQuiz = () => {
        navigate('/');
    };

    return (
        <div className="result">
            <ResultCard score={score} totalQuestions={totalQuestions} />
            <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
    );
};

export default Result;