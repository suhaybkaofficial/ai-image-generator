'use client'

import { Download } from 'lucide-react'
import { useState } from 'react'

interface DownloadButtonProps {
  imageUrl: string
}

export function DownloadButton({ imageUrl }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `generated-image-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading image:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
      title="Download Image"
    >
      <Download className="w-5 h-5" />
    </button>
  )
}
