import React from 'react';

const ResultCard = ({ score, totalQuestions }) => {
    return (
        <div className="result-card">
            <h2>Quiz Completed!</h2>
            <p>Your Score: {score} / {totalQuestions}</p>
        </div>
    );
};

export default ResultCard;