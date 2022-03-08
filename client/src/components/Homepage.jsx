import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import "./styles/Homepage.css"

const Homepage = () => {

  const [frontItems, setFrontItems] = useState("")

  function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
  }


  useEffect(() => {
    axios.get('http://localhost:8000/api/games')
    .then(res => setFrontItems(res.data))
    .catch(err =>console.log(err))
  },[])

  return <div>
      <div>
          <h1>Check these out!</h1>
          {
            frontItems?(
              <div className='frontItems'> 
                {
                  frontItems.filter(game => game.front == true).map((game, i) => (
                  <div key ={i} >
                      <Link to = {`/gameInfo/${game._id}`}>
                        <div>
                          <img src={game.image} width= "200" height = "300"/>
                          <h2>{titleCase(game.title)}</h2>
                          <h3>${game.price}</h3>
                        </div>
                      </Link>
                    </div>
                  ))
                }
              </div>
            ):
            <h1>Loading...</h1>
          }
      </div>
  </div>;
};

export default Homepage;
