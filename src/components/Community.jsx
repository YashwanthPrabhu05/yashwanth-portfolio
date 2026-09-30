import React from 'react'

const BADGES = [
  {
    id: 'member',
    label: 'Member',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
]

const COMMUNITIES = [
  {
    id: 'figma-chennai',
    name: 'Friends of Figma Chennai',
    description: "Local chapter of the global Figma community — I'm a member here, attending design events and workshops.",
    href: 'https://friends.figma.com/chennai/',
    icon: '/community/friends-of-figma-chennai.png',
  },
  {
    id: 'claude-design-meetup',
    name: 'Claude Design Meetup — Kissflow Studio',
    description: 'A meetup exploring AI-powered design and product workflows, hosted by Kissflow Studio in Chennai.',
    href: 'https://kissflow.com',
    icon: '/community/claude-design-meetup-kissflow.png',
  },
]

const GALLERY_PHOTOS = [
  {
    id: 'make-with-figma',
    src: '/community/make_with_figma_chennai.jpg',
    caption: 'Make with Figma — Friends of Figma Chennai',
    objectPosition: 'center top',
  },
  {
    id: 'fof-banner',
    src: '/community/friends_of_figma_banner.png',
    caption: 'Friends of Figma Chennai event',
    objectPosition: 'center top',
  },
  {
    id: 'claude-meetup-group',
    src: '/community/community_meetup_group_1.jpg',
    caption: 'Claude Design Meetup hosted by Kissflow Studio',
  },
  {
    id: 'fof-meetup-group',
    src: '/community/community_meetup_group_2.jpg',
    caption: 'Friends of Figma Chennai community gathering',
  },
  {
    id: 'community-speaking',
    src: '/community/community_speaking.png',
    caption: 'Q&A session at local design meetup',
  },
  {
    id: 'community-workshop',
    src: '/community/community_workshop.jpg',
    caption: 'Interactive design workshop & networking',
  },
]

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
      className="community-link-icon"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

export default function Community() {
  return (
    <section className="community-section animate-fade-in-up" id="community">
      <div className="community-container">
        {/* Title */}
        <h1 className="community-title">Community</h1>

        {/* Intro Paragraphs */}
        <div className="community-intro">
          <p>
            Community is where I learn and connect. I'm a member of Friends of Figma, Chennai, where I show up for local meetups, design events, and workshops with other designers in the city.
          </p>
          <p>
            I've also attended the Claude Design Meetup hosted by Kissflow Studio, diving into conversations around AI-native design and tooling.
          </p>
        </div>

        {/* Role Badges */}
        <div className="community-badges">
          {BADGES.map((badge) => (
            <div key={badge.id} className="community-badge">
              <span className="community-badge-icon">{badge.icon}</span>
              <span className="community-badge-label">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Communities Section */}
        <div className="community-list-section">
          <h2 className="community-subtitle">Communities</h2>

          <div className="community-list">
            {COMMUNITIES.map((comm) => (
              <div key={comm.id} className="community-item">
                <div className="community-item-icon-box">
                  {typeof comm.icon === 'string' ? (
                    <img src={comm.icon} alt={comm.name} className="community-item-icon" />
                  ) : (
                    comm.icon
                  )}
                </div>
                <div className="community-item-content">
                  <a
                    href={comm.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="community-item-title"
                  >
                    {comm.name}
                    <ArrowUpRightIcon />
                  </a>
                  <p className="community-item-desc">{comm.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="community-gallery-section">
          <div className="community-gallery-grid">
            {GALLERY_PHOTOS.map((photo) => (
              <figure key={photo.id} className="community-gallery-item">
                <div className="community-gallery-img-wrapper">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="community-gallery-img"
                    style={{ objectPosition: photo.objectPosition || 'center' }}
                    loading="lazy"
                  />
                </div>
                <figcaption className="community-gallery-caption">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
