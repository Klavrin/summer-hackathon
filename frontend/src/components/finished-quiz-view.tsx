import { FaCheck } from 'react-icons/fa6'
import { cn } from '../lib/utils'

interface FinishedQuizViewProps {
  rightIndeces: number[]
  quizLength: number
  quiz: {
    question: string
    answer: string
    choice1: string
    choice2: string
    choice3: string
    choice4: string
  }[]
  choices: number[]
}

const FinishedQuizView = ({
  rightIndeces,
  quizLength,
  quiz,
  choices
}: FinishedQuizViewProps) => {
  return (
    <div className="mt-44">
      <h2 className="text-center text-2xl mb-8">
        You got {rightIndeces.length}/{quizLength} questions right.
      </h2>

      <div className="flex flex-col gap-12 pb-48">
        {quiz.map((val, index) => {
          // Convert choices to array
          const options = [val.choice1, val.choice2, val.choice3, val.choice4]

          // Find correct index
          const correctIndex = options.findIndex((opt) => opt === val.answer)

          return (
            <div key={val.question}>
              <p className="text-neutral-400">
                Question {index + 1} of {quizLength}
              </p>
              <h1 className="text-2xl mb-6 font-medium">{val.question}</h1>
              <div className="flex flex-col gap-2">
                {options.map((item, i) => {
                  const isCorrect = i === correctIndex
                  const isChosen = i === choices[index]
                  return (
                    <div
                      key={item}
                      className={cn(
                        'border-2 p-2 px-4 rounded-lg flex justify-between',
                        isCorrect ? 'bg-green-300' : isChosen ? 'bg-red-300' : 'bg-auto'
                      )}
                    >
                      {item}
                      <div className="w-6 h-6 border border-neutral-400 rounded-full flex items-center justify-center">
                        {isCorrect && <FaCheck size={15} color="#262626" />}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FinishedQuizView
