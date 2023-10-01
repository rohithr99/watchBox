import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Watched from './components/pages/Watched'
import Watchlist from './components/pages/Watchlist'
import Navbar from './components/Navbar'
import View from './components/View'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full'>
      <Navbar></Navbar>
     <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/signup" element={<SignUp></SignUp>}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/watched" element={<Watched></Watched>}></Route>
      <Route path="/watchlist" element={<Watchlist></Watchlist>}></Route>
      <Route path="/view/:tmdbId" element={<View></View>}></Route>
    </Routes>
    </div>
  );
}

export default App
