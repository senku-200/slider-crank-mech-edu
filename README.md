# Slider-Crank Mechanism Simulation

Interactive slider–crank mechanism simulator with real‑time kinematics, educational derivations (KaTeX), and live graphs. Built with Next.js + TypeScript.

## Features

- **Canvas Animation**: High‑performance requestAnimationFrame crank + slider motion
- **Real‑Time Kinematics**: Position, velocity, acceleration (validated formulas) updated live
- **Adjustable Parameters**: Crank radius, rod length, crank speed (rpm)
- **Difficulty Presets**: Quick presets for balanced / high‑speed / high‑rod / compact
- **Live Graphs (Canvas)**: Position & velocity and acceleration plots (no heavy chart lib)
- **Educational Blog**: Full derivations, force decomposition, geometry SVG, KaTeX rendering
- **Theme Toggle**: Light/dark
- **Performance Optimized**: Throttled React state commits + local animation integration

## Technical Implementation

### Kinematics Equations

The simulation implements the following mathematical relationships:

- **Position**: `x(θ) = r * cos(θ) + sqrt(l² - (r * sin(θ))²)`
- **Velocity**: `v(θ) = -r * ω * sin(θ) - (r² * ω * sin(θ) * cos(θ)) / sqrt(l² - (r * sin(θ))²)`
- **Acceleration**: Computed as the derivative of velocity with respect to time

Where:
- `r` = crank radius
- `l` = connecting rod length
- `θ` = crank angle
- `ω` = angular velocity (rpm converted to rad/s)

### Technology Stack

- **Framework**: Next.js 15 (App Router, Turbopack dev)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + utility classes
- **UI Components**: Radix UI (slider, switch, tabs)
- **Math Rendering**: KaTeX via `react-katex`
- **Icons**: Lucide React
- **Animation Loop**: Custom canvas + requestAnimationFrame (no external animation lib for mechanism)

### Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main application component
│   └── globals.css         # Global styles and theme
├── components/
│   ├── theme-toggle.tsx    # Light/dark mode toggle
│   ├── mechanism-animation.tsx  # Canvas mechanism animation
│   ├── parameter-controls.tsx   # Parameter sliders
│   ├── real-time-measurements.tsx  # Live measurements display
│   ├── mechanism-graphs.tsx      # Canvas graphs (position/velocity & acceleration)
│   ├── difficulty-selector.tsx   # Difficulty mode selector
│   └── animation-controls.tsx    # Play/pause controls
└── lib/
    ├── kinematics.ts       # Mathematical calculations
    └── utils.ts           # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd slider-crank-mech-cursor
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Usage

1. **Animation Controls**: Use the play/pause button to start/stop the animation, or use step controls for manual progression
2. **Parameter Adjustment**: Drag the sliders to modify crank radius, connecting rod length, and crank speed
3. **Difficulty Levels**: Switch between Beginner, Intermediate, and Advanced modes for different parameter ranges
4. **Theme Toggle**: Switch between light and dark themes using the toggle in the top-right corner
5. **Real-time Data**: Monitor the current values of crank angle, slider displacement, velocity, and acceleration
6. **Graphs**: View the position/velocity and acceleration plots that update in real-time

## Performance Notes

- Local angle integration inside animation component (smooth high RPM)
- Throttled React state commits (~12–15 fps) to reduce reconciliation cost
- Graph redraw decoupled from heavy re-calculation; parameter changes trigger data recompute
- Canvas rendering avoids large SVG diffing at high frame rates

## Deploying to Vercel

1. Push repository to GitHub/GitLab/Bitbucket.
2. In Vercel dashboard: “New Project” → import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Root directory: project root (where `package.json` lives).
5. Build & Output (defaults):
    - Install Command: `npm install`
    - Build Command: `next build`
    - Output Directory: `.next`
6. (Optional) Set environment variables in Vercel if you add any later (none required now).
7. Deploy. Vercel will provide preview + production domains.

### Production Optimization Tips
- Run `npm run build` locally to verify before pushing.
- Keep unused dependencies out of `package.json` (remove `recharts` if no longer used).
- Enable Next.js image optimization only for real assets you add (currently placeholders).

## Browser Support

Modern Chromium, Firefox, Safari, Edge (ES2022+). Tested in latest Chrome.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

---
Feel free to open issues for enhancements (3D visualization, force/torque plots, offscreen worker integration, etc.).
