export default function AnswerOptions({ options, onAnswer }: { options: string[], onAnswer: (answer: string) => void }) {
    return (
        <ul id="quizOptions">
            {options.map((option, index) => (
                <li key={index} onClick={() => onAnswer(option)}>{option}</li>
            ))}
        </ul>
    );
}