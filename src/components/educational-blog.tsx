import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import Image from 'next/image';
// If you add a real PNG (e.g. public/slider-crank.png) you can import it properly like:
// import sliderCrankDiagram from '@/public/slider-crank.png';
// Current diagram uses inline SVG below so we remove the broken import.

export default function EducationalBlog() {
  return (
    <section
      className="edu-blog"
      style={{
        maxWidth: '800px',
        width: '100%',
        margin: '3rem auto',
        padding: '2.5rem 2rem',
        background: '#23272f',
        borderRadius: '16px',
        boxShadow: '0 2px 24px rgba(0,0,0,0.18)',
        color: '#f3f4f6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.75rem', textAlign: 'center', letterSpacing: '-1px' }}>
        Slider-Crank Mechanism Educational Blog
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }} aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '1rem', textAlign: 'center' }}>
        Introduction & Components
      </h2>
      <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '1.5rem', maxWidth: '700px' }}>
        The <strong>slider-crank mechanism</strong> is a fundamental mechanical system used to convert rotational motion into linear motion, or vice versa. It is widely found in engines, pumps, and compressors.
      </p>
      <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', alignSelf: 'flex-start' }}>Key Linkages & Components</h3>
      <ul style={{ fontSize: '1.05rem', marginBottom: '2rem', alignSelf: 'flex-start', paddingLeft: '1.5rem' }}>
        <li><strong>Crank</strong>: The rotating arm that drives the motion.</li>
        <li><strong>Slider</strong>: The part that moves back and forth in a straight line.</li>
        <li><strong>Connecting Rod</strong>: The link that connects the crank to the slider.</li>
        <li><strong>Crank Pin</strong>: The joint where the crank and connecting rod are attached.</li>
        <li><strong>Frame</strong>: The fixed structure supporting the mechanism.</li>
      </ul>
      <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', alignSelf: 'flex-start' }}>Diagram</h3>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
      <Image
        src="/slider-crank.png"
        alt="Slider-Crank Diagram"
        width={320}
        height={220}
        sizes="(max-width: 768px) 80vw, 320px"
        style={{ margin: '0 auto', width: '100%', maxWidth: 320, height: 'auto' }}
      />
      </div>
      <p style={{ fontStyle: 'italic', color: '#cbd5e1', marginBottom: '2rem', textAlign: 'center' }}>
        Diagram showing the main components of a slider-crank mechanism.
      </p>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', alignSelf: 'flex-start' }}>How It Works</h2>
      <p style={{ fontSize: '1.05rem', marginBottom: '2rem', textAlign: 'center', maxWidth: '700px' }}>
        As the crank rotates, the connecting rod transmits the motion to the slider, causing it to move linearly. This principle is used in internal combustion engines, where the piston (slider) is driven by the crankshaft (crank).
      </p>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', alignSelf: 'flex-start' }}>Usage Examples & Screenshots</h2>
      <ul style={{ fontSize: '1.05rem', marginBottom: '1.5rem', alignSelf: 'flex-start', paddingLeft: '1.5rem' }}>
        <li>Automobile engines (piston and crankshaft)</li>
        <li>Reciprocating pumps</li>
        <li>Compressors</li>
      </ul>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', minHeight: '220px', background: '#1e2127', borderRadius: '12px', alignItems: 'center' }}>
        {/* Leave space for screenshot or animation */}
        <Image
          src="/slider-crank-usage.png"
          alt="Engine Example Screenshot"
          width={320}
          height={220}
          sizes="(max-width: 768px) 80vw, 320px"
          style={{ margin: '0 auto', width: '100%', maxWidth: 320, height: 'auto' }}
        />
      </div>
      <p style={{ fontStyle: 'italic', color: '#cbd5e1', marginBottom: '2rem', textAlign: 'center' }}>
        Screenshot: Example of a slider-crank mechanism in an engine simulation.
      </p>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', alignSelf: 'flex-start' }}>Mathematical Derivation</h2>
      <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem', textAlign: 'center', maxWidth: '700px' }}>
        The slider-crank mechanism is a classic example in kinematics, converting rotational motion into linear motion. Below is a derivation of the position of the slider as a function of the crank angle.
      </p>
      <h3>Position Equation</h3>
      <BlockMath math={String.raw`
x = r \cos\theta + \sqrt{l^2 - (r \sin\theta)^2}
`}/>
      <ul style={{ marginBottom: '1.5rem', fontSize: '1.05rem', alignSelf: 'flex-start', paddingLeft: '1.5rem' }}>
        <p>Where:</p>
        <li><strong>x</strong>: Position of the slider</li>
        <li><strong>r</strong>: Length of the crank</li>
        <li><strong>l</strong>: Length of the connecting rod</li>
  <li><InlineMath math={'\\theta'} />: Crank angle</li>
      </ul>
      <h3>Full Geometric Derivation (Step by Step)</h3>
      <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
        Let the fixed crank pivot be <strong>O = (0,0)</strong>. The crank pin (joint between crank and connecting rod) is <strong>P</strong> with coordinates:
      </p>
      <BlockMath math={String.raw`P = (r \cos\theta,\ r \sin\theta)`} />
      <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
        The slider center <strong>S</strong> lies on the horizontal axis so <strong>S = (x,0)</strong>. The distance between P and S equals the connecting rod length <strong>l</strong>:
      </p>
      <BlockMath math={String.raw`(x - r \cos\theta)^2 + (0 - r \sin\theta)^2 = l^2`} />
      <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>Expand and solve for the positive (physical) root:</p>
      <BlockMath math={String.raw`(x - r \cos\theta)^2 + (r \sin\theta)^2 = l^2`} />
      <BlockMath math={String.raw`x - r \cos\theta = \sqrt{l^2 - (r \sin\theta)^2}`} />
      <BlockMath math={String.raw`\Rightarrow\; x = r \cos\theta + \sqrt{l^2 - (r \sin\theta)^2}`} />
      <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem' }}>
  We choose the <em>positive</em> square root because the slider lies to the right of the crank pivot for standard configurations (thus <InlineMath math={'x > r \\cos \\theta'} />).
      </p>
      <h3>Angle of the Connecting Rod</h3>
      <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
  Let <InlineMath math={'\\varphi'} /> be the angle the connecting rod makes with the horizontal. From right triangle geometry:
      </p>
      <BlockMath math={String.raw`\tan\varphi = \dfrac{r \sin\theta}{x - r \cos\theta}`} />
      <BlockMath math={String.raw`\sin\varphi = \dfrac{r \sin\theta}{l} \qquad \cos\varphi = \dfrac{x - r \cos\theta}{l}`} />
      <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem' }}>
        These relations allow you to decompose any force transmitted along the connecting rod into horizontal and vertical components.
      </p>
      <h3>Force Decomposition Example</h3>
      <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
        Suppose the connecting rod exerts a compressive force <strong>F_c</strong> along its axis (directed from slider toward the crank pin). Then at the crank pin the components are:
      </p>
      <BlockMath math={String.raw`F_x = F_c \cos\varphi = F_c\;\dfrac{x - r \cos\theta}{l} \qquad F_y = F_c \sin\varphi = F_c\;\dfrac{r \sin\theta}{l}`} />
      <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
  The angle <InlineMath math={'\\varphi'} /> is thus fully determined by the geometry (via <InlineMath math={'\\theta'} />). The crank torque contribution from this force depends on the component of force perpendicular to the crank; if <InlineMath math={'\\beta'} /> is the angle between crank and rod, the instantaneous torque magnitude is:
      </p>
      <BlockMath math={String.raw`T = r\,F_c\,\sin\beta \quad \text{with}\quad \beta = \varphi - \theta`} />
      <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>
  (Derivation: the moment arm of the force about O is <InlineMath math={'r \\sin \\beta'} />.)
      </p>
      <h3>Annotated Geometry (SVG)</h3>
      <figure style={{ margin: '0 0 1.5rem 0', textAlign: 'center' }}>
        <svg width="340" height="220" viewBox="0 0 340 220" role="img" aria-labelledby="geomTitle geomDesc">
          <title id="geomTitle">Slider-Crank Geometry</title>
          <desc id="geomDesc">Crank pivot O at origin, crank OP at angle theta, connecting rod PS to slider S on x-axis.</desc>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
            </marker>
          </defs>
          {/* Axes */}
          <line x1="20" y1="180" x2="320" y2="180" stroke="#475569" strokeWidth="2" />
          <line x1="20" y1="180" x2="20" y2="40" stroke="#475569" strokeWidth="2" />
          {/* Crank pivot O */}
          <circle cx="20" cy="180" r="5" fill="#e2e8f0" />
          <text x="28" y="172" fontSize="12" fill="#e2e8f0">O</text>
          {/* Crank radius r at angle theta */}
          <line x1="20" y1="180" x2="110" y2="110" stroke="#38bdf8" strokeWidth="4" />
          <circle cx="110" cy="110" r="5" fill="#38bdf8" />
          <text x="116" y="106" fontSize="12" fill="#e2e8f0">P</text>
            {/* Connecting rod */}
          <line x1="110" y1="110" x2="250" y2="180" stroke="#f59e0b" strokeWidth="4" />
          <circle cx="250" cy="180" r="6" fill="#f59e0b" />
          <text x="258" y="172" fontSize="12" fill="#e2e8f0">S</text>
          {/* Angle theta arc */}
          <path d="M40 180 A20 20 0 0 1 54 164" stroke="#94a3b8" strokeWidth="2" fill="none" />
          <text x="60" y="165" fontSize="12" fill="#94a3b8">θ</text>
          {/* Angle phi arc */}
          <path d="M130 120 A30 30 0 0 1 155 150" stroke="#94a3b8" strokeWidth="2" fill="none" />
          <text x="160" y="150" fontSize="12" fill="#94a3b8">φ</text>
          {/* Projection lines */}
          <line x1="110" y1="110" x2="110" y2="180" stroke="#64748b" strokeDasharray="4 4" />
          <line x1="110" y1="110" x2="20" y2="110" stroke="#64748b" strokeDasharray="4 4" />
          <text x="60" y="104" fontSize="10" fill="#cbd5e1">r sin θ</text>
          <text x="112" y="150" fontSize="10" fill="#cbd5e1">r cos θ</text>
          {/* Force along rod */}
          <line x1="180" y1="150" x2="110" y2="110" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="175" y="142" fontSize="11" fill="#ef4444">F_c</text>
        </svg>
        <figcaption style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Geometry with angles θ (crank) and φ (connecting rod) and force F_c along the rod.</figcaption>
      </figure>
      <h3>Velocity Derivation</h3>
      <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>Differentiate the position with respect to time (θ̇ = ω):</p>
      <BlockMath math={String.raw`\frac{dx}{d\theta} = -r \sin\theta - \frac{r^2 \sin\theta \cos\theta}{\sqrt{l^2 - (r \sin\theta)^2}}`} />
      <BlockMath math={String.raw`v = \frac{dx}{dt} = \left(-r \sin\theta - \frac{r^2 \sin\theta \cos\theta}{\sqrt{l^2 - (r \sin\theta)^2}}\right)\,\omega`} />
      <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>
        Note the second term is <strong>negative</strong> (often a sign error is seen in summaries). For small positive θ the slider moves left so v is negative.
      </p>
      <h3>Velocity Equation</h3>
      <BlockMath math={String.raw`
v = \left(-r \sin\theta - \frac{r^2 \sin\theta \cos\theta}{\sqrt{l^2 - (r \sin\theta)^2}}\right) \omega
`}/>
      <p>
        Where <InlineMath math={'\\omega'} /> is the angular velocity of the crank.
      </p>
      <h3>Acceleration Derivation</h3>
      <p style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>
        Differentiate <InlineMath math={'v(\\theta)'} /> with respect to time again. With constant <InlineMath math={'\\omega'} />, we have <InlineMath math={'a = \\dfrac{d v}{dt} = \\dfrac{d v}{d \\theta} \\omega = \\dfrac{d^2 x}{d \\theta^2} \\omega^2'} />.
      </p>
      <p style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>
        First compute the second derivative of position with respect to angle:
      </p>
      <BlockMath math={String.raw`\frac{dx}{d\theta} = -r\sin\theta - \frac{r^2 \sin\theta \cos\theta}{\sqrt{l^2 - (r\sin\theta)^2}}`} />
      <BlockMath math={String.raw`\frac{d^2 x}{d\theta^2} = -r\cos\theta - \frac{ r^2 (\cos^2\theta - \sin^2\theta)(l^2 - r^2 \sin^2\theta) + r^4 \sin^2\theta \cos^2\theta }{(l^2 - r^2 \sin^2\theta)^{3/2}}`} />
      <BlockMath math={String.raw`a = \frac{d^2 x}{dt^2} = \left[-r\cos\theta - \frac{ r^2 (\cos^2\theta - \sin^2\theta)(l^2 - r^2 \sin^2\theta) + r^4 \sin^2\theta \cos^2\theta }{(l^2 - r^2 \sin^2\theta)^{3/2}}\right] \omega^2`} />
      <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '1.25rem' }}>
        This expression assumes constant angular speed <InlineMath math={'\\omega'} /> (no crank angular acceleration). Peaks occur near top and bottom dead centers where geometric nonlinearity amplifies slider acceleration.
      </p>
      <h3>Kinematic Graphs (Sample r = 1, l = 3)</h3>
      <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>
        Below are qualitative plots (not dynamically computed here) illustrating how displacement <strong>x</strong>, velocity <strong>v</strong>, and the force transmission ratio vary with crank angle <strong>θ</strong>. You can later replace these with live charts driven by your simulation state.
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        width: '100%',
        marginBottom: '1.5rem'
      }}>
        {/* Displacement Graph */}
        <figure style={{ background: '#1e2127', border: '1px solid #334155', borderRadius: '12px', padding: '0.75rem' }}>
          <figcaption style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Displacement x(θ)</figcaption>
          <svg viewBox="0 0 160 100" width="100%" height="100" role="img" aria-label="Displacement vs angle">
            <defs>
              <linearGradient id="gradX" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="160" height="100" fill="#0f172a" rx="8" />
            {/* Axes */}
            <line x1="20" y1="10" x2="20" y2="85" stroke="#475569" strokeWidth="1" />
            <line x1="20" y1="85" x2="150" y2="85" stroke="#475569" strokeWidth="1" />
            {/* Curve (stylized) */}
            <path d="M20 60 C 45 15, 75 15, 100 60 S 140 105, 150 55" fill="none" stroke="#38bdf8" strokeWidth="2" />
            {/* Fill under curve for style */}
            <path d="M20 60 C 45 15, 75 15, 100 60 S 140 105, 150 55 L150 85 L20 85 Z" fill="url(#gradX)" />
            <text x="80" y="96" fontSize="8" fill="#94a3b8">θ (0 → 2π)</text>
            <text x="2" y="14" fontSize="8" fill="#94a3b8">x</text>
          </svg>
        </figure>
        {/* Velocity Graph */}
        <figure style={{ background: '#1e2127', border: '1px solid #334155', borderRadius: '12px', padding: '0.75rem' }}>
          <figcaption style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Velocity v(θ)</figcaption>
          <svg viewBox="0 0 160 100" width="100%" height="100" role="img" aria-label="Velocity vs angle">
            <rect x="0" y="0" width="160" height="100" fill="#0f172a" rx="8" />
            <line x1="20" y1="10" x2="20" y2="85" stroke="#475569" strokeWidth="1" />
            <line x1="20" y1="45" x2="150" y2="45" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="20" y1="85" x2="150" y2="85" stroke="#475569" strokeWidth="1" />
            {/* Stylized velocity curve (derivative shape) */}
            <path d="M20 45 C 40 5, 60 85, 80 45 S 120 5, 150 45" fill="none" stroke="#f472b6" strokeWidth="2" />
            <text x="80" y="96" fontSize="8" fill="#94a3b8">θ</text>
            <text x="2" y="14" fontSize="8" fill="#94a3b8">v</text>
          </svg>
        </figure>
        {/* Acceleration graph */}
        <figure style={{ background: '#1e2127', border: '1px solid #334155', borderRadius: '12px', padding: '0.75rem' }}>
          <figcaption style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>Acceleration a(θ)</figcaption>
          <svg viewBox="0 0 160 100" width="100%" height="100" role="img" aria-label="Acceleration vs angle">
            <rect x="0" y="0" width="160" height="100" fill="#0f172a" rx="8" />
            <line x1="20" y1="10" x2="20" y2="85" stroke="#475569" strokeWidth="1" />
            <line x1="20" y1="45" x2="150" y2="45" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="20" y1="85" x2="150" y2="85" stroke="#475569" strokeWidth="1" />
            {/* Stylized acceleration curve with higher peaks */}
            <path d="M20 45 C 30 5, 50 85, 65 20 S 95 90, 110 10 140 80, 150 35" fill="none" stroke="#34d399" strokeWidth="2" />
            <text x="80" y="96" fontSize="8" fill="#94a3b8">θ</text>
            <text x="2" y="14" fontSize="8" fill="#94a3b8">a</text>
          </svg>
        </figure>
      </div>
      <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
        These SVGs are schematic. Replace with live charts using your computed arrays (e.g. with <code>graphData</code>) for accurate displacement, velocity, and acceleration.
      </p>
      <h3>Example Diagram</h3>
      <Image
        src="/mechanism.jpg"
        alt="Slider-Crank Diagram"
        width={600}
        height={200}
        sizes="(max-width: 900px) 90vw, 600px"
        style={{ width: '100%', maxWidth: 600, height: 'auto' }}
      />
      <p>
        The above diagram illustrates the geometry of the slider-crank mechanism.
      </p>
      <h3>Further Reading</h3>
      <p>
        For a detailed derivation and more examples, refer to standard textbooks on kinematics or mechanical engineering.
      </p>
    </section>
  );
}
