import { BrowserRouter, Switch, Route } from "react-router-dom"
import React, {useState, useEffect} from "react";
import Login from './views/Login';
import Main from "./views/Main";
import Register from "./views/Register";
import axios from 'axios'
import Search from "./views/Search";
import GameInfo from "./views/GameInfo";
import Shop from "./views/Shop";
import "./App.css"

function App() {

  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)
  useEffect(() => {
    axios.get("http://localhost:8000/api/users", { withCredentials: true })
      .then(res => {
        console.log(res.data)
        setUser(res.data)
      })
      .catch(err => {
        console.log("noUser logged in")
      });
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/shop">
            <Shop user = {user} setUser = {setUser}/>
          </Route>
          <Route exact path="/gameInfo/:id">
            <GameInfo user = {user} setUser = {setUser}/>
          </Route>
          <Route exact path="/searchResults/:title">
            <Search user = {user} setUser = {setUser}/>
          </Route>
          <Route exact path="/registerform">
            <Register user = {user} setUser = {setUser}/>
          </Route>
          <Route exact path="/login">
            <Login user = {user} setUser = {setUser}/>
          </Route>
          <Route exact path="/">
            <Main  user = {user} setUser = {setUser}/>
          </Route>
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
