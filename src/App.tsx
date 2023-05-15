import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Menus from './pages/Menus';
import Register from './pages/Authentication/Register';
import About from './pages/About';
import Profile from './pages/Profile';
import OrdersProfile from './pages/Profile/OrdersProfile';
import Dishes from './pages/Staff/Dishes';
import CreateDish from './pages/Staff/Dishes/CreateDish';
import PutDish from './pages/Staff/Dishes/PutDish';
import Overview from './pages/Profile/Overview';
import Address from './pages/Profile/Address';
import StaffMenus from './pages/Staff/Menus';
import CreateMenu from './pages/Staff/Menus/CreateMenu';
import PutMenu from './pages/Staff/Menus/PutMenus';
import Checkout from './pages/Checkout';
import AddressStep from './pages/Checkout/AddressStep';
import PaymentStep from './pages/Checkout/PaymentStep';
import ReviewStep from './pages/Checkout/ReviewStep';
import Error401Page from './components/Error/Error401';

function App() {
  return (
    <Routes>
      <Route path='/401' element={<Error401Page/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/menu' element={<Menus/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/checkout' element={<Checkout/>}/>

      <Route path='/profile/overview' element={<Overview/>}/>
      <Route path='/profile/orders' element={<OrdersProfile/>}/>
      <Route path='/profile/address' element={<Address/>}/>

      <Route path='/staff/dishes' element={<Dishes/>}/>
      <Route path='/staff/dishes/create' element={<CreateDish/>}/>
      <Route path='/staff/dishes/:_id' element={<PutDish/>}/>
      
      <Route path='/staff/menus' element={<StaffMenus/>}/>
      <Route path='/staff/menus/create' element={<CreateMenu/>}/>
      <Route path='/staff/menus/:_id' element={<PutMenu/>}/>

      <Route path='/staff/dashboard' element={<OrdersProfile/>}/>
      <Route path='/staff/orders' element={<OrdersProfile/>}/>
      <Route path='/staff/inventory' element={<OrdersProfile/>}/>

      <Route path='/checkout/identification' element={<Checkout/>}/>
      <Route path='/checkout/address' element={<AddressStep/>}/>
      <Route path='/checkout/payment' element={<PaymentStep/>}/>
      <Route path='/checkout/review' element={<ReviewStep/>}/>

    </Routes>
  );
}

export default App;
