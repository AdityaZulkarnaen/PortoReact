import Navbar from './components/Navbar.jsx'
import Noise from './components/Noise.jsx'
import Hero from './modules/hero'
import AboutMe from './modules/about-me/index.jsx'
import Skills from './modules/skill/index.jsx'
import Projects from './modules/projects/index.jsx'
import Experience from './modules/experience/index.jsx'
import Contact from './modules/contact/index.jsx'

const App = () => {
  return (
    <>
    <Noise></Noise>
    <Navbar></Navbar>
    <div id="home"><Hero/></div>
    <div id="skills"><Skills/></div>
    <div id="projects"><Projects/></div>
    <div id="experience"><Experience/></div>
    <div id="contact"><Contact/></div>
    </>
  )
}

export default App