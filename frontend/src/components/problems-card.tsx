import { IoMdClose } from 'react-icons/io'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { Input } from './ui/input'
import { Toggle } from './ui/toggle'
import { BsFillSendFill } from 'react-icons/bs'
import { useState } from 'react'

interface ProblemsCardProps {
  problem: any
  onClose: () => void
}

const ProblemsCard = ({ problem, onClose }: ProblemsCardProps) => {
  const [optionChosen, setOptionChosen] = useState<'answer' | 'solution' | null>(null)
  const [showContent, setShowContent] = useState(false)
  const [message, setMessage] = useState('')
  const [feedback, setFeedback] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const handleToggle = (choice: 'answer' | 'solution') => {
    setOptionChosen((prev) => (prev === choice ? null : choice))
  }

  const isOptionActive = optionChosen !== null

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
          <div className="overflow-y-scroll mb-2">
            <div className="rounded-lg p-3 px-5 bg-white max-w-3/4 border-1 shadow-sm">
              {problem.question}
            </div>

            {showContent && optionChosen === 'answer' && (
              <div className="mt-4 w-full">
                <div className="flex justify-end">
                  <motion.div
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    className="bg-neutral-100 rounded-lg p-3 px-5 max-w-3/4 border-1 shadow-sm self-end"
                  >
                    Answer
                  </motion.div>
                </div>

                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-lg p-3 px-5 max-w-3/4 border-1 shadow-sm self-end mt-4"
                >
                  The answer is: {problem.answer}
                </motion.div>
              </div>
            )}
            {showContent && optionChosen === 'solution' && (
              <div className="mt-4 w-full">
                <div className="flex justify-end">
                  <motion.div
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    className="bg-neutral-100 rounded-lg p-3 px-5 max-w-3/4 border-1 shadow-sm self-end"
                  >
                    Solution
                  </motion.div>
                </div>

                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-lg p-3 px-5 max-w-3/4 border-1 shadow-sm self-end mt-4"
                >
                  <ol className="list-decimal list-inside ml-5 space-y-1">
                    {problem.steps.map((step: string, index: number) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </motion.div>
              </div>
            )}

            {showContent && !optionChosen && (
              <div className="mt-4 w-full">
                <div className="flex justify-end">
                  <motion.div
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    className="bg-neutral-100 rounded-lg p-3 px-5 max-w-3/4 border-1 shadow-sm self-end"
                  >
                    {message}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-lg p-3 px-5 max-w-3/4 border-1 shadow-sm self-end mt-4"
                >
                  {loading ? (
                    <div>LOADING...</div>
                  ) : (
                    <div>
                      {feedback.feedback} <br />
                      <br /> Your score: {feedback.score}/100
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </div>

          <div className="w-full flex gap-2">
            <Toggle
              className="px-4 border-1"
              onClick={() => handleToggle('answer')}
              disabled={isOptionActive && optionChosen !== 'answer'}
              pressed={optionChosen === 'answer'}
            >
              Answer
            </Toggle>
            <Toggle
              className="px-4 border-1"
              onClick={() => handleToggle('solution')}
              disabled={isOptionActive && optionChosen !== 'solution'}
              pressed={optionChosen === 'solution'}
            >
              Solution
            </Toggle>
            <Input
              placeholder="Your answer goes here..."
              onChange={(e) => setMessage(e.target.value)}
              className="w-full"
              disabled={isOptionActive}
            />
            <Button
              className="cursor-pointer"
              disabled={showContent}
              onClick={() => {
                setShowContent(true)
                localStorage.setItem('solvedProblems', JSON.stringify(problem.question))

                if (!optionChosen) {
                  const sendMessage = async () => {
                    try {
                      const response = await fetch('http://127.0.0.1:5000/grade', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          question: problem.question,
                          answer: message
                        })
                      })

                      if (!response.ok) {
                        const errorText = await response.text()
                        console.error('Flashcards error:', errorText)
                        return
                      }

                      const data = await response.json()
                      console.log('my fucking data', data)
                      setFeedback(data)
                      setLoading(false)
                    } catch (err) {
                      console.error('Flashcards fetch error:', err)
                    }
                  }
                  sendMessage()
                }
              }}
            >
              <BsFillSendFill />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProblemsCard
