import { Button } from './ui/button'

interface FinishedQuizViewProps {
  answeredQuestionsRight: number
  quizLength: number
}

const FinishedQuizView = ({
  answeredQuestionsRight,
  quizLength
}: FinishedQuizViewProps) => {
  return (
    <div>
      <h2 className="text-center text-2xl">
        You got {answeredQuestionsRight}/{quizLength} questions right.
      </h2>

      <div className="flex gap-2">
        <Button>Try Again</Button>
        <Button>Create Another Quiz</Button>
      </div>
    </div>
  )
}

export default FinishedQuizView
