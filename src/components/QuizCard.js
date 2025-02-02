import React from 'react';

const QuizCard = ({ question, options, onAnswer }) => {
    return (
        <div className="quiz-card">
            <h3>{question}</h3>
            <ul>
                {options.map((option, index) => (
                    <li key={index} onClick={() => onAnswer(option)}>
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizCard;