// eslint.config.js
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import globals from 'globals'
import nextPlugin from '@next/eslint-plugin-next'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

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
    'plugin:@typescript-eslint/recommended'
  ),
  // Flat-config form of next/core-web-vitals — avoids eslint-config-next's
  // @rushstack/eslint-patch shim, which breaks under sandboxed eslint runners
  // (e.g. trunk) that don't invoke eslint's real bin script.
  nextPlugin.flatConfig.coreWebVitals,
  ...compat.extends('prettier'), // must be last to disable conflicting rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Custom rules
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js
      'react/prop-types': 'off', // Redundant with TypeScript's own type checking
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
