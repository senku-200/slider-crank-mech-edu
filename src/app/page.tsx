'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import MechanismAnimation from '@/components/mechanism-animation'
import { ParameterControls } from '@/components/parameter-controls'
import { RealTimeMeasurements } from '@/components/real-time-measurements'
import { MechanismGraphs } from '@/components/mechanism-graphs'
import EducationalBlog from '@/components/educational-blog'
import { PresetSelector } from '@/components/difficulty-selector'
import { AnimationControls } from '@/components/animation-controls'
import { 
  MechanismParams, 
  SimulationState, 
  GraphData,
  calculateSimulationState,
  generateGraphData
} from '@/lib/kinematics'

export default function Home() {
  const [currentPreset, setCurrentPreset] = useState<'balanced' | 'high-speed' | 'high-rod' | 'compact'>('balanced')
  const [isPlaying, setIsPlaying] = useState(false)
  const [crankAngle, setCrankAngle] = useState(0)
  
  const defaultParams: MechanismParams = { 
    crankRadius: 50, 
    connectingRodLength: 150, 
    crankSpeed: 150 
  }
  
  const [params, setParams] = useState<MechanismParams>(defaultParams)
  
  const [simulationState, setSimulationState] = useState<SimulationState>(
    calculateSimulationState(0, defaultParams)
  )
  const [graphData, setGraphData] = useState<GraphData[]>(
    generateGraphData(defaultParams)
  )
  
  const animationRef = useRef<number | undefined>(undefined)
  const lastTimeRef = useRef<number>(0)
  const angleRef = useRef<number>(0)
  const lastCommitRef = useRef<number>(0)
  const COMMIT_INTERVAL_MS = 80 // commit angle/state to React ~12.5 fps (smooth canvas handles in-between)
  
  // Preset configurations
  const presetConfigs = {
    'balanced': { crankRadius: 50, connectingRodLength: 150, crankSpeed: 150 },
    'high-speed': { crankRadius: 60, connectingRodLength: 180, crankSpeed: 300 },
    'high-rod': { crankRadius: 40, connectingRodLength: 250, crankSpeed: 100 },
    'compact': { crankRadius: 30, connectingRodLength: 120, crankSpeed: 400 }
  }
  
  const handlePresetChange = (preset: 'balanced' | 'high-speed' | 'high-rod' | 'compact') => {
    setCurrentPreset(preset)
    const newParams = presetConfigs[preset]
    setParams(newParams)
  }
  
  // Update core simulation state each frame (angle driven). Heavy derived arrays generated only on param change.
  useEffect(() => {
    setSimulationState(calculateSimulationState(crankAngle, params))
  }, [crankAngle, params])

  // Regenerate graph data only when params change (or when play starts for freshness)
  useEffect(() => {
    setGraphData(generateGraphData(params))
  }, [params])
  
  const animate = useCallback((currentTime: number) => {
    if (!isPlaying) return
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = currentTime
      lastCommitRef.current = currentTime
    }
    const deltaTime = currentTime - lastTimeRef.current
    const omega = (params.crankSpeed * 2 * Math.PI) / 60
    const deltaAngle = omega * (deltaTime / 1000)
    angleRef.current = (angleRef.current + deltaAngle) % (Math.PI * 2)
    // Commit to React state only if enough time passed
    if (currentTime - lastCommitRef.current >= COMMIT_INTERVAL_MS) {
      setCrankAngle(angleRef.current)
      lastCommitRef.current = currentTime
    }
    lastTimeRef.current = currentTime
    animationRef.current = requestAnimationFrame(animate)
  }, [isPlaying, params.crankSpeed])
  
  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0
      angleRef.current = crankAngle
      animationRef.current = requestAnimationFrame(animate)
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
    // crankAngle intentionally omitted: we only restart loop when play state toggles
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, animate])
  
  const handlePlayPause = () => {
    const newIsPlaying = !isPlaying
    setIsPlaying(newIsPlaying)
    
  if (newIsPlaying) setGraphData(generateGraphData(params))
  }
  
  return (
    <div className="min-h-screen bg-[#282c34] text-white">
      <header className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white font-poppins">
              Slider-Crank Mechanism
            </h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <MechanismAnimation
              params={params}
              simulationState={simulationState}
              isPlaying={isPlaying}
            />
            
            <div className="flex justify-center">
              <PresetSelector
                currentPreset={currentPreset}
                onPresetChange={handlePresetChange}
              />
            </div>
            
            <div className="flex justify-center">
              <AnimationControls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
              />
            </div>
            
            <div className="bg-[#1e2127] rounded-xl p-6 border border-gray-700">
              <RealTimeMeasurements simulationState={simulationState} />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-[#1e2127] rounded-xl p-6 border border-gray-700">
              <ParameterControls
                params={params}
                onParamsChange={setParams}
                difficulty="intermediate"
              />
            </div>
            
            <div className="bg-[#1e2127] rounded-xl p-6 border border-gray-700">
              <MechanismGraphs
                graphData={graphData}
                isPlaying={isPlaying}
                currentAngle={crankAngle}
              />
            </div>
          </div>

            {/* Educational Blog Section - full width, centered below graphs */}
            <div className="col-span-2 flex justify-center mt-8 w-full">
            <EducationalBlog />
            </div>
      </div>
      </main>
    </div>
  )
}
