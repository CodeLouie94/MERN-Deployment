import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const SmallSearch = () => {

    const [hovered, setHovered] = useState(false)
    const [searchItem, setSearchItem] = useState("")
    const [gameList, setGameList] = useState("")
    const history = useHistory()
    const toggleHover = () => setHovered(!hovered);
    const submitHandler = e => {
        e.preventDefault();
        if(searchItem != ""){
            history.push(`/searchResults/${searchItem}`)}
    }

    const labelStyle = {color: "turquoise", 
    fontFamily: "fantasy", 
    fontSize: "15pt",
    marginRight: "10px"
    }

    return <div>
        <div className='searchContainer'>
            <form onSubmit={submitHandler}>
                <label style = {labelStyle}>N G +</label>
                <input className='inputBar' type="text" onChange={(e) => setSearchItem(e.target.value)} />
                <button className={hovered ? '' : 'hoveredButton'} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>Search</button>
            </form>
        </div>
    </div>;
};


export default SmallSearch;
