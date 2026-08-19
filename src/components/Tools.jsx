import { useState } from 'react'

const TOOL_GROUPS = [
  {
    id: 'devices',
    items: [
      { id: 'mobile', label: 'Mobile', icon: '/tool_icons/mobile.svg' },
      { id: 'laptop', label: 'Desktop', icon: '/tool_icons/laptop.svg' },
      { id: 'watch', label: 'Watch', icon: '/tool_icons/watch.svg' }
    ]
  },
  {
    id: 'design_productivity',
    items: [
      { id: 'figma', label: 'Figma', icon: '/tool_icons/figma.svg' },
      { id: 'framer', label: 'Framer', icon: '/tool_icons/Framer.svg' },
      { id: 'notion', label: 'Notion', icon: '/tool_icons/notion.svg' },
      { id: 'claude', label: 'Claude', icon: '/tool_icons/claude.svg' },
      { id: 'chatgpt', label: 'ChatGPT', icon: '/tool_icons/chatgpt.svg' },
      { id: 'spotify', label: 'Spotify', icon: '/tool_icons/spotify.svg' }
    ]
  },
  {
    id: 'dev_motion',
    items: [
      { id: '3d', label: '3D & Motion', icon: '/tool_icons/3d.svg' },
      { id: 'vscode', label: 'VS Code', icon: '/tool_icons/vscode.svg' },
      { id: 'antigravity', label: 'Antigravity', icon: '/tool_icons/antigravity.svg' },
      { id: 'github', label: 'GitHub', icon: '/tool_icons/github.svg' }
    ]
  }
]

export default function Tools() {
  const [activeTooltip, setActiveTooltip] = useState(null)

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      marginTop: '3rem',
      marginBottom: '2rem',
      position: 'relative',
      zIndex: 20,
      pointerEvents: 'auto'
    }}>
      <div className="tool-dock" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 12px',
        background: 'rgba(18, 18, 20, 0.85)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
        maxWidth: '100%',
        overflowX: 'auto'
      }}>
        {TOOL_GROUPS.map((group, groupIdx) => (
          <div key={group.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            {/* Render items in this group */}
            {group.items.map((tool) => (
              <button
                key={tool.id}
                onMouseEnter={() => setActiveTooltip(tool.label)}
                onMouseLeave={() => setActiveTooltip(null)}
                aria-label={tool.label}
                style={{
                  position: 'relative',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: activeTooltip === tool.label ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                  border: activeTooltip === tool.label ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: activeTooltip === tool.label ? 'translateY(-3px)' : 'none'
                }}
              >
                <img
                  src={tool.icon}
                  alt={tool.label}
                  style={{
                    width: '20px',
                    height: '20px',
                    objectFit: 'contain',
                    filter: 'brightness(0.95)'
                  }}
                />
                {activeTooltip === tool.label && (
                  <span style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 10px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#141416',
                    color: '#ffffff',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.6)',
                    zIndex: 100
                  }}>
                    {tool.label}
                  </span>
                )}
              </button>
            ))}

            {/* Render vertical divider line between groups */}
            {groupIdx < TOOL_GROUPS.length - 1 && (
              <div style={{
                width: '1px',
                height: '22px',
                background: 'rgba(255, 255, 255, 0.15)',
                margin: '0 4px'
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
