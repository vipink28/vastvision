import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homescreen from './pages/Homescreen';
import Navbar from './components/Navbar';


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Homescreen />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
