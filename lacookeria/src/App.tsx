import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Authentication/Login';
import Menus from './pages/Menus';
import Register from './pages/Authentication/Register';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/menus' element={<Menus/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>


    </Routes>
  );
}

export default App;
