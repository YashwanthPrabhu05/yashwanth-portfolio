import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'About', href: '#about', active: true },
  { label: 'Projects', href: '#projects', active: false },
  { label: 'Community', href: '#community', active: false },
  { label: 'Talks', href: '#talks', active: false },
  { label: 'Travel', href: '#travel', active: false },
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M4 6C4 4.343 5.343 3 7 3h10c1.657 0 3 1.343 3 3v12c0 1.657-1.343 3-3 3H7c-1.657 0-3-1.343-3-3V6z" />
      <path fill="white" d="M8 8h8M8 12h5M8 16h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-inner">
          <a href="#" className="navbar-logo" aria-label="Home">
            <LogoIcon />
          </a>

          <nav aria-label="Main navigation">
            <ul className="navbar-nav">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`${link.active ? 'active' : ''} ${link.accent ? 'active' : ''}`}
                    style={link.accent ? { color: 'var(--accent)' } : {}}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
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
              onClick={() => setMobileOpen(o => !o)}
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
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={link.active ? 'active' : ''}
              onClick={() => setMobileOpen(false)}
              style={link.accent ? { color: 'var(--accent)' } : {}}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
