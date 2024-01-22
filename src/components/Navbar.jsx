import { NavLink, useNavigate } from "react-router-dom";

import React from 'react';
import { useDispatch } from "react-redux";
import { searchVideo } from "../features/common/commonSlice";

function Navbar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const { value } = e.target;
    dispatch(searchVideo(value));
    if (value.length > 3) {
      navigate('/search');
    }
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top" aria-label="primarymenu">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">VV VastVision</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#primarymenu" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="primarymenu">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="browse/tv">TV Shows</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="browse/movie">Movies</NavLink>
            </li>
            {/* <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="javascript(0)" data-bs-toggle="dropdown" aria-expanded="false">Channels</a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="channel/appletv">Apple Tv</NavLink></li>
                <li><NavLink className="dropdown-item" to="channel/hotstar">Disney Hostar</NavLink></li>
                <li><NavLink className="dropdown-item" to="channel/netflix">Netflix</NavLink></li>
                <li><NavLink className="dropdown-item" to="channel/primevideo">Prime Video</NavLink></li>
              </ul>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" to="mylist">My List</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="browsebygenre/movie/28">Browse By Genre</NavLink>
            </li>
          </ul>

          <form role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;