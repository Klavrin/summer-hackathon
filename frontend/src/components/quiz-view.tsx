import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { FaCheck } from 'react-icons/fa'
import { Button } from './ui/button'
import FinishedQuizView from './finished-quiz-view'

interface QuizViewProps {
  quiz: any
}

const QuizView = ({ quiz }: QuizViewProps) => {
  const [questionProgress, setQuestionProgress] = useState(0)
  const [chosenOption, setChosenOption] = useState<number | null>(null)
  const [quizFinished, setQuizFinished] = useState(false)
  const [rightIndeces, setRightIndeces] = useState<number[]>([])

  const [choices, setChoices] = useState<number[]>([])

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
    setChoices([...choices, option])
    if (option === correctIndex) {
      setRightIndeces([...rightIndeces, correctIndex])
    }
  }

  return (
    <div className="w-[688px]">
      {!quizFinished ? (
        <>
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
              <h1 className="text-2xl mb-6 font-medium">
                {quiz[questionProgress].question}
              </h1>
              <div className="flex flex-col gap-2">
                {quiz[questionProgress].options.map((item: any, index: any) => (
                  <div
                    key={item}
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
          rightIndeces={rightIndeces}
          quizLength={quiz.length}
          quiz={quiz}
          choices={choices}
        />
      )}
    </div>
  )
}

export default QuizView
