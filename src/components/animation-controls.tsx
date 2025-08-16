'use client'

interface AnimationControlsProps {
  isPlaying: boolean
  onPlayPause: () => void
}

export function AnimationControls({
  isPlaying,
  onPlayPause,
}: AnimationControlsProps) {
  return (
    <div className="w-full">
      <button
        onClick={onPlayPause}
        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 ${
          isPlaying
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isPlaying ? '⏹ Stop' : '▶ Start'}
      </button>
    </div>
  )
}
