import { useState } from 'react'
import UrlInputBox from '../components/url-input-box'
import { motion, AnimatePresence } from 'framer-motion'

const Root = () => {
  const [thinking, setThinking] = useState(false)

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center px-8">
      <motion.div
        className="w-[720px] fixed"
        animate={{
          bottom: thinking ? 40 : window.innerHeight * 0.43
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
      >
        <AnimatePresence>
          {!thinking && (
            <motion.div
              className="text-center mb-8"
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
