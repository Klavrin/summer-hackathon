import { useState, useEffect } from 'react'
import UrlInputBox from '../components/url-input-box'
import { motion, AnimatePresence } from 'framer-motion'

const Root = () => {
  const [thinking, setThinking] = useState(false)
  const [movedDown, setMovedDown] = useState(false)

  useEffect(() => {
    if (thinking) {
      const timer = setTimeout(() => {
        setThinking(false)
        setMovedDown(true)
      }, 3000) // 3 seconds thinking

      return () => clearTimeout(timer)
    }
  }, [thinking])

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center px-8">
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

        <UrlInputBox thinking={thinking} setThinking={setThinking} />
      </motion.div>
    </div>
  )
}

export default Root
