export default function NowBuilding() {
  return (
    <section id="projects" className="now-building animate-fade-in-up animate-delay-2">
      <a
        href="#case-study/crea"
        className="project-card"
        id="now-building-card"
        aria-label="View current project: CREA : A Metal Decor"
      >
        <div className="project-card-image">
          <img
            src="/projects/crea.jpg"
            alt="CREA : A Metal Decor project screenshot"
            style={{ objectPosition: 'center 20%' }}
            loading="lazy"
          />
        </div>
        <div className="project-card-body">
          <p className="project-badge">Now Building</p>
          <h2 className="project-title">CREA : A Metal Decor</h2>
          <p className="project-desc">
            A bespoke e-commerce mobile application crafted for spiritual brass, bronze,
            and artisanal metal decor collections with devotional shopping journeys and festival subscriptions.
          </p>
        </div>
      </a>
    </section>
  )
}
