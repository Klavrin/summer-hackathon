import { useState } from 'react'
import DraggableElement from './draggable-element'
import ProblemsCard from './problems-card'
import { AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { IoMdClose } from 'react-icons/io'
import { cn } from '../lib/utils'

const ProblemsView = ({ problems }: { problems: string[] }) => {
  const [problemChoice, setProblemChoice] = useState<string | null>(null)
  const [hidden, setHidden] = useState(false)

  return (
    <>
      {hidden && (
        <DraggableElement
          innerText="Practice Problems"
          onDoubleClick={() => setHidden(false)}
        />
      )}

      <div
        className={cn('flex flex-col gap-2 max-w-[688px]', hidden ? 'hidden' : 'block')}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Choose a problem:</h1>
          <Button variant="ghost" onClick={() => setHidden(true)}>
            <IoMdClose />
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          {problems.map((prob) => (
            <div
              key={prob}
              onClick={() => setProblemChoice(prob)}
              className="border-1 shadow-sm p-2 px-4 rounded-md cursor-pointer hover:bg-neutral-100"
            >
              {prob}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {problemChoice && (
          <ProblemsCard problem={problemChoice} onClose={() => setProblemChoice(null)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default ProblemsView
