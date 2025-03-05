import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Noise from './components/Noise.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Noise/>
    <App />
  </StrictMode>,
)
