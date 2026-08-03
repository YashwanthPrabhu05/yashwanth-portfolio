import { useState } from 'react'

function TerminalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/>
      <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('curl https://yourportfolio.dev')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="about" className="hero animate-fade-in-up">
      <div className="hero-header">
        <h1 className="hero-name">Your Name Here</h1>
        <p className="hero-role">
          Design engineer<span className="hero-role-dot">·</span>Systemist
        </p>
      </div>

      <div className="hero-body">
        <div className="hero-photo-wrapper">
          <img
            src="/profile.png"
            alt="Profile photo"
            className="hero-photo"
            loading="eager"
          />
        </div>

        <div className="hero-content">
          <p className="hero-bio">
            I design in code, and ship{' '}
            <a href="#projects">small tools</a> on the side — mostly
            free and open source. I{' '}
            <a href="#about">design interfaces</a> and{' '}
            <a href="#about">systems</a> to save time: mine, and the
            time of the people who use what I make. It&rsquo;s the metric I
            care about most —{' '}
            <strong>good design quietly hands people their time back</strong>,
            and time is a <a href="#about">non-fungible commodity</a>.
          </p>

          <div className="curl-block" role="code" aria-label="curl command">
            <div className="curl-icon">
              <TerminalIcon />
              <span className="curl-command">
                <span>curl</span>
                https://yourportfolio.dev
              </span>
            </div>
            <button
              className={`curl-copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              aria-label="Copy curl command"
              id="curl-copy-btn"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              {copied ? 'copied!' : 'copy'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
