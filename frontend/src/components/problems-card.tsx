import { IoMdClose } from 'react-icons/io'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { Input } from './ui/input'
import { Toggle } from './ui/toggle'
import { BsFillSendFill } from 'react-icons/bs'
import { useState } from 'react'

interface ProblemsCardProps {
  problem: string
  onClose: () => void
}

const ProblemsCard = ({ problem, onClose }: ProblemsCardProps) => {
  const [optionChoicen, setOptionChoicen] = useState<'answer' | 'solution' | null>(null)

  const handleToggle = (choice: 'answer' | 'solution') => {
    setOptionChoicen((prev) => (prev === choice ? null : choice))
  }

  const isOptionActive = optionChoicen !== null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed w-screen h-screen bg-black/30 backdrop-blur-md top-0 flex justify-center items-center z-50 flex-col"
    >
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 50 }}
        className="p-4 rounded-lg w-[800px] h-[500px] relative border-1 shadow-lg bg-white"
      >
        <div className="w-full flex justify-end mb-1">
          <Button variant="ghost" onClick={onClose}>
            <IoMdClose />
          </Button>
        </div>

        <div className="flex flex-col justify-between h-[90%]">
          <div>
            <div className="rounded-lg p-3 px-5 bg-white max-w-3/4 border-1 shadow-sm">
              {problem}
            </div>
          </div>
          <div className="w-full flex gap-2">
            <Toggle
              className="px-4 border-1"
              onClick={() => handleToggle('answer')}
              disabled={isOptionActive && optionChoicen !== 'answer'}
              pressed={optionChoicen === 'answer'}
            >
              Answer
            </Toggle>
            <Toggle
              className="px-4 border-1"
              onClick={() => handleToggle('solution')}
              disabled={isOptionActive && optionChoicen !== 'solution'}
              pressed={optionChoicen === 'solution'}
            >
              Solution
            </Toggle>
            <Input
              placeholder="Your answer goes here..."
              className="w-full"
              disabled={isOptionActive}
            />
            <Button className="cursor-pointer">
              <BsFillSendFill />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProblemsCard
