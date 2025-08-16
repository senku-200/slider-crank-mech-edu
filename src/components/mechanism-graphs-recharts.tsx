"use client";

import 'katex/dist/katex.min.css';
import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';
import { GraphData } from '@/lib/kinematics';

interface MechanismGraphsRechartsProps {
  graphData: GraphData[];
  currentAngle?: number; // radians
  isPlaying?: boolean;
}

export function MechanismGraphsRecharts({ graphData, currentAngle = 0, isPlaying = false }: MechanismGraphsRechartsProps) {
  const angleDeg = (currentAngle * 180) / Math.PI;

  const processed = useMemo(() => graphData.map(d => ({
    angle: d.angle,
    position: Number(d.position.toFixed(2)),
    velocity: Number(d.velocity.toFixed(2)),
    acceleration: Number(d.acceleration.toFixed(2))
  })), [graphData]);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-100">Motion Graphs</h3>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-[#1e2127] rounded-xl p-4 border border-gray-700">
          <h4 className="text-sm font-medium mb-2 text-gray-300">Displacement & Velocity</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processed} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <XAxis dataKey="angle" tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={v => `${v}°`} domain={[0, 360]} />
                <YAxis yAxisId="left" tick={{ fill: '#94a3b8', fontSize: 10 }} stroke="#3b82f6" />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: '#94a3b8', fontSize: 10 }} stroke="#f59e0b" />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151' }} labelFormatter={l => `θ = ${l}°`} />
                <Legend />
                {isPlaying && (
                  <ReferenceLine x={Number(angleDeg.toFixed(1))} stroke="#f87171" strokeDasharray="4 4" label={{ value: `θ=${angleDeg.toFixed(0)}°`, fill: '#f87171', fontSize: 10 }} />
                )}
                <Line type="monotone" dataKey="position" name="x" stroke="#3b82f6" strokeWidth={2} dot={false} yAxisId="left" />
                <Line type="monotone" dataKey="velocity" name="v" stroke="#f59e0b" strokeWidth={2} dot={false} yAxisId="right" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-[#1e2127] rounded-xl p-4 border border-gray-700">
          <h4 className="text-sm font-medium mb-2 text-gray-300">Acceleration</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processed} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                <XAxis dataKey="angle" tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={v => `${v}°`} domain={[0, 360]} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} stroke="#10b981" />
                <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151' }} labelFormatter={l => `θ = ${l}°`} />
                {isPlaying && (
                  <ReferenceLine x={Number(angleDeg.toFixed(1))} stroke="#f87171" strokeDasharray="4 4" label={{ value: `θ=${angleDeg.toFixed(0)}°`, fill: '#f87171', fontSize: 10 }} />
                )}
                <Line type="monotone" dataKey="acceleration" name="a" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MechanismGraphsRecharts;
