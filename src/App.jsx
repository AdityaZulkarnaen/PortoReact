import React from 'react'
import Navbar from './components/navbar'
import Home from './components/Home'
import Skills from './components/Skills'
import AboutMe from './components/AboutMe'
import Noise from './components/Noise'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

const App = () => {
  return (
    <>
    <Noise></Noise>
    <Navbar></Navbar>
    <div id="home"><Home/></div>
    <div id="skills"><Skills/></div>
    <div id="projects"><Projects/></div>
    <div id="experience"><Experience/></div>
    <div id="contact"><Contact/></div>
    </>
  )
}

export default App