import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp.jsx'
import Home from './components/Home.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/signup" element={<SignUp></SignUp>}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)
