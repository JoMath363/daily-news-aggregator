import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RequestProvider } from './Contexts/RequestContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RequestProvider>
      <App />
    </RequestProvider>
  </StrictMode>
)
