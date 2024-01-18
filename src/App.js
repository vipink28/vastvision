import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homescreen from './pages/Homescreen';
import Navbar from './components/Navbar';
import Browse from './pages/Browse';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homescreen />}></Route>
        <Route path='/browse/:streamType' element={<Browse />}></Route>
        <Route path='/browsebygenre/:streamType/:genreId' element={<Browse />}></Route>
        <Route path='/browse/:streamType' element={<Browse />}></Route>
        <Route path='/browse/:streamType' element={<Browse />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
