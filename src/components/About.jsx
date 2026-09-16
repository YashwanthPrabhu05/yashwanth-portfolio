import React from 'react'

const GALLERY_ITEMS = [
  {
    id: 'first-computer',
    src: '/about/my_first_computer.jpg',
    alt: 'My first computer',
    caption: 'My first computer',
    objectPosition: 'center center',
  },
  {
    id: 'design-collaboration',
    src: '/about/design_collaboration.jpg',
    alt: 'Collaborating on design & tech',
    caption: 'Collaborating on design & tech',
    objectPosition: 'center 25%',
  },
  {
    id: 'badminton-game',
    src: '/about/badminton_game.jpg',
    alt: 'Off-hours badminton',
    caption: 'Off-hours badminton',
    objectPosition: 'center center',
  },
  {
    id: 'motorola-phone',
    src: '/about/my_first_motorola_phone.png',
    alt: 'My first Motorola phone',
    caption: 'My first Motorola phone',
    objectPosition: 'center center',
  },
]

export default function About() {
  return (
    <section className="about-section animate-fade-in-up" id="about-content">
      <div className="about-header">
        <h1 className="about-title">About Yashwanth Prabhu</h1>
      </div>

      <div className="about-content-body">
        <p className="about-paragraph">
          I didn’t choose design all at once. I found my way into it.
        </p>

        <p className="about-paragraph">
          I’m Yashwanth Prabhu, a UI/UX designer who enjoys turning ideas into digital experiences that feel simple, thoughtful, and purposeful.
        </p>

        <p className="about-paragraph">
          Coming from a Computer Science background, I was introduced to the technical side of building software. But somewhere along the way, I realized that I was much more interested in what people see, feel, and experience when they use a product than in writing the code behind it.
        </p>

        <p className="about-paragraph">
          That curiosity pushed me into UI/UX design. I started learning through online courses, experimenting with Figma, studying products I use every day, and recreating interfaces just to understand why certain designs work better than others.
        </p>

        <p className="about-paragraph">
          Over time, design became more than something I was learning—it became something I genuinely enjoyed doing.
        </p>

        <div className="about-gallery">
          <div className="about-gallery-grid">
            {GALLERY_ITEMS.map((item) => (
              <figure key={item.id} className="about-gallery-item">
                <div className="about-gallery-img-wrapper">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="about-gallery-img"
                    style={{ objectPosition: item.objectPosition || 'center center' }}
                    loading="eager"
                  />
                  <div className="about-gallery-overlay" />
                </div>
                <figcaption className="about-gallery-caption">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="about-paragraph">
          Today, I work across user flows, wireframes, visual design, prototypes, design systems, and product experiences. I also enjoy exploring AI-assisted design and no-code tools because they allow me to move quickly from an idea to something tangible and testable.
        </p>

        <p className="about-paragraph">
          I’ve designed everything from mobile app experiences and e-commerce platforms to technology websites and social-impact concepts. Some projects started as simple experiments; others challenged me to think deeply about users, business goals, and real-world problems.
        </p>

        <p className="about-paragraph">
          Along the way, I’ve participated in design and technology events, worked on collaborative projects, explored different creative tools, and even experimented with combining AI + design to create things I wouldn’t have thought possible when I started.
        </p>

        <p className="about-paragraph">
          But I’m still learning.
        </p>

        <p className="about-paragraph">
          I don’t see design as something you eventually “master.” There is always another product to understand, another problem to solve, another interaction to rethink, and another idea worth exploring.
        </p>

        <p className="about-paragraph">
          I’m here to keep designing, experimenting, and turning curiosity into things people can actually use.
        </p>
      </div>
    </section>
  )
}
