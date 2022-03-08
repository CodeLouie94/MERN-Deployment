import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./styles/headerStyles.css"

const Header = (props) => {


    const [hovered, setHovered ] = useState(false)
    const {history} = useHistory()
    const {user, setUser} = props


    const logoutHandler = (e) => {
        axios.get('http://localhost:8000/api/logout',{withCredentials:true})
        .then(res => {
            setUser(null)
            history.push('/')
        })
        .catch(err => console.log(err))
    }

    const toggleHover = () => setHovered(!hovered);

  return <div>
      <div>
          <h3><Link to = "/" className='homeLogo'>NG+</Link></h3>
      </div>
      <div className='header'>
          <div className='subHeader'>
              <p id='about'>About</p>
              <p><Link to = "/shop">Shop</Link></p>
          </div>
        {user == null?
              <Link to = '/login'><button className={hovered? "hoveredButton logbutton" : "unhoveredButton logbutton"} onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={logoutHandler}>Sign in</button></Link>
          :
          <div className='header'>
              <button className={hovered? "hoveredButton logbutton" : "unhoveredButton logbutton"} onMouseEnter={toggleHover} onMouseLeave={toggleHover} onClick={logoutHandler}>Sign out</button>
              <Link to = '#' className="snipcart-checkout"><img id='headerCart' src="https://icon-library.com/images/shopping-cart-icon-white/shopping-cart-icon-white-11.jpg"  width="50" /></Link>
          </div>
        }
      </div>
  </div>;
};

export default Header;
