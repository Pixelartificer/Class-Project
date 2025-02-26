import database from '../Database/Firebase.config.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Index from './assets/Pages/Index.jsx'
import { ToastContainer, toast } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer />
    <App />
    <Index />
  </StrictMode>,
)
