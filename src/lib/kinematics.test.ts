import { 
  calculateSliderPosition, 
  calculateSliderVelocity, 
  calculateSliderAcceleration,
  calculateSimulationState,
  generateGraphData 
} from './kinematics'

// Simple test to verify kinematics calculations
export function testKinematics() {
  const crankRadius = 50
  const connectingRodLength = 150
  const crankSpeed = 150
  const crankAngle = 0 // 0 degrees
  
  console.log('Testing kinematics calculations...')
  
  // Test position calculation
  const position = calculateSliderPosition(crankAngle, crankRadius, connectingRodLength)
  console.log(`Position at 0°: ${position.toFixed(2)}`)
  
  // Test velocity calculation
  const velocity = calculateSliderVelocity(crankAngle, crankRadius, connectingRodLength, crankSpeed)
  console.log(`Velocity at 0°: ${velocity.toFixed(2)}`)
  
  // Test acceleration calculation
  const acceleration = calculateSliderAcceleration(crankAngle, crankRadius, connectingRodLength, crankSpeed)
  console.log(`Acceleration at 0°: ${acceleration.toFixed(2)}`)
  
  // Test complete simulation state
  const state = calculateSimulationState(crankAngle, { crankRadius, connectingRodLength, crankSpeed })
  console.log('Complete simulation state:', state)
  
  // Test graph data generation
  const graphData = generateGraphData({ crankRadius, connectingRodLength, crankSpeed })
  console.log(`Generated ${graphData.length} data points for graphs`)
  
  return {
    position,
    velocity,
    acceleration,
    state,
    graphDataLength: graphData.length
  }
}
