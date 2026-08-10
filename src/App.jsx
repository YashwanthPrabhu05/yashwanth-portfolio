import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Hero from './components/Hero'
import NowBuilding from './components/NowBuilding'
import Tools from './components/Tools'
import Footer from './components/Footer'

export default function App() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [activeTab, setActiveTab] = useState('projects')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <div className="app">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />
      <main className="main">
        <div className="container">
          {activeTab === 'about' && <About />}
          {activeTab === 'projects' && <Projects />}
          {activeTab !== 'about' && activeTab !== 'projects' && (
            <>
              <Hero />
              <NowBuilding />
              <Tools />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
