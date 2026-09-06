import React from 'react'

const BADGES = [
  {
    id: 'user-group-leader',
    label: 'User Group Leader',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'community-ambassador',
    label: 'Community Ambassador',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.394-.746c.28 0 .466.187.373.466l-.746 3.078c-.093.373-.373.56-.746.56l-1.306-.093v10.073c0 1.213-.653 1.865-1.959 1.959l-11.488.746c-.746.093-1.213-.28-1.213-1.026V5.42c0-.56.373-.933.87-1.121zm2.332 3.171v10.632l2.985-.187v-5.223l2.891 5.036 3.731-.28V6.913l-2.705.187v4.85l-2.705-4.85-4.197.28z" />
      </svg>
    ),
  },
  {
    id: 'ambassador',
    label: 'Ambassador',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </svg>
    ),
  },
]

const COMMUNITIES = [
  {
    id: 'figma-chennai',
    name: 'Friends of Figma Chennai',
    description: 'Local chapter of the global Figma community, hosting design events and workshops.',
    href: 'https://friends.figma.com/chennai/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#0ACF83" />
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#1ABCFE" />
        <path d="M0 28.5C0 23.2533 4.25329 19 9.5 19H19V38H9.5C4.25329 38 0 33.7467 0 28.5Z" fill="#EA4C89" />
        <path d="M0 9.5C0 4.25329 4.25329 0 9.5 0H19V19H9.5C4.25329 19 0 14.7467 0 9.5Z" fill="#F24E1E" />
        <path d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262" />
      </svg>
    ),
  },
  {
    id: 'notion-chennai',
    name: 'Notion Chennai',
    description: "Chennai's Notion enthusiasts sharing templates, workflows, and productivity hacks.",
    href: 'https://www.notion.so/community',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l11.394-.746c.28 0 .466.187.373.466l-.746 3.078c-.093.373-.373.56-.746.56l-1.306-.093v10.073c0 1.213-.653 1.865-1.959 1.959l-11.488.746c-.746.093-1.213-.28-1.213-1.026V5.42c0-.56.373-.933.87-1.121zm2.332 3.171v10.632l2.985-.187v-5.223l2.891 5.036 3.731-.28V6.913l-2.705.187v4.85l-2.705-4.85-4.197.28z" />
      </svg>
    ),
  },
  {
    id: 'chennai-design',
    name: 'Chennai Design',
    description: 'A grassroots community for designers in Chennai to connect, learn, and grow together.',
    href: 'https://twitter.com/chennaidesign',
    icon: (
      <div className="chennai-design-icon-box">
        c
      </div>
    ),
  },
  {
    id: 'raycast-bengaluru',
    name: 'Raycast Bengaluru',
    description: 'Power users and developers exploring Raycast extensions and automation.',
    href: 'https://www.raycast.com/community',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="6" fill="#FF6363" />
        <path d="M6 12L12 6L18 12L12 18L6 12Z" fill="#FFFFFF" />
        <path d="M12 9L15 12L12 15L9 12L12 9Z" fill="#FF6363" />
      </svg>
    ),
  },
]

const GALLERY_PHOTOS = [
  {
    id: 'figma-sf',
    src: '/community/figma_sf_tour.jpg',
    caption: 'Figma SF office tour 2024',
  },
  {
    id: 'config-leads',
    src: '/community/figma_leads_config.jpg',
    caption: 'With Friends of Figma Leads at Config 2025',
  },
  {
    id: 'figma-india',
    src: '/community/figma_india_launch.jpg',
    caption: 'Figma India office launch',
  },
  {
    id: 'notion-ambassadors',
    src: '/community/notion_ambassadors.jpg',
    caption: 'With Notion Ambassadors and Ivan Zhao',
  },
  {
    id: 'akshay-kothari',
    src: '/community/akshay_kothari.jpg',
    caption: 'Akshay Kothari, COO Notion',
  },
  {
    id: 'mwn-2025',
    src: '/community/mwn_2025.jpg',
    caption: 'MWN 2025 Ambassadors group',
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
            Community is how I give back. What started as showing up to local meetups turned into leading them. Today I help run chapters around Figma, Notion, Raycast, and design and productivity across Chennai and Bengaluru, and host free meetups every quarter.
          </p>
          <p>
            I've also mentored a number of early-career designers into their first jobs, something I find as rewarding as the work itself. If that sounds helpful,{' '}
            <a
              href="https://topmate.io/yashwanthprabhu"
              target="_blank"
              rel="noopener noreferrer"
              className="community-topmate-link"
            >
              book a call on Topmate
              <ArrowUpRightIcon />
            </a>
            .
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
                  {comm.icon}
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
