'use client'

interface PresetSelectorProps {
  onPresetChange: (preset: 'balanced' | 'high-speed' | 'high-rod' | 'compact') => void
  currentPreset: 'balanced' | 'high-speed' | 'high-rod' | 'compact'
}

export function PresetSelector({ 
  onPresetChange, 
  currentPreset 
}: PresetSelectorProps) {
  const presets = [
    { id: 'balanced', label: 'Balanced', description: 'Standard config' },
    { id: 'high-speed', label: 'High Speed', description: 'Fast operation' },
    { id: 'high-rod', label: 'High Rod', description: 'Long connecting rod' },
    { id: 'compact', label: 'Compact', description: 'Small crank, high speed' },
  ] as const
  
  return (
    <div className="flex gap-2">
      {presets.map((preset) => (
        <button
          key={preset.id}
          onClick={() => onPresetChange(preset.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentPreset === preset.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          title={preset.description}
        >
          {preset.label}
        </button>
      ))}
    </div>
  )
}
