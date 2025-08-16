'use client'

import { MechanismParams, validateMechanism, getDifficultyRanges } from '@/lib/kinematics'
import { RotateCcw } from 'lucide-react'

interface ParameterControlsProps {
  params: MechanismParams
  onParamsChange: (params: MechanismParams) => void
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export function ParameterControls({ 
  params, 
  onParamsChange, 
  difficulty 
}: ParameterControlsProps) {
  // Use difficulty to define dynamic ranges (prevents unused prop warning)
  const ranges = getDifficultyRanges(difficulty)
  
  const handleChange = (key: keyof MechanismParams, value: number) => {
    const newParams = {
      ...params,
      [key]: value,
    }
    
    // Check if the new combination would be valid
    const newValidation = validateMechanism(newParams)
    
    // Only allow the change if it's valid or if we're adjusting the connecting rod length
    if (newValidation.isValid || key === 'connectingRodLength') {
      onParamsChange(newParams)
    }
  }

  const handleReset = () => {
    onParamsChange({
      crankRadius: 50,
      connectingRodLength: 150,
      crankSpeed: 150
    })
  }
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Input Parameters
        </h3>
        <button
          onClick={handleReset}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          title="Reset to default values"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
      
      {/* Crank Radius */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-gray-300 dark:text-gray-400">
            Crank radius (r)
          </label>
          <input
            type="number"
            value={params.crankRadius}
            onChange={(e) => handleChange('crankRadius', Number(e.target.value))}
            className="w-16 px-2 py-1 bg-gray-700 dark:bg-gray-700 border border-gray-600 dark:border-gray-600 rounded text-white text-sm"
          />
        </div>
        <input
          type="range"
          min={ranges.crankRadius.min}
          max={ranges.crankRadius.max}
          step={ranges.crankRadius.step}
          value={params.crankRadius}
          onChange={(e) => handleChange('crankRadius', Number(e.target.value))}
          className="w-full h-2 bg-gray-700 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(params.crankRadius - ranges.crankRadius.min) / (ranges.crankRadius.max - ranges.crankRadius.min) * 100}%, #4B5563 ${(params.crankRadius - ranges.crankRadius.min) / (ranges.crankRadius.max - ranges.crankRadius.min) * 100}%, #4B5563 100%)`
          }}
        />
      </div>
      
      {/* Connecting Rod Length */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-gray-300 dark:text-gray-400">
            Connecting rod length (l)
          </label>
          <input
            type="number"
            value={params.connectingRodLength}
            onChange={(e) => handleChange('connectingRodLength', Number(e.target.value))}
            className="w-16 px-2 py-1 bg-gray-700 dark:bg-gray-700 border border-gray-600 dark:border-gray-600 rounded text-white text-sm"
          />
        </div>
        <input
          type="range"
          min={ranges.connectingRodLength.min}
          max={ranges.connectingRodLength.max}
          step={ranges.connectingRodLength.step}
          value={params.connectingRodLength}
          onChange={(e) => handleChange('connectingRodLength', Number(e.target.value))}
          className="w-full h-2 bg-gray-700 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(params.connectingRodLength - ranges.connectingRodLength.min) / (ranges.connectingRodLength.max - ranges.connectingRodLength.min) * 100}%, #4B5563 ${(params.connectingRodLength - ranges.connectingRodLength.min) / (ranges.connectingRodLength.max - ranges.connectingRodLength.min) * 100}%, #4B5563 100%)`
          }}
        />
      </div>
      
      {/* Crank Speed */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-gray-300 dark:text-gray-400">
            Crank speed (rpm)
          </label>
          <input
            type="number"
            value={params.crankSpeed}
            onChange={(e) => handleChange('crankSpeed', Number(e.target.value))}
            className="w-16 px-2 py-1 bg-gray-700 dark:bg-gray-700 border border-gray-600 dark:border-gray-600 rounded text-white text-sm"
          />
        </div>
        <input
          type="range"
          min={ranges.crankSpeed.min}
          max={ranges.crankSpeed.max}
          step={ranges.crankSpeed.step}
          value={params.crankSpeed}
          onChange={(e) => handleChange('crankSpeed', Number(e.target.value))}
          className="w-full h-2 bg-gray-700 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(params.crankSpeed - ranges.crankSpeed.min) / (ranges.crankSpeed.max - ranges.crankSpeed.min) * 100}%, #4B5563 ${(params.crankSpeed - ranges.crankSpeed.min) / (ranges.crankSpeed.max - ranges.crankSpeed.min) * 100}%, #4B5563 100%)`
          }}
        />
      </div>
    </div>
  )
}
