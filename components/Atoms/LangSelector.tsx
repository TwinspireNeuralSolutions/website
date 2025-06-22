'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Globe } from 'lucide-react'

const languages = ['English', 'Danish']

export const LanguageSelect = ({ textColor }: { textColor?: string }) => {
  const [selected, setSelected] = useState('English')
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`flex items-center gap-2 rounded-full px-3 py-1.5 transition ${textColor ?? 'text-black'}`}
      >
        <Globe className="h-5 w-5" />
        <span>{selected}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 z-10 mt-2 w-full overflow-hidden rounded-md bg-white shadow-lg"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelected(lang)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                  selected === lang ? 'bg-gray-100 font-semibold' : ''
                }`}
              >
                {lang}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
