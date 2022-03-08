import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import Footer from '../components/Footer';
import SmallSearch from '../components/SmallSearch';
import "./styles/Search.css"


const Search = (props) => {
  const {user, setUser} = props
  const [gameList, setGameList] = useState(null)
  const { title } = useParams()


  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }


  useEffect(() => {
    axios.get(`http://localhost:8000/api/games/title/${title}`)
      .then(res => setGameList(res.data))
      .catch(err => console.log(err))
  }, [title])
  return <div>
    <Header user = {user} setUser = {setUser} />
    <SmallSearch />
    <div className='searchContainer'>
      <h3>Your Search Results:</h3>
      {
        gameList ?
          <div >
            {
              gameList.map((game, i) => (
                <div key={i} className='details'>
                  <img src={game.image} width="200" />
                  <div>
                    <h2>{toTitleCase(game.title)}</h2>
                    <h3>${game.price}</h3>
                    <button><Link to={`/gameInfo/${game._id}`}>More Info</Link></button>
                    <button
                    className='btn snipcart-add-item'
                    data-item-id={game._id}
                    data-item-price={game.price}
                    data-item-url="/"
                    data-item-description={game.description}
                    data-item-image={game.image}
                    data-item-name={game.title}
                    >Add to Cart</button>
                  </div>
                </div>
              ))
            }
          </div> :
          <h1>Searching.....</h1>
      }


    </div>
    <Footer />
  </div>;
};

export default Search;
