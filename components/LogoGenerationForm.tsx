'use client'

import { useState } from 'react'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'
import { ApiKeyInput } from './ApiKeyInput'
import { DownloadButton } from './DownloadButton'
import { PromptSuggestion } from './PromptSuggestion'

const formSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  size: z.enum(['1024x1024', '1024x1792', '1792x1024']).default('1024x1024'),
  quality: z.enum(['standard', 'hd']).default('standard'),
})

type FormData = z.infer<typeof formSchema>

export function ImageGenerationForm() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState<string>('')
  const [error, setError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      size: '1024x1024',
      quality: 'standard',
    },
  })

  const handlePromptSelect = (prompt: string) => {
    setValue('prompt', prompt)
  }

  const onSubmit = async (data: FormData) => {
    if (!apiKey) {
      setError('Please provide your OpenAI API key first')
      return
    }
    setError('')
    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, apiKey }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const result = await response.json()
      setGeneratedImage(result.imageUrl)
    } catch (error) {
      console.error('Error generating image:', error)
      setError('Failed to generate image. Please check your API key and try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">API Key Setup</h3>
        <ApiKeyInput onApiKeyChange={setApiKey} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Image Description *
            </label>
            <textarea
              id="prompt"
              {...register('prompt')}
              className="w-full h-32 bg-white/50 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg p-3"
              placeholder="Describe the image you want to generate..."
            />
            <div className="mt-1 flex justify-between items-center">
              {errors.prompt && (
                <p className="text-red-500 dark:text-red-400 text-sm">{errors.prompt.message}</p>
              )}
              <PromptSuggestion onSelect={handlePromptSelect} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="size" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Image Size
              </label>
              <select
                id="size"
                {...register('size')}
                className="w-full bg-white/50 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg p-2"
              >
                <option value="1024x1024">Square (1024x1024)</option>
                <option value="1024x1792">Portrait (1024x1792)</option>
                <option value="1792x1024">Landscape (1792x1024)</option>
              </select>
            </div>

            <div>
              <label htmlFor="quality" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Quality
              </label>
              <select
                id="quality"
                {...register('quality')}
                className="w-full bg-white/50 dark:bg-gray-900/50 border-gray-200/50 dark:border-gray-700/50 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg p-2"
              >
                <option value="standard">Standard</option>
                <option value="hd">HD</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-red-500 dark:text-red-400 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </span>
          ) : (
            'Generate Image'
          )}
        </button>
      </form>

      {generatedImage && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">Generated Image</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Preview Container */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 dark:from-blue-400/20 dark:to-cyan-300/20 rounded-lg filter blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
                <img
                  src={generatedImage}
                  alt="Generated Image"
                  className="w-full h-auto max-h-[400px] object-contain"
                />
                <DownloadButton imageUrl={generatedImage} />
              </div>
            </div>

            {/* Download Options */}
            <div className="space-y-4">
              <div className="p-6 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50">
                <h4 className="text-md font-medium mb-3 text-gray-900 dark:text-gray-100">Download Options</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => window.open(generatedImage, '_blank')}
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-500 dark:to-cyan-400 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Open in New Tab
                  </button>
                  <button
                    onClick={() => {
                      const link = document.createElement('a')
                      link.href = generatedImage
                      link.download = `generated-image-${Date.now()}.png`
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                    }}
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-500 dark:to-pink-400 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Download Image
                  </button>
                </div>
                <p className="mt-3 text-xs text-gray-600 dark:text-gray-400">
                  Images are downloaded in high quality PNG format
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
