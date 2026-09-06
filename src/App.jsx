import { useState } from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Projects from './components/Projects'
import Community from './components/Community'
import Blogs from './components/Blogs'
import Hero from './components/Hero'
import Tools from './components/Tools'
import Footer from './components/Footer'

export default function App() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <div className="app" style={{ overflow: 'visible', minHeight: '100vh' }}>
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />
      <main className="main" style={{ overflow: 'visible', flex: 1 }}>
        <div className="container" style={{ overflow: 'visible', maxWidth: activeTab === 'home' ? '100%' : '1200px', padding: activeTab === 'home' ? '0 5vw' : '0 24px' }}>
          {activeTab === 'about' && <About />}
          {activeTab === 'projects' && <Projects />}
          {activeTab === 'community' && <Community />}
          {activeTab === 'blogs' && <Blogs />}
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
