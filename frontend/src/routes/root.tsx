import { useState, useEffect } from 'react'
import UrlInputBox from '../components/url-input-box'
import { motion, AnimatePresence } from 'framer-motion'
import FlashcardsView from '../components/flashcards-view'
import QuizView from '../components/quiz-view'

const Root = () => {
  const [thinking, setThinking] = useState(false)
  const [movedDown, setMovedDown] = useState(false)
  const [optionsChosen, setOptionsChosen] = useState([])

  const [quiz, setQuiz] = useState([])
  const [flashcards, setFlashcards] = useState([])
  const [practice, setPractice] = useState([])

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center px-8">
      <AnimatePresence>
        {movedDown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full flex justify-center"
          >
            <FlashcardsView flashcards={flashcards} />
            {/* <QuizView /> */}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="w-[720px] fixed"
        animate={{
          bottom: movedDown ? 40 : window.innerHeight * 0.43
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
      >
        <AnimatePresence>
          {!movedDown && (
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-6xl font-medium">Sophira</h1>
              <p className="opacity-70">Watch. Learn. Remember</p>
              <span className="loading bg-black"></span>
            </motion.div>
          )}
        </AnimatePresence>

        <UrlInputBox
          thinking={thinking}
          setThinking={setThinking}
          setMovedDown={setMovedDown}
          setQuiz={setQuiz}
          setFlashcards={setFlashcards}
          setPractice={setPractice}
          optionsChosen={optionsChosen}
          setOptionsChosen={setOptionsChosen}
        />
      </motion.div>
    </div>
  )
}

export default Root
