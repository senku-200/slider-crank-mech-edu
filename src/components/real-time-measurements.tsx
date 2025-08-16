'use client'

import { SimulationState } from '@/lib/kinematics'

interface RealTimeMeasurementsProps {
  simulationState: SimulationState
}

export function RealTimeMeasurements({ simulationState }: RealTimeMeasurementsProps) {
  const { crankAngle, sliderDisplacement, velocity } = simulationState
  
  const formatValue = (value: number) => {
    if (isNaN(value)) return "0.00"
    return value.toFixed(2)
  }
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-gray-300 dark:text-gray-400 text-sm">Crank angle θ</span>
        <span className="text-white dark:text-white font-semibold">
          {Math.round((crankAngle * 180) / Math.PI)}°
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-300 dark:text-gray-400 text-sm">Slider displacement</span>
        <span className="text-white dark:text-white font-semibold">
          {formatValue(sliderDisplacement)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-300 dark:text-gray-400 text-sm">Total velocity</span>
        <span className="text-white dark:text-white font-semibold">
          {formatValue(Math.abs(velocity))}
        </span>
      </div>
    </div>
  )
}
