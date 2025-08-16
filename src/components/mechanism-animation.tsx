'use client';

import { useEffect, useRef } from 'react';
import { MechanismParams, SimulationState } from '@/lib/kinematics';

interface MechanismAnimationProps {
  params: MechanismParams;
  simulationState: SimulationState;
  isPlaying: boolean;
}

export default function MechanismAnimation({
  params,
  simulationState,
  isPlaying,
}: MechanismAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);
  const localAngleRef = useRef<number>(simulationState.crankAngle);
  const lastFrameTimeRef = useRef<number>(0);

  // Keep latest simulation state in a ref so the animation loop can read it without causing re-renders
  const latestStateRef = useRef<SimulationState>(simulationState);
  useEffect(() => { latestStateRef.current = simulationState; }, [simulationState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    const drawMechanism = (time: number) => {
      if (isPlaying) {
        if (lastFrameTimeRef.current === 0) lastFrameTimeRef.current = time;
        const dt = (time - lastFrameTimeRef.current) / 1000; // seconds
        const omega = (params.crankSpeed * 2 * Math.PI) / 60; // rad/s
        // integrate angle locally for smoothness independent of React state updates
        localAngleRef.current = (localAngleRef.current + omega * dt) % (Math.PI * 2);
        lastFrameTimeRef.current = time;
      } else {
        // sync local angle with external state when paused
        localAngleRef.current = latestStateRef.current.crankAngle;
      }
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate center position
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

  // Use the crank angle from the latest simulation state (avoids re-running effect each frame)
  const angle = localAngleRef.current;

      // Crank position (circular motion)
      const crankX = centerX + params.crankRadius * Math.cos(angle);
      const crankY = centerY + params.crankRadius * Math.sin(angle);

      // Piston position (slider motion)
      const pistonX = centerX + params.crankRadius * Math.cos(angle) + 
                     Math.sqrt(params.connectingRodLength * params.connectingRodLength - 
                              params.crankRadius * params.crankRadius * Math.sin(angle) * Math.sin(angle));

      // Draw ground/base
      ctx.fillStyle = '#4B5563';
      ctx.fillRect(50, centerY + 80, canvas.width - 100, 40);

      // Draw crank circle (base)
      ctx.strokeStyle = '#6B7280';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, params.crankRadius, 0, 2 * Math.PI);
      ctx.stroke();

      // Draw crank arm (gray)
      ctx.strokeStyle = '#9CA3AF';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(crankX, crankY);
      ctx.stroke();

      // Draw crank pin (circle at end of crank)
      ctx.fillStyle = '#9CA3AF';
      ctx.beginPath();
      ctx.arc(crankX, crankY, 8, 0, 2 * Math.PI);
      ctx.fill();

      // Draw connecting rod (teal)
      ctx.strokeStyle = '#14B8A6';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(crankX, crankY);
      ctx.lineTo(pistonX, centerY + 100);
      ctx.stroke();

      // Draw piston/slider (teal)
      ctx.fillStyle = '#14B8A6';
      ctx.beginPath();
      ctx.rect(pistonX - 25, centerY + 100 - 30, 50, 60);
      ctx.fill();
      ctx.strokeStyle = '#0D9488';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw center point
      ctx.fillStyle = '#374151';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
      ctx.fill();



      // Draw angle indicator
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + 80, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw angle label
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 16px Poppins, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`θ`, centerX + 40, centerY - 10);

      // Continue animation
      if (isPlaying) {
        timeRef.current = time;
        animationRef.current = requestAnimationFrame(drawMechanism);
      }
    };

    if (isPlaying) {
      lastFrameTimeRef.current = 0;
      animationRef.current = requestAnimationFrame(drawMechanism);
    } else {
      drawMechanism(0);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [params.crankRadius, params.connectingRodLength, params.crankSpeed, isPlaying]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Mechanism Animation
      </h3>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className="border border-gray-300 dark:border-gray-600 rounded-lg bg-[#282c34]"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
}
