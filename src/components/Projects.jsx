import React from 'react'

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="project-lock-icon"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function ArrowUpRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="project-arrow-icon"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

const PROJECTS_DATA = [
  {
    id: 'crea',
    aliasId: 'designmode',
    title: 'CREA : A Metal Decor',
    isLocked: false,
    year: '2026',
    tags: ['Mobile UX', 'E-Commerce', 'Bespoke'],
    description:
      'A bespoke e-commerce mobile application crafted for spiritual brass, bronze, and artisanal metal decor collections with divine journeys and festival subscriptions.',
    image: '/projects/crea.jpg',
    alt: 'CREA : A Metal Decor Luxury Mobile App',
  },
  {
    id: 'dispatcher-assistant',
    aliasId: 'exam-ai',
    title: 'Exam AI',
    isLocked: false,
    year: '2026',
    tags: ['AI orchestration', 'Personal system', 'Productivity'],
    description:
      'A Notion custom agent that takes ideas and syllabi off the page, orchestrating automated spaced-repetition and active-recall systems.',
    image: '/projects/dispatcher.svg',
    alt: 'Exam AI Dispatcher Assistant workflow automation',
  },
  {
    id: 'sripuram-one',
    aliasId: 'replan',
    title: 'Sripuram ONE - Mobile App',
    isLocked: false,
    year: '2026',
    tags: ['Mobile App', 'Devotional', 'Community'],
    description:
      'An all-in-one devotional mobile application designed for devotees to book poojas, watch live darshan streams, and track spiritual festival calendars.',
    image: '/projects/sripuram_one.jpg',
    alt: 'Sripuram ONE Devotional Mobile App',
  },
  {
    id: 'catalysthub',
    aliasId: 'infrax',
    title: 'Catalysthub - Interior Design Company Website Design',
    isLocked: false,
    year: '2026',
    tags: ['Web Design', 'Interior Studio', 'Full-Funnel Marketing'],
    description:
      'Website and full-funnel marketing for an interior design studio, showcasing serene spaces and bespoke residences where comfort meets quiet luxury.',
    image: '/projects/catalysthub.jpg',
    alt: 'Catalysthub Interior Design Studio Website and Marketing',
  },
]

export default function Projects({ onSelectProject }) {
  return (
    <section className="projects-section animate-fade-in-up" id="projects-content">
      <div className="projects-header">
        <h1 className="projects-title">Projects</h1>
        <p className="projects-subtitle">
          Case studies from the products I design and build in code, and the tools I've made along the way.
        </p>
      </div>

      <div className="projects-grid">
        {PROJECTS_DATA.map((project) => (
          <article
            key={project.id}
            className="project-card-v2 interactive"
            onClick={() => onSelectProject?.(project.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectProject?.(project.id)
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View case study for ${project.title}`}
          >
            <div className="project-card-v2-img-wrapper">
              <img
                src={project.image}
                alt={project.alt}
                className="project-card-v2-img"
                style={{ objectPosition: project.id === 'crea' ? 'center 25%' : 'center' }}
                loading="eager"
              />
              <div className="project-card-overlay-badge">
                <span>View Case Study</span>
                <ArrowUpRightIcon />
              </div>
            </div>

            <div className="project-card-v2-body">
              <div className="project-card-v2-header">
                <h2 className="project-card-v2-title">
                  {project.title}
                  {project.isLocked ? <LockIcon /> : <ArrowUpRightIcon />}
                </h2>
                <span className="project-card-v2-year">{project.year}</span>
              </div>

              <div className="project-card-v2-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="project-card-v2-desc">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
