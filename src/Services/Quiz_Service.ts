import {Quiz, QuestionType} from './../Types/Quiz_type';
const shuffleArray=(array: any[]) =>
[...array].sort(() => Math.random() - 0.5)

export const  getQuizDetails=async(totalQuestions: number, level: string): Promise<QuestionType[]> => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${level}&type=multiple`);
    let {results}=await res.json();
     const quiz:QuestionType[]=results.map((questionsobj: Quiz)=>{
         console.log(level);
        
         
     return {  
             question: questionsobj.question,
             answer: questionsobj.correct_answer,
             correct_answer: questionsobj.correct_answer,
             option: shuffleArray(questionsobj.incorrect_answers.concat(questionsobj.correct_answer))
        
             
    }})
    return quiz;
}