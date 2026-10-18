import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Community from './components/Community'
import Blogs from './components/Blogs'
import Hero from './components/Hero'
import Tools from './components/Tools'
import Footer from './components/Footer'
import CaseStudy from './components/CaseStudy'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  // Sync hash routing so URLs are shareable and back button works
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash.startsWith('case-study/')) {
        const projectId = hash.replace('case-study/', '')
        setSelectedProjectId(projectId)
        setActiveTab('projects')
      } else if (['home', 'about', 'projects', 'community', 'blogs'].includes(hash)) {
        setActiveTab(hash)
        setSelectedProjectId(null)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId)
    setActiveTab('projects')
    window.location.hash = `case-study/${projectId}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToProjects = () => {
    setSelectedProjectId(null)
    setActiveTab('projects')
    window.location.hash = 'projects'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectTab = (tab) => {
    setActiveTab(tab)
    setSelectedProjectId(null)
    window.location.hash = tab
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app" style={{ overflow: 'visible', minHeight: '100vh' }}>
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />
      <main className="main" style={{ overflow: 'visible', flex: 1 }}>
        <div
          className="container"
          style={{
            overflow: 'visible',
            maxWidth: selectedProjectId
              ? '960px'
              : activeTab === 'home'
              ? '100%'
              : '1200px',
            padding: selectedProjectId
              ? '0 16px'
              : activeTab === 'home'
              ? '0 5vw'
              : '0 24px',
          }}
        >
          {selectedProjectId ? (
            <CaseStudy
              projectId={selectedProjectId}
              onBack={handleBackToProjects}
              onSelectProject={handleSelectProject}
            />
          ) : (
            <>
              {activeTab === 'about' && <About />}
              {activeTab === 'projects' && (
                <Projects onSelectProject={handleSelectProject} />
              )}
              {activeTab === 'community' && <Community />}
              {activeTab === 'blogs' && <Blogs />}
              {activeTab === 'home' && (
                <>
                  <Hero />
                  <Tools />
                </>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
