import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Menus from './pages/Menus';
import Register from './pages/Authentication/Register';
import About from './pages/About';
import Profile from './pages/Profile';
import OrdersProfile from './pages/Profile/OrdersProfile';
import Dishes from './pages/Dishes';
import CreateDish from './pages/CreateDish';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/menus' element={<Menus/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/profile/orders' element={<OrdersProfile/>}/>

      <Route path='/dashboard' element={<OrdersProfile/>}/>
      <Route path='/dishes' element={<Dishes/>}/>
      <Route path='/dishes/edit/:id' element={<CreateDish/>}/>
      <Route path='/orders' element={<OrdersProfile/>}/>
      <Route path='/inventory' element={<OrdersProfile/>}/>

    </Routes>
  );
}

export default App;
