import React from 'react'
import ReactDOM from 'react-dom/client'
import CustomRouter from './router/CustomRouter'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <CustomRouter/>
  </React.StrictMode>,
)

/// usecontext should pass state to custom router
