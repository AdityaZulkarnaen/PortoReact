import React from 'react'
import Navbar from './components/navbar'
import Home from './components/Home'
import Skills from './components/Skills'
import AboutMe from './components/AboutMe'
import Noise from './components/Noise'
import Projects from './components/Projects'

const App = () => {
  return (
    <>
    <Noise></Noise>
    <Home/>
    <Skills/>
    <Projects/>
    </>
  )
}

export default App
