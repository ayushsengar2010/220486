import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserTable from './Pages/Topusers.jsx'
import { BrowserRouter as Router,Routes,Route } from 'react-router'
// Top 5 users

//Trending Posts
// Feed

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<UserTable />} />
    </Routes>
  </Router>
)
