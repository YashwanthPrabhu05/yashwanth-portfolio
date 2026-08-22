import { useState, useEffect } from 'react'

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

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Navbar({ activeTab = 'home', onSelectTab, theme = 'dark', toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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
            style={{ height: '90px', width: 'auto', display: 'block', objectFit: 'none', overflow: 'visible', transform: 'translateY(0.1%)' }}
          />
        </a>

        {/* Nav Links (Centered) */}
        <nav aria-label="Main navigation" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <ul className="navbar-nav" style={{ display: 'flex', gap: '2.2rem', listStyle: 'none', margin: 0, padding: 0 }}>
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

        {/* Right Actions: Theme Toggle & Let's Connect Pill CTA */}
        <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(12px)',
              color: theme === 'dark' ? '#fbbf24' : '#a855f7',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <a
            href="mailto:contact@yashwanthprabhu.com"
            className="lets-connect-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 18px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(12px)',
              fontSize: '0.925rem',
              fontWeight: 500,
              color: '#ffffff',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            Let's Connect
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
        <button
          onClick={() => {
            if (toggleTheme) toggleTheme()
            setMobileOpen(false)
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '0.95rem',
            fontWeight: 500,
            cursor: 'pointer',
            padding: '12px 16px',
            textAlign: 'left'
          }}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </nav>
    </header>
  )
}
