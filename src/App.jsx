import React from 'react'
import Navbar from './components/navbar'
import Home from './components/Home'
import Skills from './components/Skills'
import AboutMe from './components/AboutMe'
import Noise from './components/Noise'

const App = () => {
  return (
    <>
    <Noise></Noise>
    <Home/>
    <AboutMe/>
    <Skills/>
    </>
  )
}

export default App
