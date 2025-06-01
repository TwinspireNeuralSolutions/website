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
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition ${textColor ?? 'text-black'}`}
      >
        <Globe className="w-5 h-5" />
        <span>{selected}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg z-10 overflow-hidden"
          >
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelected(lang)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
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
