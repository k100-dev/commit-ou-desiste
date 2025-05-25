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
    text: "O que significa o 'A' em ACID?",
    options: ["Autenticação", "Autorização", "Atomicidade", "Disponibilidade"],
    correctAnswer: 2,
    explanation: "A atomicidade garante que uma transação seja tratada como uma única unidade indivisível, que ou é concluída totalmente ou não ocorre."  
  },
  {
    id: 2,
    text: "Qual comando torna permanentes as alterações de uma transação?",
    options: ["SAVE", "COMMIT", "STORE", "FINALIZE"],
    correctAnswer: 1,
    explanation: "O comando COMMIT torna permanentes todas as alterações feitas durante a transação e visíveis para outros usuários."
  },
  {
    id: 3,
    text: "O que acontece quando um ROLLBACK é executado?",
    options: [
      "Os dados são salvos em um servidor externo",
      "O banco de dados avança para a próxima transação",
      "Todas as alterações desde o último COMMIT são descartadas",
      "O banco de dados é reiniciado para seu estado inicial"
    ],
    correctAnswer: 2,
    explanation: "ROLLBACK descarta todas as alterações feitas durante a transação atual, retornando o banco de dados ao estado do início da transação."
  },
  {
    id: 4,
    text: "Qual problema de concorrência ocorre quando uma transação lê dados modificados por outra transação ainda não confirmada?",
    options: ["Leitura Fantasma", "Leitura Suja", "Leitura Não Repetível", "Atualização Perdida"],
    correctAnswer: 1,
    explanation: "Uma Leitura Suja ocorre quando uma transação lê dados que foram modificados por outra transação ainda não confirmada."
  },
  {
    id: 5,
    text: "O que é um deadlock em sistemas de banco de dados?",
    options: [
      "Quando o servidor do banco de dados falha inesperadamente",
      "Quando duas transações aguardam por bloqueios uma da outra",
      "Quando uma transação não consegue adquirir nenhum bloqueio",
      "Quando o banco de dados está bloqueado para manutenção"
    ],
    correctAnswer: 1,
    explanation: "Um deadlock ocorre quando duas ou mais transações esperam indefinidamente por bloqueios mantidos umas pelas outras, criando uma dependência circular."
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
        <h3 className="text-2xl font-bold mb-6 text-center text-purple-600">Resultado do Quiz</h3>

        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-purple-50 rounded-full mb-4">
            <div className="text-3xl font-bold text-purple-600">{score}/{questions.length}</div>
            <div className="text-sm text-gray-600">({percentage.toFixed(0)}%)</div>
          </div>

          <p className="text-lg font-medium">
            {percentage >= 80 ? '🎉 Excelente trabalho!' :
             percentage >= 60 ? '👍 Bom trabalho!' :
             'Continue estudando! Você vai conseguir!'}
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-2">E agora?</h4>
          <p className="text-sm text-gray-700">
            Reveja os conceitos de transações em banco de dados que você teve mais dificuldade, especialmente aqueles relacionados às perguntas erradas.
            Experimente os exemplos interativos novamente para reforçar seu entendimento.
          </p>
        </div>

        <button
          onClick={restartQuiz}
          className="w-full py-3 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
        >
          Reiniciar Quiz
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium text-gray-600">Pergunta {currentQuestion + 1} de {questions.length}</p>
          <p className="text-sm font-medium text-gray-600">Pontuação: {score}/{currentQuestion}</p>
        </div>

        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-100">
          <div 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500 transition-all duration-500"
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
                ? 'hover:bg-purple-50 bg-white border border-gray-200'
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
        <div className="bg-purple-50 p-4 rounded-lg mb-6 animate-fade-in">
          <h4 className="font-semibold mb-2">Explicação</h4>
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
              : 'bg-purple-600 text-white hover:bg-purple-700'
          } transition-colors`}
        >
          {currentQuestion < questions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}
        </button>
      </div>
    </div>
  );
};