import React from 'react'
import Navbar from './components/navbar'
import Home from './components/Home'
import Skills from './components/Skills'
import AboutMe from './components/AboutMe'
import Noise from './components/Noise'
import Projects from './components/Projects'
import Experience from './components/Experience'

const App = () => {
  return (
    <>
    <Noise></Noise>
    <Navbar></Navbar>
    <Home/>
    <Skills/>
    <Projects/>
    <Experience/>
    </>
  )
}

export default App
