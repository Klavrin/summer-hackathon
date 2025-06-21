import { FlashcardArray } from 'react-quizlet-flashcard'

function transformFlashcards(data: any) {
  if (!Array.isArray(data)) {
    console.warn('Invalid flashcards data:', data)
    console.log(data.flashcards)
    return []
  }
  return data.map((card: any, index: number) => ({
    id: index + 1,
    frontHTML: (
      <div className="flex justify-center items-center w-full h-full p-4 text-xl">
        {card.front}
      </div>
    ),
    backHTML: (
      <div className="flex justify-center items-center w-full h-full p-4">
        {card.backshot}
      </div>
    )
  }))
}

interface FlashcardsViewProps {
  flashcards: any
}

const FlashcardsView = ({ flashcards }: FlashcardsViewProps) => {
  return (
    <div>
      <FlashcardArray cards={transformFlashcards(flashcards)} />
    </div>
  )
}

export default FlashcardsView
