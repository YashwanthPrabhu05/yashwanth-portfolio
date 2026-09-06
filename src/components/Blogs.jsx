import React, { useState } from 'react'

function ArrowUpRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="blogs-link-icon"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function BookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function TimerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

const FEATURED_STORY = {
  id: 'featured-designmode',
  title: 'Building DesignMode: Merging Live DOM with AI Agents',
  subtitle:
    'How turning any live website into an editable canvas and streaming diffs into AI coding tools revolutionizes product design loops.',
  date: 'Dec 2025',
  readTime: '6 min read',
  image: '/blogs/featured_designmode.jpg',
  category: 'AI Tooling',
  tags: ['AI Tooling', 'DOM', 'System Architecture', 'Design Engineering'],
  href: 'https://designmode.app/?ref=yashwanthprabhu.com',
}

const BLOG_ARTICLES = [
  {
    id: 'modular-components',
    title: 'Designing Modular Component Libraries',
    subtitle:
      'Architecting scalable design tokens, flexible compound components, and resilient UI architectures that stay clean across growing engineering teams.',
    date: 'Nov 2025',
    readTime: '7 min read',
    image: '/blogs/modular_components.jpg',
    category: 'Design Systems',
    tags: ['Design Systems', 'React', 'Tokens'],
    href: '#',
  },
  {
    id: 'ai-prototyping',
    title: 'The Future of AI-Powered Prototyping',
    subtitle:
      'Moving past static click-throughs: orchestrating multi-agent LLM systems directly into interactive UI sandboxes in real time.',
    date: 'Oct 2025',
    readTime: '5 min read',
    image: '/blogs/ai_prototyping.jpg',
    category: 'AI Tooling',
    tags: ['AI Tooling', 'Agents', 'Figma'],
    href: '#',
  },
  {
    id: 'design-to-code',
    title: 'Closing the Gap: Optimizing Design-to-Code Workflows',
    subtitle:
      'Techniques and automated pipelines for bi-directional synchronization between Figma design tokens and production React codebases.',
    date: 'Sep 2025',
    readTime: '6 min read',
    image: '/blogs/design_to_code.jpg',
    category: 'Design Systems',
    tags: ['Workflow', 'Frontend', 'Figma'],
    href: '#',
  },
  {
    id: 'productivity-systems',
    title: 'Architecting a Digital Second Brain in Notion',
    subtitle:
      'Designing personal knowledge workflows, automated task matrices, and project hubs that respect deep focus and eliminate mental overhead.',
    date: 'Aug 2025',
    readTime: '4 min read',
    image: '/blogs/productivity_systems.jpg',
    category: 'Productivity',
    tags: ['Productivity', 'Notion', 'Systems'],
    href: '#',
  },
]

const FEATURED_HANDBOOKS = [
  {
    title: 'Design Systems Playbook',
    href: 'https://notion.so',
    icon: <BookIcon />,
  },
  {
    title: 'Second Brain Operating Manual',
    href: 'https://notion.so',
    icon: <TimerIcon />,
  },
]

const CATEGORIES = ['All', 'AI Tooling', 'Design Systems', 'Productivity']

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredArticles =
    activeCategory === 'All'
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter((article) => article.category === activeCategory)

  return (
    <section className="blogs-section animate-fade-in-up" id="blogs">
      <div className="blogs-container">
        {/* Header */}
        <div className="blogs-header">
          <h1 className="blogs-title">Blogs & Essays</h1>
          <p className="blogs-subtitle">
            Writings on design engineering, AI agents, interface systems, and productivity tools.
          </p>
        </div>

        {/* Handbooks / Manuals Pills (Inspired by sandeepbaskaran.com) */}
        <div className="blogs-handbooks-row">
          {FEATURED_HANDBOOKS.map((handbook) => (
            <a
              key={handbook.title}
              href={handbook.href}
              target="_blank"
              rel="noopener noreferrer"
              className="blogs-handbook-pill"
            >
              <span className="blogs-handbook-icon">{handbook.icon}</span>
              <span>{handbook.title}</span>
              <ArrowUpRightIcon />
            </a>
          ))}
        </div>

        {/* Hero Featured Story */}
        <div className="blogs-featured-card">
          <div className="blogs-featured-img-wrap">
            <img
              src={FEATURED_STORY.image}
              alt={FEATURED_STORY.title}
              className="blogs-featured-img"
              loading="eager"
            />
            <div className="blogs-featured-badge">
              <StarIcon />
              <span>Featured Story</span>
            </div>
          </div>

          <div className="blogs-featured-content">
            <div className="blogs-meta-row">
              <span className="blogs-meta-pill">{FEATURED_STORY.category}</span>
              <span className="blogs-meta-dot">·</span>
              <span className="blogs-meta-date">{FEATURED_STORY.date}</span>
              <span className="blogs-meta-dot">·</span>
              <span className="blogs-meta-readtime">{FEATURED_STORY.readTime}</span>
            </div>

            <h2 className="blogs-featured-title">
              <a
                href={FEATURED_STORY.href}
                target="_blank"
                rel="noopener noreferrer"
                className="blogs-featured-link"
              >
                {FEATURED_STORY.title}
                <ArrowUpRightIcon />
              </a>
            </h2>

            <p className="blogs-featured-desc">{FEATURED_STORY.subtitle}</p>

            <div className="blogs-tags-row">
              {FEATURED_STORY.tags.map((tag) => (
                <span key={tag} className="blogs-tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="blogs-filters-row">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`blogs-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="blogs-grid">
          {filteredArticles.map((article) => (
            <article key={article.id} className="blogs-card">
              <div className="blogs-card-img-wrap">
                <img
                  src={article.image}
                  alt={article.title}
                  className="blogs-card-img"
                  loading="lazy"
                />
                <span className="blogs-card-category-badge">{article.category}</span>
              </div>

              <div className="blogs-card-body">
                <div className="blogs-meta-row">
                  <span className="blogs-meta-date">{article.date}</span>
                  <span className="blogs-meta-dot">·</span>
                  <span className="blogs-meta-readtime">{article.readTime}</span>
                </div>

                <h3 className="blogs-card-title">
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blogs-card-link"
                  >
                    {article.title}
                    <ArrowUpRightIcon />
                  </a>
                </h3>

                <p className="blogs-card-desc">{article.subtitle}</p>

                <div className="blogs-tags-row">
                  {article.tags.map((tag) => (
                    <span key={tag} className="blogs-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
