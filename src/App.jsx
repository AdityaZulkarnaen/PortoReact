import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './admin/components/ProtectedRoute'
import AdminLogin from './admin/pages/AdminLogin'
import AdminDashboard from './admin/pages/AdminDashboard'
import ProjectsManager from './admin/pages/ProjectsManager'
import ExperienceManager from './admin/pages/ExperienceManager'
import SkillsManager from './admin/pages/SkillsManager'
import Navbar from './components/Navbar.jsx'
import Noise from './components/Noise.jsx'
import Hero from './modules/hero'
import AboutMe from './modules/about-me/index.jsx'
import Skills from './modules/skill/index.jsx'
import Projects from './modules/projects/index.jsx'
import Experience from './modules/experience/index.jsx'
import Contact from './modules/contact/index.jsx'

const Portfolio = () => {
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

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public portfolio routes */}
          <Route path="/" element={<Portfolio />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/projects" element={
            <ProtectedRoute>
              <ProjectsManager />
            </ProtectedRoute>
          } />
          <Route path="/admin/experience" element={
            <ProtectedRoute>
              <ExperienceManager />
            </ProtectedRoute>
          } />
          <Route path="/admin/skills" element={
            <ProtectedRoute>
              <SkillsManager />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App