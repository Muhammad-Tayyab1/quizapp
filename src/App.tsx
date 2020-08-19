import React, { useEffect, useState } from 'react';
import './App.css';
import { getQuizDetails } from './Services/Quiz_Service';
import { QuestionType } from './Types/Quiz_type';
import Questions from './Components/Questions';
import firebase from './FireBaseWork/firebase';
function App() {
  const messaging=firebase.messaging();
    Notification.requestPermission().then((permission) => { 
        console.log(permission) 
        if(permission === "granted"){
            messaging.getToken().then((currentToken) => {
                if (currentToken) {
                    console.log("TOKEN")
                    console.log(currentToken);
                } else {
                  console.log('No Instance ID token available. Request permission to generate one.');

                }
              }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
              });
        }
  
    })

  let [quiz, setQuiz] = useState<QuestionType[]>([]);
  let [currentStep, setCurrentStep] = useState(0);
  let [result, setResult] = useState(0);
  let [ShowResult, setShowResult] = useState(false);
  useEffect(() => {
    async function fetchdata() {
      const questions: QuestionType[] = await getQuizDetails(15, 'easy');
      setQuiz(questions);
    }
    fetchdata();

  }, [])
  const submit = (e: React.FormEvent<EventTarget>, userAns: string) => {
    e.preventDefault();

    const currentQuestion: QuestionType = quiz[currentStep];
    console.log("correct ans:" + currentQuestion.correct_answer + "userselected ans: " + userAns)
    if (userAns === currentQuestion.correct_answer) {
      setResult(++result)
    }
    if (currentStep !== quiz.length - 1)
      setCurrentStep(++currentStep);
    else {

      setShowResult(true);
    }

  }

  if (!quiz.length)
    return <h3 >Loading...</h3>

  if (ShowResult) {
    return (
     <div >
      
      <div className="Result">
        <h1>Result:</h1>
        <p className="h1text">Your Final Score is <b>{result}</b> out of: <b>{quiz.length}</b></p>
        <div className="btntry">
          <button
            className="btn"
            onClick={() => window.location.reload()}
          >
            Try again
          </button></div>
      </div>
    </div>)

  }
  return (
    <div className="App" >
   
      <h1>QuizApp</h1>
  <h4>Question Number: {currentStep} out of: {quiz.length}</h4>
  <div className="hscore">
  <h4 className="score">Your Score: {result}</h4>
  </div>
 
      <Questions
        options={quiz[currentStep].option}
        question={quiz[currentStep].question}
        
        callback={submit}
      />
    </div>
  );
}

export default App;
