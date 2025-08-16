'use client'

import { useEffect, useRef } from 'react'
import { GraphData } from '@/lib/kinematics'

interface MechanismGraphsProps {
  graphData: GraphData[]
  isPlaying?: boolean
  currentAngle?: number
}

export function MechanismGraphs({ graphData, isPlaying = false, currentAngle = 0 }: MechanismGraphsProps) {
  const velocityCanvasRef = useRef<HTMLCanvasElement>(null)
  const accelerationCanvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const velocityCanvas = velocityCanvasRef.current
    const accelerationCanvas = accelerationCanvasRef.current
    if (!velocityCanvas || !accelerationCanvas || graphData.length === 0) return

    const velocityCtx = velocityCanvas.getContext('2d')
    const accelerationCtx = accelerationCanvas.getContext('2d')
    if (!velocityCtx || !accelerationCtx) return

    // Set canvas sizes
    velocityCanvas.width = 400
    velocityCanvas.height = 250
    accelerationCanvas.width = 400
    accelerationCanvas.height = 250

    const drawGraph = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      data: GraphData[],
      title: string,
      yDataKey: 'position' | 'velocity' | 'acceleration',
      color: string
    ) => {
      const padding = 30
      const graphWidth = canvas.width - 2 * padding
      const graphHeight = canvas.height - 2 * padding

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background
      ctx.fillStyle = '#282c34'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw border
      ctx.strokeStyle = '#4B5563'
      ctx.lineWidth = 1
      ctx.strokeRect(0, 0, canvas.width, canvas.height)

      // Draw title
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 12px Poppins, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(title, canvas.width / 2, 15)

      // Draw axes
      ctx.strokeStyle = '#6B7280'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(padding, padding)
      ctx.lineTo(padding, canvas.height - padding)
      ctx.lineTo(canvas.width - padding, canvas.height - padding)
      ctx.stroke()

      // Draw grid lines
      ctx.strokeStyle = '#374151'
      ctx.lineWidth = 0.5
      for (let i = 0; i <= 4; i++) {
        const y = padding + (i / 4) * graphHeight
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(canvas.width - padding, y)
        ctx.stroke()
      }

      // Find min/max for scaling
      const values = data.map(d => d[yDataKey])
      const min = Math.min(...values)
      const max = Math.max(...values)

      // Draw curve
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()

      data.forEach((point, index) => {
        const x = padding + (point.angle / 360) * graphWidth
        const normalizedY = ((point[yDataKey] - min) / (max - min)) * graphHeight
        const y = canvas.height - padding - normalizedY

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Draw current position indicator if animation is playing
      if (isPlaying) {
        const currentAngleDegrees = (currentAngle * 180) / Math.PI
        const currentIndex = Math.floor((currentAngleDegrees / 360) * data.length)
        
        if (currentIndex >= 0 && currentIndex < data.length) {
          const currentPoint = data[currentIndex]
          const x = padding + (currentPoint.angle / 360) * graphWidth
          const normalizedY = ((currentPoint[yDataKey] - min) / (max - min)) * graphHeight
          const y = canvas.height - padding - normalizedY

          // Draw current position dot
          ctx.fillStyle = color
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, 2 * Math.PI)
          ctx.fill()

          // Draw vertical line to current position
          ctx.strokeStyle = color
          ctx.lineWidth = 1
          ctx.setLineDash([3, 3])
          ctx.beginPath()
          ctx.moveTo(x, padding)
          ctx.lineTo(x, canvas.height - padding)
          ctx.stroke()
          ctx.setLineDash([])
        }
      }

      // Draw axis labels
      ctx.fillStyle = '#9CA3AF'
      ctx.font = '10px Inter, sans-serif'
      ctx.textAlign = 'right'

      // Y-axis labels
      for (let i = 0; i <= 4; i++) {
        const value = min + (i / 4) * (max - min)
        const y = padding + (i / 4) * graphHeight
        ctx.fillText(value.toFixed(0), padding - 5, y + 3)
      }

      // X-axis labels
      ctx.textAlign = 'center'
      ctx.fillText('0°', padding, canvas.height - 5)
      ctx.fillText('90°', padding + graphWidth / 4, canvas.height - 5)
      ctx.fillText('180°', padding + graphWidth / 2, canvas.height - 5)
      ctx.fillText('270°', padding + 3 * graphWidth / 4, canvas.height - 5)
      ctx.fillText('360°', canvas.width - padding, canvas.height - 5)
    }

    const animate = () => {
      // Draw velocity graph (position & velocity)
      drawGraph(velocityCtx, velocityCanvas, graphData, 'Position & Velocity', 'position', '#3B82F6')

      // Draw acceleration graph
      drawGraph(accelerationCtx, accelerationCanvas, graphData, 'Acceleration', 'acceleration', '#3B82F6')

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    // Start animation if playing
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate)
    } else {
      // Draw static graphs
      drawGraph(velocityCtx, velocityCanvas, graphData, 'Position & Velocity', 'position', '#3B82F6')
      drawGraph(accelerationCtx, accelerationCanvas, graphData, 'Acceleration', 'acceleration', '#3B82F6')
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [graphData, isPlaying, currentAngle])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Motion Graphs
      </h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-300 dark:text-gray-400 mb-2">
            Position & Velocity
          </h4>
          <canvas
            ref={velocityCanvasRef}
            className="w-full border border-gray-700 dark:border-gray-600 rounded"
            style={{ height: '250px' }}
          />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-300 dark:text-gray-400 mb-2">
            Acceleration
          </h4>
          <canvas
            ref={accelerationCanvasRef}
            className="w-full border border-gray-700 dark:border-gray-600 rounded"
            style={{ height: '250px' }}
          />
        </div>
      </div>
    </div>
  )
}
