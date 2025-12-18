import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopup/LoginPopUp'
import Navbar from './components/Navbar/Navbar'
import StickyCart from './components/Stickycart/StickyCart'
import Cart from './pages/Cart/Cart'
import Home from './pages/Home/Home'
import MyOrders from './pages/MyOrders/MyOrders'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Verify from './pages/Verify/Verify'
const App = () => {

  const[showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin ? <LoginPopUp setShowLogin={setShowLogin}/> : <></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>} />
      </Routes>
    </div>
    <StickyCart/>
    <Footer/>
    </>
  )
}

export default App
