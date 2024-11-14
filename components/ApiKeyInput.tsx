'use client'

import { useState, useEffect } from 'react'
import { Input } from './ui/input'

export function ApiKeyInput({ onApiKeyChange }: { onApiKeyChange: (key: string) => void }) {
  const [apiKey, setApiKey] = useState('')
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Load API key from localStorage on component mount
    const savedKey = localStorage.getItem('openai_api_key')
    if (savedKey) {
      setApiKey(savedKey)
      onApiKeyChange(savedKey)
      setIsSaved(true)
    }
  }, [onApiKeyChange])

  const handleSave = () => {
    if (apiKey) {
      localStorage.setItem('openai_api_key', apiKey)
      onApiKeyChange(apiKey)
      setIsSaved(true)
    }
  }

  const handleClear = () => {
    localStorage.removeItem('openai_api_key')
    setApiKey('')
    onApiKeyChange('')
    setIsSaved(false)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your OpenAI API key"
          className="flex-1 bg-white/50 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50"
        />
        {!isSaved ? (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Save Key
          </button>
        ) : (
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-500 dark:from-red-500 dark:to-pink-400 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Clear Key
          </button>
        )}
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400">
        Your API key will be stored securely in your browser&apos;s local storage. 
        {isSaved && ' Your key is currently saved.'}
      </p>
    </div>
  )
}
