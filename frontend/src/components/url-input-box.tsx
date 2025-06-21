import { MdQuiz } from 'react-icons/md'
import { BsCardHeading, BsFillPuzzleFill, BsFillSendFill } from 'react-icons/bs'
import { Input } from './ui/input'
import { Toggle } from './ui/toggle'
import { Button } from './ui/button'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSquare } from 'react-icons/fa6'

interface UrlInputBoxProps {
  thinking: boolean
  setThinking: (value: boolean) => void
}

const UrlInputBox = ({ thinking, setThinking }: UrlInputBoxProps) => {
  return (
    <div className="relative px-4 flex justify-center">
      <AnimatePresence>
        {thinking && (
          <motion.div
            className="absolute w-2/3 md:w-[97%] h-[143px] gradient-animate -z-10 rounded-[20px] -top-8 px-3 py-1.5 text-white text-sm transition-all"
            initial={{ filter: 'blur(20px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            exit={{ filter: 'blur(20px)', opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <div className="flex gap-2 items-center font-semibold">
              <AiOutlineLoading3Quarters className="animate-spin" />
              Thinking...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-[68%] md:w-full flex flex-col gap-2 border-1 p-2 rounded-2xl shadow-sm bg-white transition-all">
        <Input
          placeholder="Enter YouTube video URL..."
          className="h-10 bg-white shadow-none border-none outline-none"
        />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Toggle aria-label="Toggle quiz" className="border-1 cursor-pointer">
              <MdQuiz />
              <span className="hidden md:block">Quiz</span>
            </Toggle>
            <Toggle aria-label="Toggle flashcards" className="border-1 cursor-pointer">
              <BsCardHeading />
              <span className="hidden md:block">Flashcards</span>
            </Toggle>
            <Toggle aria-label="Toggle practice" className="border-1 cursor-pointer">
              <BsFillPuzzleFill />
              <span className="hidden md:block">Practice Problems</span>
            </Toggle>
          </div>
          <Button className="h-10 cursor-pointer" onClick={() => setThinking(true)}>
            {thinking ? <FaSquare /> : <BsFillSendFill />}

            <span className="hidden md:block">
              {thinking ? 'Cancel' : 'Analyze Video'}
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UrlInputBox
