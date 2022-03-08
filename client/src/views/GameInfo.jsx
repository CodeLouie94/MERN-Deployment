import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SmallSearch from '../components/SmallSearch';
import "./styles/GameInfo.css"

const GameInfo = (props) => {

  const { user, setUser } = props
  const { id } = useParams()
  const [game, setGame] = useState("")
  function titleCase(str) {
    if (!str) {
      return
    }
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }


  useEffect(() => {
    axios.get(`http://localhost:8000/api/games/${id}`)
      .then(res => setGame(res.data))
      .catch(err => console.log(err))
  }, [])

  return <div>
    <Header user = {user} setUser = {setUser}/>
    <SmallSearch/>
    <div className='infoContainer'>
      <div>
        <img className='gameImg' src={game.image} width="300" />
      </div>
      <div>
        <h2 className='title'>{titleCase(game.title)}</h2>
        <p className='description'>{game.description}</p>
        <h4 className='price'>Price: ${game.price}</h4>
        <button className='btn snipcart-add-item'
          data-item-id={game._id}
          data-item-price={game.price}
          data-item-url="/"
          data-item-description={game.description}
          data-item-image={game.image}
          data-item-name={game.title}
        >Add to Cart</button>
      </div>
    </div>
    <Footer />
  </div>
}

export default GameInfo;
