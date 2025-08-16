export interface MechanismParams {
  crankRadius: number;
  connectingRodLength: number;
  crankSpeed: number; // rpm
}

export interface SimulationState {
  crankAngle: number; // radians
  sliderDisplacement: number;
  velocity: number;
  acceleration: number;
}

export interface GraphData {
  angle: number; // degrees
  position: number;
  velocity: number;
  acceleration: number;
}

export interface KinematicValidation {
  isValid: boolean;
  error?: string;
}

/**
 * Validate if the mechanism parameters are kinematically possible
 * For a slider-crank mechanism: connecting rod length must be greater than crank radius
 */
export function validateMechanism(params: MechanismParams): KinematicValidation {
  const { crankRadius, connectingRodLength } = params
  
  if (crankRadius <= 0) {
    return {
      isValid: false,
      error: "Crank radius must be greater than 0"
    }
  }
  
  if (connectingRodLength <= 0) {
    return {
      isValid: false,
      error: "Connecting rod length must be greater than 0"
    }
  }
  
  if (connectingRodLength <= crankRadius) {
    return {
      isValid: false,
      error: `Connecting rod length (${connectingRodLength}) must be greater than crank radius (${crankRadius}) for kinematically valid motion`
    }
  }
  
  return { isValid: true }
}

/**
 * Calculate slider position for given crank angle
 * x(θ) = r * cos(θ) + sqrt(l² - (r * sin(θ))²)
 */
export function calculateSliderPosition(
  crankAngle: number,
  crankRadius: number,
  connectingRodLength: number
): number {
  const cosTheta = Math.cos(crankAngle);
  const sinTheta = Math.sin(crankAngle);
  
  const term1 = crankRadius * cosTheta;
  const term2 = Math.sqrt(
    connectingRodLength * connectingRodLength - 
    (crankRadius * sinTheta) * (crankRadius * sinTheta)
  );
  
  // Check for NaN or invalid values
  if (isNaN(term2) || !isFinite(term2)) {
    throw new Error("Invalid mechanism parameters: connecting rod length must be greater than crank radius");
  }
  
  return term1 + term2;
}

/**
 * Calculate slider velocity (derivative of position w.r.t time)
 * v(θ) = -r * ω * sin(θ) - (r² * ω * sin(θ) * cos(θ)) / sqrt(l² - (r * sin(θ))²)
 */
export function calculateSliderVelocity(
  crankAngle: number,
  crankRadius: number,
  connectingRodLength: number,
  crankSpeed: number
): number {
  const omega = (crankSpeed * 2 * Math.PI) / 60; // Convert rpm to rad/s
  const sinTheta = Math.sin(crankAngle);
  const cosTheta = Math.cos(crankAngle);
  
  const term1 = -crankRadius * omega * sinTheta;
  const denominator = Math.sqrt(
    connectingRodLength * connectingRodLength - 
    (crankRadius * sinTheta) * (crankRadius * sinTheta)
  );
  
  // Check for division by zero or invalid values
  if (isNaN(denominator) || !isFinite(denominator) || denominator === 0) {
    throw new Error("Invalid mechanism parameters: connecting rod length must be greater than crank radius");
  }
  
  const term2 = -(crankRadius * crankRadius * omega * sinTheta * cosTheta) / denominator;
  
  return term1 + term2;
}

/**
 * Calculate slider acceleration (derivative of velocity w.r.t time)
 */
export function calculateSliderAcceleration(
  crankAngle: number,
  crankRadius: number,
  connectingRodLength: number,
  crankSpeed: number
): number {
  const omega = (crankSpeed * 2 * Math.PI) / 60; // Convert rpm to rad/s
  const sinTheta = Math.sin(crankAngle);
  const cosTheta = Math.cos(crankAngle);
  
  const r = crankRadius;
  const l = connectingRodLength;
  const rSinTheta = r * sinTheta;
  // rCosTheta not required in simplified acceleration expression
  
  const sqrtTerm = Math.sqrt(l * l - rSinTheta * rSinTheta);
  
  // Check for invalid values
  if (isNaN(sqrtTerm) || !isFinite(sqrtTerm) || sqrtTerm === 0) {
    throw new Error("Invalid mechanism parameters: connecting rod length must be greater than crank radius");
  }
  
  // First derivative terms
  const d1 = -r * omega * omega * cosTheta;
  
  // Second derivative terms (simplified)
  const d2 = -(r * r * omega * omega * cosTheta * cosTheta) / sqrtTerm;
  const d3 = (r * r * r * omega * omega * sinTheta * sinTheta * cosTheta) / (sqrtTerm * sqrtTerm * sqrtTerm);
  
  return d1 + d2 + d3;
}

/**
 * Generate complete simulation state for given parameters
 */
export function calculateSimulationState(
  crankAngle: number,
  params: MechanismParams
): SimulationState {
  try {
    const position = calculateSliderPosition(
      crankAngle,
      params.crankRadius,
      params.connectingRodLength
    );
    
    const velocity = calculateSliderVelocity(
      crankAngle,
      params.crankRadius,
      params.connectingRodLength,
      params.crankSpeed
    );
    
    const acceleration = calculateSliderAcceleration(
      crankAngle,
      params.crankRadius,
      params.connectingRodLength,
      params.crankSpeed
    );
    
    return {
      crankAngle,
      sliderDisplacement: position,
      velocity,
      acceleration,
    };
  } catch {
    // Return a default state with error indicators
    return {
      crankAngle,
      sliderDisplacement: NaN,
      velocity: NaN,
      acceleration: NaN,
    };
  }
}

/**
 * Generate graph data for plotting
 */
export function generateGraphData(params: MechanismParams): GraphData[] {
  const data: GraphData[] = [];
  const steps = 360; // One data point per degree
  
  try {
    for (let i = 0; i <= steps; i++) {
      const angleDegrees = i;
      const angleRadians = (angleDegrees * Math.PI) / 180;
      
      const position = calculateSliderPosition(
        angleRadians,
        params.crankRadius,
        params.connectingRodLength
      );
      
      const velocity = calculateSliderVelocity(
        angleRadians,
        params.crankRadius,
        params.connectingRodLength,
        params.crankSpeed
      );
      
      const acceleration = calculateSliderAcceleration(
        angleRadians,
        params.crankRadius,
        params.connectingRodLength,
        params.crankSpeed
      );
      
      data.push({
        angle: angleDegrees,
        position,
        velocity,
        acceleration,
      });
    }
  } catch {
    // Return empty data if calculation fails
    return [];
  }
  
  return data;
}

/**
 * Get difficulty-specific parameter ranges
 */
export function getDifficultyRanges(difficulty: 'beginner' | 'intermediate' | 'advanced') {
  switch (difficulty) {
    case 'beginner':
      return {
        crankRadius: { min: 20, max: 80, step: 5 },
        connectingRodLength: { min: 100, max: 200, step: 10 },
        crankSpeed: { min: 50, max: 200, step: 10 },
      };
    case 'intermediate':
      return {
        crankRadius: { min: 10, max: 100, step: 1 },
        connectingRodLength: { min: 50, max: 300, step: 5 },
        crankSpeed: { min: 10, max: 500, step: 5 },
      };
    case 'advanced':
      return {
        crankRadius: { min: 5, max: 150, step: 1 },
        connectingRodLength: { min: 25, max: 500, step: 1 },
        crankSpeed: { min: 1, max: 1000, step: 1 },
      };
  }
}
