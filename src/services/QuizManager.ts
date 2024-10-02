import { ICountry } from "./countryService";

export interface IQuestion {
    country: string;
    capital: string;
    flag: string;
    options: string[];
}

export class QuizManager {
    private questions: IQuestion[] = [];
    private currentQuestionIndex: number = 0;
    private score: number = 0;

    constructor(countries: ICountry[]) {
        this.questions = this.generateQuestions(countries);
    }

    //shuffle questions
    private shuffleQuestions(questions: IQuestion[]): IQuestion[] {
        // Fisher-Yates shuffle algorithm
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        return questions;
    }

    //get current question
    public getCurrentQuestion(): IQuestion {
        return this.questions[this.currentQuestionIndex] || null;
    }

    //check if the answer is correct
    public checkAnswer(answer: string): boolean {
        const currentQuestion = this.getCurrentQuestion();
        if (!currentQuestion) {
            return false;
        }
        const isCorrect = answer === currentQuestion.capital;
        if (isCorrect) {
            this.score++;
        }
        this.currentQuestionIndex++;
        return isCorrect;
    }

    //next question
    public nextQuestion(): boolean {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            return true;
        }
        return false;
    }

    //get the score
    public getScore(): number {
        return this.score;
    }

    // get total questions count
    public getTotalQuestionsCount(): number {
        return this.questions.length;
    }

    //reset the quiz
    public resetQuiz(): void {
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    //check if the quiz is finished
    public isQuizFinished(): boolean {
        return this.currentQuestionIndex >= this.questions.length - 1;
    }

    //Generate questions with multiple choice options
    public generateQuestions(countries: ICountry[]): IQuestion[] {
        return countries.map((country) => {
            //Create a set of 4 options including the correct answer
            const options = new Set<string>();
            options.add(country.capital);
            while (options.size < 4) {
                const randomCountry = countries[Math.floor(Math.random() * countries.length)];
                options.add(randomCountry.capital);
            }
            return {
                country: country.name,
                capital: country.capital,
                options: Array.from(options),
                flag: country.flag,
            };
        });
    }

    //get 3 random incorrect countries
    private getRandomIncorrectCountries(countries: ICountry[]): ICountry[] {
        const incorrectCountries = countries.filter((country) => {
            return country.capital !== this.getCurrentQuestion().capital;
        });
        return this.shuffleCountries(incorrectCountries).slice(0, 3);
    }

    //helper function to shuffle countries
    private shuffleCountries(countries: ICountry[]): ICountry[] {
        for (let i = countries.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [countries[i], countries[j]] = [countries[j], countries[i]];
        }
        return countries;
    }


}