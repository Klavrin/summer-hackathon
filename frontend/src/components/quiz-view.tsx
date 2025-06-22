import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { FaCheck } from 'react-icons/fa'
import { Button } from './ui/button'
import FinishedQuizView from './finished-quiz-view'
import { IoMdClose } from 'react-icons/io'
import { FiMinus } from 'react-icons/fi'
import DraggableElement from './draggable-element'

interface QuizItem {
  question: string
  answer: string
  choice1: string
  choice2: string
  choice3: string
  choice4: string
}

interface QuizViewProps {
  quiz: QuizItem[]
}

const QuizView = ({ quiz }: QuizViewProps) => {
  const [questionProgress, setQuestionProgress] = useState(0)
  const [chosenOption, setChosenOption] = useState<number | null>(null)
  const [quizFinished, setQuizFinished] = useState(false)
  const [rightIndices, setRightIndices] = useState<number[]>([])
  const [choices, setChoices] = useState<number[]>([])
  const [hidden, setHidden] = useState(false)

  const currentQuestion = quiz[questionProgress]

  if (!currentQuestion) {
    return <div>No quiz data available</div>
  }

  const options = [
    currentQuestion.choice1,
    currentQuestion.choice2,
    currentQuestion.choice3,
    currentQuestion.choice4
  ]

  const correctIndex = options.findIndex((opt) => opt === currentQuestion.answer)

  const handleNextQuestionButton = () => {
    if (questionProgress < quiz.length - 1) {
      setQuestionProgress(questionProgress + 1)
    } else {
      setQuizFinished(true)
    }
    setChosenOption(null)
  }

  const handleChooseOption = (option: number) => {
    setChosenOption(option)
    setChoices([...choices, option])
    if (option === correctIndex) {
      setRightIndices([...rightIndices, option])
    }
  }

  return (
    <>
      {hidden && (
        <DraggableElement innerText="Quiz" onDoubleClick={() => setHidden(false)} />
      )}
      <div className={cn('w-[688px] mt-56', hidden ? 'hidden' : 'block')}>
        {!quizFinished ? (
          <>
            <div
              className={cn(
                'flex justify-end items-center rounded-md p-1',
                hidden ? 'bg-neutral-200' : 'bg - auto'
              )}
            >
              <Button variant="ghost" onClick={() => setHidden(true)}>
                {hidden ? <FiMinus /> : <IoMdClose />}
              </Button>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={questionProgress}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-neutral-400">
                  Question {questionProgress + 1} of {quiz.length}
                </p>
                <h1 className="text-2xl mb-6 font-medium">{currentQuestion.question}</h1>
                <div className="flex flex-col gap-2">
                  {options.map((item, index) => (
                    <div
                      key={item}
                      className={cn(
                        'border-2 border-neutral-300 p-2 px-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-neutral-100',
                        chosenOption === index
                          ? 'bg-gray-200 hover:bg-gray-200 border-gray-300'
                          : 'bg-auto'
                      )}
                      onClick={() => handleChooseOption(index)}
                    >
                      {item}
                      <div className="min-w-6 h-6 border border-neutral-400 rounded-full flex items-center justify-center ml-2">
                        {chosenOption === index && <FaCheck size={15} color="#262626" />}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

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
            rightIndeces={rightIndices}
            quizLength={quiz.length}
            quiz={quiz}
            choices={choices}
          />
        )}
      </div>
    </>
  )
}

export default QuizView
