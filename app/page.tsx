import { ImageGenerationForm } from '@/components/LogoGenerationForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[200%] h-[200%] animate-slow-spin">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-96 h-0.5 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent dark:via-blue-400/20"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg)`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 mb-4">
              AI Image Generator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Transform your ideas into stunning images with DALL-E 3
            </p>
          </div>

          {/* Glass effect container */}
          <div className="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <ImageGenerationForm />
          </div>
        </div>
      </div>
    </div>
  )
}