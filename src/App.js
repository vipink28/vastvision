import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homescreen from './pages/Homescreen';
import Navbar from './components/Navbar';
import Browse from './pages/Browse';
import BrowseByGenre from './pages/BrowseByGenre';
import MyList from './pages/MyList';
import SearchResults from './pages/SearchResults';
import PageNotFound from './pages/PageNotFound';
import Details from './pages/Details';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homescreen />}></Route>
        <Route path='/browse/:streamType' element={<Browse />}></Route>
        <Route path='/browsebygenre/:streamType/:genreId' element={<BrowseByGenre />}></Route>
        <Route path='/browse/mylist' element={<MyList />}></Route>
        <Route path='/search' element={<SearchResults />}></Route>
        <Route path='/details/:streamType/:videoId' element={<Details />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
