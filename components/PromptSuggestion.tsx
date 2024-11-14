'use client'

import { Sparkles } from 'lucide-react'

const samplePrompts = [
  "A serene Japanese garden at sunset with cherry blossoms falling",
  "A futuristic cityscape with flying cars and neon lights",
  "An underwater scene with bioluminescent creatures",
  "A cozy cabin in a snowy forest with northern lights",
  "A steampunk-inspired mechanical butterfly in flight",
]

interface PromptSuggestionProps {
  onSelect: (prompt: string) => void
}

export function PromptSuggestion({ onSelect }: PromptSuggestionProps) {
  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * samplePrompts.length)
    return samplePrompts[randomIndex]
  }

  return (
    <button
      onClick={() => onSelect(getRandomPrompt())}
      className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
    >
      <Sparkles className="w-4 h-4 mr-1" />
      Try a sample prompt
    </button>
  )
}
