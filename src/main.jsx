import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import AiDemoPage from './components/AiDemoPage'
import './styles.css'

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {currentPath === '/demo-ai' ? <AiDemoPage /> : <App />}
    </React.StrictMode>
)
