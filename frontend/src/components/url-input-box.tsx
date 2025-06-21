import { MdQuiz } from 'react-icons/md'
import { BsCardHeading, BsFillPuzzleFill, BsFillSendFill } from 'react-icons/bs'
import { Input } from './ui/input'
import { Toggle } from './ui/toggle'
import { Button } from './ui/button'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface UrlInputBoxProps {
  thinking: boolean
  setThinking: (value: boolean) => void
}

const UrlInputBox = ({ thinking, setThinking }: UrlInputBoxProps) => {
  return (
    <div className="relative px-4 flex justify-center">
      <div className="absolute w-[97%] h-[135px] bg-red-500 -z-10 rounded-[20px] -top-6 px-3 py-0.5 text-white text-sm">
        <div className="flex gap-2 items-center">
          <AiOutlineLoading3Quarters className="animate-spin" />
          Thinking...
        </div>
      </div>

      <div className="w-full flex flex-col gap-2 border-1 p-2 rounded-2xl shadow-sm bg-white">
        <Input
          placeholder="Enter YouTube video URL..."
          className="h-10 bg-white shadow-none border-none outline-none"
        />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Toggle aria-label="Toggle quiz" className="border-1">
              <MdQuiz />
              Quiz
            </Toggle>
            <Toggle aria-label="Toggle flashcards" className="border-1">
              <BsCardHeading />
              Flashcards
            </Toggle>
            <Toggle aria-label="Toggle practice" className="border-1">
              <BsFillPuzzleFill />
              Practice Problems
            </Toggle>
          </div>
          <Button className="h-10" onClick={() => setThinking(true)}>
            <BsFillSendFill />
            Analyze Video
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UrlInputBox
