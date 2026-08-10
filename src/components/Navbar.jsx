import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'community', label: 'Community', href: '#community' },
  { id: 'talks', label: 'Talks', href: '#talks' },
  { id: 'travel', label: 'Travel', href: '#travel' },
]

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function LogoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 3.5c-2.2 0-4 1.8-4 4 0 2.2 1.8 4 4 4 2.2 0 4-1.8 4-4 0-2.2-1.8-4-4-4z" />
      <path d="M12 12.5c-2.2 0-4 1.8-4 4 0 2.2 1.8 4 4 4 2.2 0 4-1.8 4-4 0-2.2-1.8-4-4-4z" />
      <path d="M3.5 12c0-2.2 1.8-4 4-4 2.2 0 4 1.8 4 4 0 2.2-1.8 4-4 4-2.2 0-4-1.8-4-4z" />
      <path d="M12.5 12c0-2.2 1.8-4 4-4 2.2 0 4 1.8 4 4 0 2.2-1.8 4-4 4-2.2 0-4-1.8-4-4z" />
    </svg>
  )
}

export default function Navbar({ theme, toggleTheme, activeTab = 'about', onSelectTab }) {
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
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          <a
            href="#home"
            className="navbar-logo"
            aria-label="Home"
            onClick={(e) => handleNavClick(e, 'home')}
          >
            <LogoIcon />
          </a>

          <nav aria-label="Main navigation">
            <ul className="navbar-nav">
              {NAV_LINKS.map((link) => {
                const isActive = activeTab === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={isActive ? 'active' : ''}
                      onClick={(e) => handleNavClick(e, link.id)}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="navbar-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              id="theme-toggle-btn"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
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
      </div>
    </header>
  )
}
