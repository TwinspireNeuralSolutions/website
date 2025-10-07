// eslint.config.js
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import globals from 'globals'
import * as parser from '@typescript-eslint/parser'
import * as plugin from '@typescript-eslint/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import nextPlugin from '@next/eslint-plugin-next'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

const config = [
  {
    ignores: ['node_modules/**', '.next/**', 'dist/**'],
  },
  // Add recommended configs
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'prettier' // must be last to disable conflicting rules
  ),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Custom rules
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
      'react/jsx-max-props-per-line': [1, { when: 'multiline' }],
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-wrap-multilines': [
        'error',
        { declaration: 'parens-new-line' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-unescaped-entities': 'warn',
      'no-constant-condition': 'warn',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-noninteractive-element-interactions': 'warn',
      'react-hooks/rules-of-hooks': 'warn',
    },
  },
]

export default config
