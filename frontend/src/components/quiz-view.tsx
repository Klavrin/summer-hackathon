import { useState } from 'react'
import { cn } from '../lib/utils'
import { FaCheck } from 'react-icons/fa'
import { Button } from './ui/button'
import FinishedQuizView from './finished-quiz-view'

const quiz = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctIndex: 2
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctIndex: 1
  },
  {
    question: 'What is 7 + 8?',
    options: ['12', '14', '15', '16'],
    correctIndex: 2
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
    correctIndex: 2
  },
  {
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctIndex: 3
  }
]

const QuizView = () => {
  const [questionProgress, setQuestionProgress] = useState(0)
  const [chosenOption, setChosenOption] = useState<number | null>(null)
  const [quizFinished, setQuizFinished] = useState(false)
  const [answeredQuestionsRight, setAnsweredQuestionsRight] = useState(0)

  const handleNextQuestionButton = () => {
    if (questionProgress < quiz.length - 1) {
      setQuestionProgress(questionProgress + 1)
    } else {
      setQuizFinished(true)
    }
    setChosenOption(null)
  }

  const handleChooseOption = (option: number, correctIndex: number) => {
    setChosenOption(option)
    if (option === correctIndex) {
      setAnsweredQuestionsRight(answeredQuestionsRight + 1)
    }
  }

  return (
    <div className="w-[688px]">
      {!quizFinished ? (
        <>
          <p className="text-neutral-400">
            Question {questionProgress + 1} of {quiz.length}
          </p>
          <h1 className="text-2xl mb-6 font-medium">{quiz[questionProgress].question}</h1>
          <div className="flex flex-col gap-2">
            {quiz[questionProgress].options.map((item, index) => (
              <div
                className={cn(
                  'border-2 border-neutral-300 p-2 px-4 rounded-lg flex justify-between cursor-pointer hover:bg-neutral-100',
                  chosenOption === index
                    ? 'bg-gray-200 hover:bg-gray-200 border-gray-300'
                    : 'bg-auto'
                )}
                onClick={() =>
                  handleChooseOption(index, quiz[questionProgress].correctIndex)
                }
              >
                {item}
                <div className="w-6 h-6 border border-neutral-400 rounded-full flex items-center justify-center">
                  {chosenOption === index && <FaCheck size={15} color="#262626" />}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end w-full mt-4">
            <Button
              className="cursor-pointer"
              disabled={chosenOption === null}
              onClick={handleNextQuestionButton}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <FinishedQuizView
          answeredQuestionsRight={answeredQuestionsRight}
          quizLength={quiz.length}
        />
      )}
    </div>
  )
}

export default QuizView
