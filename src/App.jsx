import React from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Skills from './components/Skills.jsx'
import AboutMe from './components/AboutMe.jsx'
import Noise from './components/Noise.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'

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