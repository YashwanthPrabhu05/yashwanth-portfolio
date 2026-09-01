import { useState, useEffect } from 'react'
import { useBreakpoint } from '../hooks/useBreakpoint'

const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'community', label: 'Community', href: '#community' },
  { id: 'blogs', label: 'Blogs', href: '#blogs' },
]

function ArrowUpRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

export default function Navbar({ activeTab = 'home', onSelectTab }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const breakpoint = useBreakpoint()
  const isSmall = breakpoint === 'mobile' || breakpoint === 'small'
  const showFullNav = breakpoint === 'desktop'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, linkId) => {
    if (onSelectTab) {
      onSelectTab(linkId)
    }
  }

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{
      background: 'transparent',
      paddingTop: '24px',
      paddingBottom: '24px',
      position: 'relative',
      zIndex: 50,
      width: '100%'
    }}>
      <div style={{
        width: '100%',
        paddingLeft: '4vw',
        paddingRight: '4vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}>

        {/* Real Logo SVG Asset */}
        <a
          href="#home"
          className="navbar-logo"
          aria-label="YP Home"
          onClick={(e) => handleNavClick(e, 'home')}
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <img
            src="/Yp_logo.svg"
            alt="YP Logo"
            style={{ height: isSmall ? '52px' : '90px', width: 'auto', display: 'block', objectFit: 'none', overflow: 'visible', transform: 'translateY(0.1%)' }}
          />
        </a>

        {/* Nav Links (Centered) */}
        <nav aria-label="Main navigation" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <ul className="navbar-nav" style={{ display: showFullNav ? 'flex' : 'none', gap: '2.2rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map((link) => {
              const isActive = activeTab === link.id
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={isActive ? 'active' : ''}
                    onClick={(e) => handleNavClick(e, link.id)}
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 200,
                      color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.65)',
                      textDecoration: 'none',
                      paddingBottom: '6px',
                      borderBottom: isActive ? '2px solid #a855f7' : '2px solid transparent',
                      transition: 'all 0.2s ease',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right Actions: Let's Connect Pill CTA */}
        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <a
            href="mailto:contact@yashwanthprabhu.com"
            className="lets-connect-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: breakpoint === 'small' ? 0 : '10px',
              padding: breakpoint === 'small' ? '6px' : isSmall ? '6px 12px' : '8px 18px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(12px)',
              fontSize: isSmall ? '0.85rem' : '0.925rem',
              fontWeight: 500,
              color: '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            {breakpoint !== 'small' && "Let's Connect"}
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#ffffff'
            }}>
              <ArrowUpRightIcon />
            </span>
          </a>

          <button
            className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            id="mobile-menu-btn"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      <nav className={`mobile-menu ${mobileOpen ? 'open' : ''}`} aria-label="Mobile navigation">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className={activeTab === link.id ? 'active' : ''}
            onClick={(e) => {
              handleNavClick(e, link.id)
              setMobileOpen(false)
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
