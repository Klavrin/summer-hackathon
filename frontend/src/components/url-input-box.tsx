import { useState } from 'react'
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
  setMovedDown: (value: boolean) => void
  setQuiz: (quiz: any) => void
  setFlashcards: (flashcards: any) => void
  setPractice: (practice: any) => void
  optionsChosen: string[]
  setOptionsChosen: (options: any) => void
}

const UrlInputBox = ({
  thinking,
  setThinking,
  setMovedDown,
  setQuiz,
  setFlashcards,
  setPractice,
  optionsChosen,
  setOptionsChosen
}: UrlInputBoxProps) => {
  const [message, setMessage] = useState('')

  const toggleOption = (option: string) => {
    if (optionsChosen.includes(option)) {
      setOptionsChosen(optionsChosen.filter((opt) => opt !== option))
    } else {
      setOptionsChosen([...optionsChosen, option])
    }
  }

  const handleAnalyseVideo = () => {
    if (!message.trim()) {
      alert('Please enter a valid YouTube video URL before analyzing.')
      return
    }

    setThinking(true)

    // Prepare promises array
    const promises: Promise<void>[] = []

    if (optionsChosen.includes('flashcards')) {
      promises.push(
        (async () => {
          try {
            const response = await fetch('http://127.0.0.1:5000/flashcards', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ link: message })
            })

            if (!response.ok) {
              const errorText = await response.text()
              console.error('Flashcards error:', errorText)
              return
            }

            const data = await response.json()
            setFlashcards(data.flashcards)
          } catch (err) {
            console.error('Flashcards fetch error:', err)
          }
        })()
      )
    }

    if (optionsChosen.includes('quiz')) {
      promises.push(
        (async () => {
          try {
            const response = await fetch('http://127.0.0.1:5000/quiz', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ link: message })
            })

            if (!response.ok) {
              const errorText = await response.text()
              console.error('Quiz error:', errorText)
              return
            }

            const data = await response.json()
            setQuiz(data)
          } catch (err) {
            console.error('Quiz fetch error:', err)
          }
        })()
      )
    }

    if (optionsChosen.includes('practice')) {
      promises.push(
        (async () => {
          try {
            const response = await fetch('http://127.0.0.1:5000/practice', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ link: message })
            })

            if (!response.ok) {
              const errorText = await response.text()
              console.error('Practice error:', errorText)
              return
            }

            const data = await response.json()
            setPractice(data)
          } catch (err) {
            console.error('Practice fetch error:', err)
          }
        })()
      )
    }

    Promise.all(promises).finally(() => {
      setThinking(false)
      setMovedDown(true)
    })
  }

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
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Toggle
              aria-label="Toggle quiz"
              className={`border-1 cursor-pointer ${
                optionsChosen.includes('quiz') ? 'bg-blue-500 text-white' : ''
              }`}
              onClick={() => toggleOption('quiz')}
            >
              <MdQuiz />
              <span className="hidden md:block">Quiz</span>
            </Toggle>
            <Toggle
              aria-label="Toggle flashcards"
              className={`border-1 cursor-pointer ${
                optionsChosen.includes('flashcards') ? 'bg-blue-500 text-white' : ''
              }`}
              onClick={() => toggleOption('flashcards')}
            >
              <BsCardHeading />
              <span className="hidden md:block">Flashcards</span>
            </Toggle>
            <Toggle
              aria-label="Toggle practice"
              className={`border-1 cursor-pointer ${
                optionsChosen.includes('practice') ? 'bg-blue-500 text-white' : ''
              }`}
              onClick={() => toggleOption('practice')}
            >
              <BsFillPuzzleFill />
              <span className="hidden md:block">Practice Problems</span>
            </Toggle>
          </div>
          <Button className="h-10 cursor-pointer" onClick={handleAnalyseVideo}>
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
