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
import CreateDish from './pages/Dishes/CreateDish';
import PutDish from './pages/Dishes/PutDish';
import Overview from './pages/Profile/Overview';
import Address from './pages/Profile/Address';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/menus' element={<Menus/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/profile/overview' element={<Overview/>}/>
      <Route path='/profile/orders' element={<OrdersProfile/>}/>
      <Route path='/profile/address' element={<Address/>}/>

      

      <Route path='/dishes' element={<Dishes/>}/>
      <Route path='/dishes/create' element={<CreateDish/>}/>
      <Route path='/dishes/:_id' element={<PutDish/>}/>

      <Route path='/dashboard' element={<OrdersProfile/>}/>
      <Route path='/orders' element={<OrdersProfile/>}/>
      <Route path='/inventory' element={<OrdersProfile/>}/>

    </Routes>
  );
}

export default App;
