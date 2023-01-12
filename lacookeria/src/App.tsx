import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menus from './pages/Menus';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/menus' element={<Menus/>}/>


    </Routes>
  );
}

export default App;
