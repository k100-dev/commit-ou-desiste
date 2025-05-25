import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "What does the 'A' in ACID stand for?",
    options: ["Authentication", "Authorization", "Atomicity", "Availability"],
    correctAnswer: 2,
    explanation: "Atomicity ensures that a transaction is treated as a single, indivisible unit, which either completes entirely or doesn't happen at all."
  },
  {
    id: 2,
    text: "Which command makes transaction changes permanent?",
    options: ["SAVE", "COMMIT", "STORE", "FINALIZE"],
    correctAnswer: 1,
    explanation: "The COMMIT command makes all changes made during the transaction permanent and visible to other users."
  },
  {
    id: 3,
    text: "What happens when a ROLLBACK is executed?",
    options: [
      "Data is backed up to an external server",
      "The database rolls forward to the next transaction",
      "All changes since the last COMMIT are discarded",
      "The entire database is reset to its initial state"
    ],
    correctAnswer: 2,
    explanation: "ROLLBACK discards all changes made during the current transaction, returning the database to its state at the beginning of the transaction."
  },
  {
    id: 4,
    text: "Which concurrency problem occurs when a transaction reads data that has been modified by another transaction that has not yet committed?",
    options: ["Phantom Read", "Dirty Read", "Non-repeatable Read", "Lost Update"],
    correctAnswer: 1,
    explanation: "A Dirty Read happens when one transaction reads data that has been modified by another transaction that hasn't committed yet."
  },
  {
    id: 5,
    text: "What is a deadlock in database systems?",
    options: [
      "When the database server crashes unexpectedly",
      "When two transactions are waiting for locks held by each other",
      "When a transaction is unable to acquire any locks",
      "When the database is locked for maintenance"
    ],
    correctAnswer: 1,
    explanation: "A deadlock occurs when two or more transactions are waiting indefinitely for locks held by each other, creating a circular dependency."
  }
];

export const QuizComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(optionIndex);
    
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setShowExplanation(true);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };
  
  if (quizCompleted) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center text-blue-600">Quiz Results</h3>
        
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
            <div className="text-3xl font-bold text-blue-600">{score}/{questions.length}</div>
            <div className="text-sm text-gray-600">({percentage.toFixed(0)}%)</div>
          </div>
          
          <p className="text-lg font-medium">
            {percentage >= 80 ? '🎉 Excellent work!' : 
             percentage >= 60 ? '👍 Good job!' : 
             'Keep learning! You\'ll get there!'}
          </p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-2">What's Next?</h4>
          <p className="text-sm text-gray-700">
            Review the database transaction concepts you struggled with, especially those related to the questions you missed.
            Try the interactive demos again to reinforce your understanding.
          </p>
        </div>
        
        <button
          onClick={restartQuiz}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Restart Quiz
        </button>
      </div>
    );
  }
  
  const question = questions[currentQuestion];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
          <p className="text-sm font-medium text-gray-600">Score: {score}/{currentQuestion}</p>
        </div>
        
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
          <div 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
          ></div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-6">{question.text}</h3>
      
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={selectedOption !== null}
            className={`w-full text-left p-4 rounded-md transition-all duration-200 ${
              selectedOption === null
                ? 'hover:bg-blue-50 bg-white border border-gray-200'
                : selectedOption === index
                  ? index === question.correctAnswer
                    ? 'bg-green-100 border border-green-300'
                    : 'bg-red-100 border border-red-300'
                  : index === question.correctAnswer
                    ? 'bg-green-100 border border-green-300'
                    : 'bg-white border border-gray-200 opacity-70'
            } flex items-center`}
          >
            <span className="flex-grow">{option}</span>
            {selectedOption !== null && (
              <span className="ml-2">
                {index === question.correctAnswer ? (
                  <CheckCircle className="text-green-600 h-5 w-5" />
                ) : selectedOption === index ? (
                  <XCircle className="text-red-600 h-5 w-5" />
                ) : (
                  <HelpCircle className="text-gray-400 h-5 w-5" />
                )}
              </span>
            )}
          </button>
        ))}
      </div>
      
      {showExplanation && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6 animate-fade-in">
          <h4 className="font-semibold mb-2">Explanation</h4>
          <p className="text-sm text-gray-700">{question.explanation}</p>
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          onClick={handleNextQuestion}
          disabled={selectedOption === null}
          className={`py-2 px-6 rounded-md ${
            selectedOption === null
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors`}
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      </div>
    </div>
  );
};