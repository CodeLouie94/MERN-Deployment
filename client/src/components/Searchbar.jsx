import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import "./styles/Searchbar.css"

const Searchbar = () => {

  const [hovered, setHovered ] = useState(false)
  const [searchItem, setSearchItem] = useState("")
  const [gameList, setGameList] = useState("")
  const history = useHistory()
  const toggleHover = () => setHovered(!hovered);
  const submitHandler = e => {
    e.preventDefault();
    if(searchItem != ""){
    history.push(`/searchResults/${searchItem}`)}
  }

  return <div>
    <div className='searchContainer'>
      <Link to="/"><h1 className='logo'>NewGame+</h1></Link>
      <form onSubmit={submitHandler}>
        <input className='inputBar' type="text" onChange={(e) => setSearchItem(e.target.value)} />
        <button className={hovered? "hoveredButton": "unhoveredButton"} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>Search</button>
      </form>
    </div>
  </div>;
};

export default Searchbar;
