import { useState } from 'react'
import Lanyard from './Lanyard/Lanyard'
import { ErrorBoundary } from './Lanyard/ErrorBoundary'

export default function Hero() {
  return (
    <section id="home" className="hero-section" style={{
      position: 'relative',
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      minHeight: 'auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingTop: '1.5rem',
      paddingLeft: '4vw',
      paddingRight: '4vw'
    }}>
      {/* 3D Lanyard Full Viewport Background Canvas */}
      <div className="lanyard-viewport-wrapper" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <ErrorBoundary>
          <Lanyard
            cardModel="/models/card.glb"
            stringColor="#ffffff"
            clipColor="#667073"
            gravity={40}
            cameraDistance={10.5}
            fov={20}
            lightingIntensity={50}
            cardStartPosition={[1.8, -1.2]}
          />
        </ErrorBoundary>
      </div>

      {/* Left Content Overlay */}
      <div className="hero-content-container" style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '580px',
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem'
      }}>
        <h1 className="hero-title" style={{
          fontSize: '3.125rem',
          fontWeight: 400,
          lineHeight: 1.12,
          letterSpacing: '-0.035em',
          color: '#ffffff',
          pointerEvents: 'none'
        }}>
          Designing Intuitive experiences that create <em style={{ fontFamily: 'Playfair Display, Georgia, serif', fontStyle: 'italic', color: '#a855f7', fontWeight: 'normal' }}>real impact</em>
        </h1>

        <p className="hero-subtitle" style={{
          fontSize: '1.25rem',
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.65)',
          lineHeight: 1.65,
          maxWidth: '520px',
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
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 10px 28px rgba(0, 0, 0, 0.5)',
          marginTop: '0.4rem'
        }}>
          {/* Left Column: Full Height Flush Image */}
          <div style={{
            width: '170px',
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
