import React, { useContext } from 'react'
import Home from './Pages/Home'
import BuyCredit from './Pages/BuyCredit'
import Result from './Pages/Result'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Login from './Components/Login'
import { AppContext } from './Context/AppContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const {showLogIn} = useContext(AppContext);

  return (
    <div className ='px-4 sm:px-10 md:px-14 lg:px-28
    min-h-screen bg-gradient-to-b from-teal-50 to-red-50'>
      <Navbar/>
      <ToastContainer position='bottom-right'/>
      {showLogIn && <Login/>}
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path='/result' element = {<Result/>}></Route>
        <Route path='/buy' element = {<BuyCredit/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
