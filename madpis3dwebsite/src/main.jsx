import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Madpis3D from "./website_component.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Madpis3D />
  </StrictMode>,
)
