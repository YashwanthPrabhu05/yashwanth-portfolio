import React, { useState, useEffect } from 'react'
import { CASE_STUDIES, getCaseStudyById } from '../data/caseStudies'

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="case-study-ext-icon">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

function VolumeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

function MaximizeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  )
}

// Lightweight Markdown-like formatter for bold, italic, and links with ↗ icon
function formatInline(text) {
  if (!text) return null
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*)/g
  const parts = text.split(regex)

  return parts.map((part, index) => {
    if (!part) return null

    // Link: [label](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
    if (linkMatch) {
      return (
        <a
          key={index}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="case-study-inline-link"
        >
          {linkMatch[1]}
          <ArrowUpRightIcon />
        </a>
      )
    }

    // Bold: **text**
    const boldMatch = part.match(/^\*\*(.*?)\*\*$/)
    if (boldMatch) {
      return (
        <strong key={index} className="case-study-bold">
          {boldMatch[1]}
        </strong>
      )
    }

    // Italic: *text*
    const italicMatch = part.match(/^\*(.*?)\*$/)
    if (italicMatch) {
      return (
        <em key={index} className="case-study-italic">
          {italicMatch[1]}
        </em>
      )
    }

    return part
  })
}

export default function CaseStudy({ projectId, onBack, onSelectProject }) {
  const caseStudy = getCaseStudyById(projectId)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Scroll to top on mount or when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [projectId])

  // Track page scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Simulate video playback on click
  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1.2
        })
      }, 200)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlay = () => setIsPlaying(!isPlaying)

  // Find next and previous projects for navigation
  const currentIndex = CASE_STUDIES.findIndex((c) => c.id === caseStudy.id)
  const nextProject = CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length]
  const prevProject =
    CASE_STUDIES[(currentIndex - 1 + CASE_STUDIES.length) % CASE_STUDIES.length]

  const { sections } = caseStudy

  return (
    <div className="case-study-native-wrapper animate-fade-in-up">
      {/* Top reading progress bar */}
      <div
        className="case-study-scroll-indicator"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <div className="case-study-container">
        {/* Navigation Topbar */}
        <header className="case-study-topbar">
          <button
            type="button"
            className="case-study-back-btn"
            onClick={onBack}
            id="back-to-projects-btn"
          >
            <ArrowLeftIcon />
            <span>Back to Projects</span>
          </button>

          <div className="case-study-top-breadcrumb">
            <span className="crumb-parent">Projects</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">{caseStudy.title}</span>
            <span className="crumb-badge">Case Study</span>
          </div>
        </header>

        {/* Hero Header */}
        <div className="case-study-hero-header">
          <h1 className="case-study-main-title">{caseStudy.title}</h1>

          <div className="case-study-meta-group">
            <p className="case-study-meta-line1">
              {caseStudy.company} · {caseStudy.year}
            </p>
            <p className="case-study-meta-line2">{caseStudy.role}</p>
          </div>

          <div className="case-study-pills-row">
            {caseStudy.tags.map((tag) => (
              <span key={tag} className="case-study-tag-pill">
                {tag}
              </span>
            ))}
          </div>

          <p className="case-study-hook-desc">{formatInline(caseStudy.summary)}</p>
        </div>

        {/* Hero Image in macOS Studio Frame */}
        {caseStudy.heroImage && (
          <div className="case-study-hero-frame">
            <div className="case-study-window-chrome">
              <div className="window-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="window-title">{caseStudy.title} · Studio Preview</div>
              <div className="window-actions" />
            </div>
            <div className="case-study-hero-img-wrap" style={{ background: caseStudy.id === 'crea' ? '#07070c' : '#000000' }}>
              <img
                src={caseStudy.heroImage}
                alt={caseStudy.heroAlt || caseStudy.title}
                className="case-study-hero-img"
                style={{
                  maxHeight: caseStudy.id === 'crea' ? '700px' : 'none',
                  objectFit: caseStudy.id === 'crea' ? 'contain' : 'cover',
                  margin: caseStudy.id === 'crea' ? '0 auto' : '0',
                }}
                loading="eager"
              />
            </div>
          </div>
        )}

        {/* Main Case Study Article Body */}
        <article className="case-study-article">
          {/* Overview Section */}
          {sections.overview && (
            <section className="case-study-section" id="overview">
              <h2 className="case-study-section-title">{sections.overview.title}</h2>
              <div className="case-study-section-body">
                {sections.overview.paragraphs.map((para, i) => (
                  <p key={i} className="case-study-p">
                    {formatInline(para)}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* The Problem Section */}
          {sections.theProblem && (
            <section className="case-study-section" id="the-problem">
              <h2 className="case-study-section-title">{sections.theProblem.title}</h2>
              {sections.theProblem.subtitle && (
                <div className="case-study-lead-callout">
                  <p className="case-study-lead-quote">{sections.theProblem.subtitle}</p>
                </div>
              )}
              <div className="case-study-section-body">
                {sections.theProblem.paragraphs.map((para, i) => (
                  <p key={i} className="case-study-p">
                    {formatInline(para)}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Why Build This & Comparison Table */}
          {sections.whyBuildThis && (
            <section className="case-study-section" id="why-build-this">
              <h2 className="case-study-section-title">{sections.whyBuildThis.title}</h2>
              <div className="case-study-section-body">
                {sections.whyBuildThis.paragraphs.map((para, i) => (
                  <p key={i} className="case-study-p">
                    {formatInline(para)}
                  </p>
                ))}

                {/* Comparison Table */}
                {sections.whyBuildThis.table && (
                  <div className="case-study-table-card">
                    <table className="case-study-table">
                      <thead>
                        <tr>
                          {sections.whyBuildThis.table.headers.map((h, i) => (
                            <th key={i}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sections.whyBuildThis.table.rows.map((row, idx) => (
                          <tr
                            key={idx}
                            className={
                              row.route === 'BABU' || row.route.includes('CREA')
                                ? 'highlight-row'
                                : ''
                            }
                          >
                            <td className="route-cell">
                              <strong>{row.route}</strong>
                            </td>
                            <td>{row.gives}</td>
                            <td>{row.doesNot}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {sections.whyBuildThis.footnote && (
                  <p className="case-study-p case-study-footnote">
                    {formatInline(sections.whyBuildThis.footnote)}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* What I Built Section */}
          {sections.whatIBuilt && (
            <section className="case-study-section" id="what-i-built">
              <h2 className="case-study-section-title">{sections.whatIBuilt.title}</h2>
              <div className="case-study-section-body">
                {sections.whatIBuilt.paragraphs.map((para, i) => (
                  <p key={i} className="case-study-p">
                    {formatInline(para)}
                  </p>
                ))}

                {sections.whatIBuilt.bullets && (
                  <ul className="case-study-bullets">
                    {sections.whatIBuilt.bullets.map((bullet, i) => (
                      <li key={i} className="case-study-bullet-item">
                        <span className="case-study-bullet-dot" />
                        <span>{formatInline(bullet)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {sections.whatIBuilt.outroParagraphs &&
                  sections.whatIBuilt.outroParagraphs.map((para, i) => (
                    <p key={i} className="case-study-p">
                      {formatInline(para)}
                    </p>
                  ))}
              </div>
            </section>
          )}

          {/* Video Demo Section */}
          {sections.videoDemo && (
            <section className="case-study-section case-study-media-section" id="video-demo">
              <div className="case-study-video-player-wrap">
                <div className="case-study-video-frame">
                  <div className="case-study-window-chrome">
                    <div className="window-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-yellow" />
                      <span className="dot dot-green" />
                    </div>
                    <div className="window-title">Demonstration · Bob & BABU Live Canvas Integration</div>
                    <div className="window-actions" />
                  </div>

                  <div className="video-media-container">
                    <img
                      src={sections.videoDemo.image}
                      alt="Demo player preview"
                      className="case-study-video-poster"
                    />

                    {/* Interactive video controls bar */}
                    <div className="video-player-overlay-bar">
                      <button
                        type="button"
                        className="video-ctrl-btn"
                        onClick={togglePlay}
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                      </button>

                      <span className="video-timecode">
                        {isPlaying
                          ? `0:${Math.floor(progress * 0.62).toString().padStart(2, '0')}`
                          : '0:00'}{' '}
                        / {sections.videoDemo.duration || '1:02'}
                      </span>

                      <div
                        className="video-timeline-track"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect()
                          const clickX = e.clientX - rect.left
                          setProgress((clickX / rect.width) * 100)
                        }}
                      >
                        <div className="video-timeline-fill" style={{ width: `${progress}%` }} />
                        <div className="video-timeline-thumb" style={{ left: `${progress}%` }} />
                      </div>

                      <div className="video-ctrl-right">
                        <button type="button" className="video-ctrl-btn" aria-label="Mute/Unmute">
                          <VolumeIcon />
                        </button>
                        <button type="button" className="video-ctrl-btn" aria-label="Fullscreen">
                          <MaximizeIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {sections.videoDemo.caption && (
                  <p className="case-study-caption">{sections.videoDemo.caption}</p>
                )}
              </div>
            </section>
          )}

          {/* Who It Is For Section */}
          {sections.whoItIsFor && (
            <section className="case-study-section" id="who-it-is-for">
              <h2 className="case-study-section-title">{sections.whoItIsFor.title}</h2>
              <div className="case-study-section-body">
                {sections.whoItIsFor.paragraphs.map((para, i) => (
                  <p key={i} className="case-study-p">
                    {formatInline(para)}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Key Outcomes / Metrics */}
          {sections.keyOutcomes && (
            <section className="case-study-section case-study-outcomes" id="outcomes">
              <h2 className="case-study-section-title">{sections.keyOutcomes.title}</h2>

              {sections.keyOutcomes.metrics && (
                <div className="case-study-metrics-grid">
                  {sections.keyOutcomes.metrics.map((metric, i) => (
                    <div key={i} className="case-study-metric-card">
                      <span className="metric-val">{metric.value}</span>
                      <span className="metric-lbl">{metric.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="case-study-section-body" style={{ marginTop: '20px' }}>
                {sections.keyOutcomes.paragraphs.map((para, i) => (
                  <p key={i} className="case-study-p">
                    {formatInline(para)}
                  </p>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Footer Navigation: Next / Prev Project */}
        <footer className="case-study-footer-nav">
          <button
            type="button"
            className="case-study-nav-btn prev"
            onClick={() => onSelectProject(prevProject.id)}
          >
            <span className="nav-dir">← Previous Project</span>
            <span className="nav-title">{prevProject.title}</span>
          </button>

          <button
            type="button"
            className="case-study-nav-btn next"
            onClick={() => onSelectProject(nextProject.id)}
          >
            <span className="nav-dir">Next Project →</span>
            <span className="nav-title">{nextProject.title}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
