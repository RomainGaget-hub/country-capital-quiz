import React from 'react';
import { IQuestion } from '../services/QuizManager';
import '../styles/Question.css';
import AnswerOptions from './AnswerOptions';
interface QuestionProps {
    question: IQuestion;
    options: string[];
    onAnswer: (answer: string) => void;
}

export default function Question({ question, options, onAnswer }: QuestionProps) {
    console.log("question", question);
    return (
        <div className="questionContainer">
            <h2>What is the capital of {question.country}?</h2>
            <img src={question.flag} alt={question.country} />
            <AnswerOptions options={options} onAnswer={onAnswer} />
        </div>
    );
}