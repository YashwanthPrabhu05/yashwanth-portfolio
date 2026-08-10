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

const PROJECTS_DATA = [
  {
    id: 'infrax',
    title: 'InfraX',
    isLocked: true,
    year: '2026',
    tags: ['Enterprise', 'Agentic AI', 'IBM'],
    description:
      'Bringing agentic AI to how enterprise teams provision and manage infrastructure at scale.',
    image: '/projects/infrax.png',
    alt: 'InfraX server infrastructure',
  },
  {
    id: 'designmode',
    title: 'DesignMode',
    isLocked: false,
    year: '2026',
    tags: ['AI tooling', 'Open source', 'Live'],
    description:
      'Your Figma properties panel on any live website, every change becomes a brief your coding age...',
    image: '/projects/designmode.png',
    alt: 'DesignMode browser inspector interface',
  },
  {
    id: 'dispatcher-assistant',
    title: 'Dispatcher Assistant',
    isLocked: false,
    year: '2026',
    tags: ['AI orchestration', 'Personal system'],
    description: 'A Notion custom agent that takes an idea off a...',
    image: '/projects/dispatcher.svg',
    alt: 'Dispatcher Assistant workflow automation',
  },
  {
    id: 'replan',
    title: 'Replan',
    isLocked: false,
    year: '2026',
    tags: ['Consumer mobile', 'AI', 'Design exercise'],
    description: 'A consumer mobile travel planner that fixes the...',
    image: '/projects/replan.svg',
    alt: 'Replan travel planner map',
  },
]

export default function Projects() {
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
          <article key={project.id} className="project-card-v2">
            <div className="project-card-v2-img-wrapper">
              <img
                src={project.image}
                alt={project.alt}
                className="project-card-v2-img"
                loading="eager"
              />
            </div>

            <div className="project-card-v2-body">
              <div className="project-card-v2-header">
                <h2 className="project-card-v2-title">
                  {project.title}
                  {project.isLocked && <LockIcon />}
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
