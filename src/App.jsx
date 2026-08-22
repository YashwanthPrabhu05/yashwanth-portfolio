import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Hero from './components/Hero'
import Tools from './components/Tools'
import Footer from './components/Footer'

export default function App() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored
    return 'dark'
  })

  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <div className="app" style={{ overflow: 'visible', minHeight: '100vh' }}>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />
      <main className="main" style={{ overflow: 'visible', flex: 1 }}>
        <div className="container" style={{ overflow: 'visible', maxWidth: activeTab === 'home' ? '100%' : '1200px', padding: activeTab === 'home' ? '0 5vw' : '0 24px' }}>
          {activeTab === 'about' && <About />}
          {activeTab === 'projects' && <Projects />}
          {activeTab === 'home' && (
            <>
              <Hero />
              <Tools />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
