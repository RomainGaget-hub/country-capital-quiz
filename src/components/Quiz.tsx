import { useEffect, useState } from 'react';
import { IQuestion, QuizManager } from '../services/QuizManager';
import { getCountries, ICountry } from '../services/countryService';
import Question from './Question';
import Score from './Score';

const Quiz: React.FC = () => {
    //quiz manager instance
    const [quizManager, setQuizManager] = useState<QuizManager | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null);
    // const [answer, setAnswer] = useState<string | null>(null);
    // const [score, setScore] = useState<number>(0);
    // const [gameOver, setGameOver] = useState<boolean>(false);


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
            if (isCorrect) {
                //add class to the answer
                const answerElement = document.getElementById(answer);
                if (answerElement) {
                    answerElement.classList.add("correct");
                }
            }
            else {
                //add class to the answer
                const answerElement = document.getElementById(answer);
                if (answerElement) {
                    answerElement.classList.add("incorrect");
                }
            }
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
                    <Question question={currentQuestion} options={currentQuestion.options} onAnswer={handleAnswerClick} />
                    <Score score={quizManager?.getScore() || 0} />
                </div>
            )}
        </div>
    )
};

export default Quiz;