import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Homepage from '../components/Homepage';
import Searchbar from '../components/Searchbar';

const Main = (props) => {

  const {user, setUser} = props

  return <div>
      <Header user = {user} setUser = {setUser}/>
      <Searchbar/>
      <Homepage/>
      <Footer/>

  </div>;
};

export default Main;
