import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/main.css'
import { AssignmentProvider } from './context/AssignmentContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AssignmentProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </AssignmentProvider>
    </React.StrictMode>,
)
