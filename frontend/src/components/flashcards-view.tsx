import { useState } from 'react'
import { FlashcardArray } from 'react-quizlet-flashcard'
import { IoMdClose } from 'react-icons/io'
import { Button } from './ui/button'
import { cn } from '../lib/utils'
import DraggableElement from './draggable-element'

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
  const [hidden, setHidden] = useState(false)

  return (
    <>
      {hidden && (
        <DraggableElement innerText="Flashcards" onDoubleClick={() => setHidden(false)} />
      )}
      <div className={cn('flex flex-col items-end mt-56', hidden ? 'hidden' : 'block')}>
        <div className="flex justify-end">
          <Button variant="ghost" className="mb-1" onClick={() => setHidden(true)}>
            <IoMdClose />
          </Button>
        </div>
        <FlashcardArray cards={transformFlashcards(flashcards)} />
      </div>
    </>
  )
}

export default FlashcardsView
