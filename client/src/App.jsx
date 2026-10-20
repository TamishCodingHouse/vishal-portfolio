import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Philosophy from './components/Philosophy'
import Highlights from './components/Highlights'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Assistant from './components/Assistant'

export default function App() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <>
      <Navbar onChatOpen={() => setChatOpen(true)} />

      <main>
        <Hero />
        <About />
        <Highlights />
        <Skills />
        <Projects />
        <Experience />
        <Philosophy />
        <Contact />
      </main>

      <Footer />

      <Assistant isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  )
}
