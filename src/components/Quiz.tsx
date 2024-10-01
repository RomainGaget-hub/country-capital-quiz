import { useEffect, useState } from 'react';
import { IQuestion, QuizManager } from '../services/QuizManager';
import { getCountries, ICountry } from '../services/countryService';

const Quiz: React.FC = () => {
    //quiz manager instance
    const [quizManager, setQuizManager] = useState<QuizManager | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);

    useEffect(() => {
        const setupQuiz = async () => {
            const countries = await getCountries();
            const quizManager = new QuizManager(countries);
            setQuizManager(quizManager);
            setCurrentQuestion(quizManager.getCurrentQuestion());
        };
        setupQuiz();
    }, []);

    const handleAnswerClick = (answer: string) => {
        if (quizManager && currentQuestion) {
            const isCorrect = quizManager.checkAnswer(answer);
            //handle score update and next question
            if (quizManager.nextQuestion()) {
                setCurrentQuestion(quizManager.getCurrentQuestion());
            } else {
                //quiz is over
                console.log("Quiz is over");
            }
        }
    };

    return (
        <div>
            {currentQuestion && (
                <div>
                    <h2>What is the capital of {currentQuestion.country}?</h2>
                    <ul>
                        {currentQuestion.options.map((option, index) => (
                            <li key={index} onClick={() => handleAnswerClick(option)}>{option}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
};

export default Quiz;