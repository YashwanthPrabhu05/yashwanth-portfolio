export default function NowBuilding() {
  return (
    <section id="projects" className="now-building animate-fade-in-up animate-delay-2">
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="project-card"
        id="now-building-card"
        aria-label="View current project: DesignMode"
      >
        <div className="project-card-image">
          <img
            src="/project.png"
            alt="DesignMode project screenshot"
            loading="lazy"
          />
        </div>
        <div className="project-card-body">
          <p className="project-badge">Now Building</p>
          <h2 className="project-title">DesignMode</h2>
          <p className="project-desc">
            Edit layout, typography, colour, spacing, copy and DOM with real
            controls, then ship the diff to{' '}
            <span onClick={e => e.preventDefault()} style={{ pointerEvents: 'none' }}>
              <a href="#">Claude Code</a>
            </span>
            , Codex, Cursor,{' '}
            <span onClick={e => e.preventDefault()} style={{ pointerEvents: 'none' }}>
              <a href="#">Windsurf</a>
            </span>
            , or any MCP-compatible AI coding agent.
          </p>
        </div>
      </a>
    </section>
  )
}
