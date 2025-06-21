import { FaCheck } from 'react-icons/fa6'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

interface FinishedQuizViewProps {
  rightIndeces: number[]
  quizLength: number
  quiz: { question: string; options: string[]; correctIndex: number }[]
  choices: number[]
}

const FinishedQuizView = ({
  rightIndeces,
  quizLength,
  quiz,
  choices
}: FinishedQuizViewProps) => {
  console.log(rightIndeces)

  return (
    <div className="mt-44">
      <h2 className="text-center text-2xl mb-8">
        You got {rightIndeces.length}/{quizLength} questions right.
      </h2>

      <div className="flex flex-col gap-12 pb-48">
        {quiz.map((val: any, index: number) => (
          <div key={val.question}>
            <p className="text-neutral-400">
              Question {index + 1} of {quiz.length}
            </p>
            <h1 className="text-2xl mb-6 font-medium">{quiz[index].question}</h1>
            <div className="flex flex-col gap-2">
              {val.options.map((item: string, i: number) => {
                const isCorrect = i === quiz[index].correctIndex
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
        ))}
      </div>

      {/* <div className="flex gap-2">
        <Button>Try Again</Button>
        <Button>Create Another Quiz</Button>
      </div> */}
    </div>
  )
}

export default FinishedQuizView
