import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import SmallSearch from '../components/SmallSearch'
import "./styles/shop.css"

const Shop = (props) => {

  const { user, setUser } = props
  const [shop, setShop] = useState([])
  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  useEffect(() => {
    axios.get("http://localhost:8000/api/games")
      .then(res => setShop(res.data))
      .catch(err => console.log(err))
  }, [shop])


  return <div>
    <Header user={user} setUser={setUser} />
    <SmallSearch />
    <div>
      <h1>Shop:</h1>
      {
        shop ?
          <div className='shopGames'>
            {
              shop.map((game, i) => (
                <div key={i} className='oneGameDiv'>
                  <img src={game.image} width="300" height="400" />
                  <div>
                    <h2>{toTitleCase(game.title)}</h2>
                    <h3>${game.price}</h3>
                    <button><Link to={`/gameInfo/${game._id}`}>More Info</Link></button>
                    <button className='btn snipcart-add-item'
                      data-item-id={game._id}
                      data-item-price={game.price}
                      data-item-url={`http://localhost:8000/api/games/${game._id}`}
                      data-item-description={game.description}
                      data-item-image={game.image}
                      data-item-name={game.title}>Add to Cart</button>
                  </div>
                </div>
              ))
            }
          </div> :
          <h1>Loading shop...</h1>
      }
    </div>
  </div>;
};

export default Shop;
