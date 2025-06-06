// eslint.config.js
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    extends: [
      'eslint:recommended',
      'next/core-web-vitals',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
  },
})
const config = [
  ...compat.extends(
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier' // must be last to disable conflicting rules
  ),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
  },
  {
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
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
]

export default config
