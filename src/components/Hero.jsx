import Lanyard from './Lanyard/Lanyard'
import { ErrorBoundary } from './Lanyard/ErrorBoundary'
import { useBreakpoint } from '../hooks/useBreakpoint'

// The canvas box is deliberately taller than the card so there is room for the
// strap above it and slack below for dragging — the card itself is sized by
// cameraDistance, not by this box.
const CANVAS_HEIGHT = 820
const CANVAS_BOTTOM_OFFSET = -100

const CARD_PRESETS = {
  // cardStartPosition is [x, yOffset] of the lanyard anchor in world units.
  desktop: { cardStartPosition: [1.8, 0], cameraDistance: 12, fov: 20 },
  tablet: { cardStartPosition: [0, 0], cameraDistance: 9, fov: 24 },
  mobile: { cardStartPosition: [0, 0], cameraDistance: 8, fov: 26 },
  small: { cardStartPosition: [0, 0], cameraDistance: 8, fov: 26 },
}

const CARD_WRAPPER_HEIGHT = {
  tablet: '420px',
  mobile: '360px',
  small: '300px',
}

const TITLE_FONT_SIZE = {
  desktop: '3.125rem',
  tablet: '2.35rem',
  mobile: '1.9rem',
  small: '1.65rem',
}

const SUBTITLE_FONT_SIZE = {
  desktop: '1.25rem',
  tablet: '1.1rem',
  mobile: '1rem',
  small: '0.95rem',
}

export default function Hero() {
  const breakpoint = useBreakpoint()
  const isStacked = breakpoint !== 'desktop'
  const cardPreset = CARD_PRESETS[breakpoint] || CARD_PRESETS.desktop


  return (
    <section id="home" className="hero-section" style={{
      position: 'relative',
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      minHeight: 'auto',
      overflow: 'visible',
      display: 'flex',
      flexDirection: isStacked ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isStacked ? 'stretch' : 'flex-start',
      gap: isStacked ? '1.5rem' : 0,
      paddingTop: '1.5rem',
      paddingBottom: isStacked ? '1.5rem' : 0,
      paddingLeft: '4vw',
      paddingRight: '4vw'
    }}>
      {/* Ambient glow behind the card (Figma "Ellipse 1") */}
      <div className="hero-glow" aria-hidden="true" style={{
        position: 'absolute',
        left: isStacked ? '50%' : '57.5%',
        top: isStacked ? '55%' : '30%',
        transform: isStacked ? 'translateX(-50%)' : 'none',
        width: isStacked ? '80%' : '32%',
        height: isStacked ? '280px' : '436px',
        background: '#535086',
        filter: 'blur(150px)',
        borderRadius: '50%',
        opacity: 0.55,
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* 3D Lanyard Canvas, scoped to this section */}
      <div className="lanyard-viewport-wrapper" style={{
        position: isStacked ? 'relative' : 'absolute',
        order: isStacked ? 2 : 0,
        top: isStacked ? 0 : 'auto',
        bottom: isStacked ? 'auto' : `${CANVAS_BOTTOM_OFFSET}px`,
        // Full-bleed horizontally: the section sits inside the container's
        // padding, so a 100%-wide canvas clipped the card as soon as it was
        // dragged past the section edge.
        left: isStacked ? 0 : '50%',
        transform: isStacked ? 'none' : 'translateX(-50%)',
        width: isStacked ? '100%' : '100vw',
        height: isStacked ? CARD_WRAPPER_HEIGHT[breakpoint] : `${CANVAS_HEIGHT}px`,
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <ErrorBoundary>
          <Lanyard
            cardModel="/models/card.glb"
            stringColor="#ffffff"
            clipColor="#667073"
            gravity={30}
            lightingIntensity={50}
            {...cardPreset}
          />
        </ErrorBoundary>
      </div>

      {/* Left Content Overlay */}
      <div className="hero-content-container" style={{
        position: 'relative',
        order: isStacked ? 1 : 0,
        zIndex: 10,
        maxWidth: isStacked ? '100%' : '580px',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem'
      }}>
        <h1 className="hero-title" style={{
          fontSize: TITLE_FONT_SIZE[breakpoint],
          fontWeight: 400,
          lineHeight: 1.12,
          letterSpacing: '-0.035em',
          color: '#ffffff',
          pointerEvents: 'none'
        }}>
          Designing Intuitive experiences that create <em style={{ fontFamily: 'Playfair Display, Georgia, serif', fontStyle: 'italic', color: '#a855f7', fontWeight: 'normal' }}>real impact</em>
        </h1>

        <p className="hero-subtitle" style={{
          fontSize: SUBTITLE_FONT_SIZE[breakpoint],
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.65)',
          lineHeight: 1.65,
          maxWidth: isStacked ? '100%' : '520px',
          pointerEvents: 'none'
        }}>
          I'm a UI/UX Designer focused on creating intuitive, accessible and visually refined digital experiences that drive real impact.
        </p>

        {/* Now Building Card Widget */}
        <div className="now-building-card-widget" style={{
          pointerEvents: 'auto',
          background: 'rgba(18, 18, 20, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '14px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: breakpoint === 'mobile' || breakpoint === 'small' ? 'column' : 'row',
          maxWidth: isStacked ? '100%' : '520px',
          width: '100%',
          boxShadow: '0 10px 28px rgba(0, 0, 0, 0.5)',
          marginTop: '0.4rem'
        }}>
          {/* Left Column: Full Height Flush Image */}
          <div style={{
            width: breakpoint === 'mobile' || breakpoint === 'small' ? '100%' : '170px',
            height: breakpoint === 'mobile' || breakpoint === 'small' ? '140px' : 'auto',
            minHeight: '120px',
            flexShrink: 0,
            background: '#141416'
          }}>
            <img
              src="/project.png"
              alt="CREA Mobile App"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>

          {/* Right Column: Text Details */}
          <div style={{
            padding: '0.85rem 1.2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0.2rem',
            flex: 1
          }}>
            <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 300 }}>Now Building</span>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 600, margin: 0, color: '#ffffff', letterSpacing: '-0.01em' }}>CREA Mobile App</h4>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.35, margin: 0, fontWeight: 300 }}>
              Design directly in your browser. Your agent writes the code.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
