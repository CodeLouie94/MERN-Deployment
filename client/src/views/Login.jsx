import React, {useState} from 'react'
import axios from 'axios'
import {useHistory, Link} from 'react-router-dom'
import Header from '../components/Header';
import Footer from '../components/Footer';
import "./styles/Login.css"

const Login = (props) => {
    
    const {user, setUser} = props
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    


    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email: email,
            password: password
        }, {withCredentials:true})
        .then( res => {
            setUser("LoggedIn")
            history.push('/')
        })
        .catch(err => console.log(err))


    }

  return <div className='containerDiv'>
      <Header/>
      <div className='loginForm' >
          <form onSubmit = {submitHandler}>
              <h3>Log in:</h3>
              <p>
                  <label>Email:</label>
                  <input type="text" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
              </p>
              <p>
                  <label>Password:</label>
                  <input type="password" onChange = {(e) => setPassword(e.target.value)}/>
              </p>
              <button>Submit</button>
          </form>
      </div>
      <p id='signUp'>Not a registered user? Sign up <Link to = "/registerform" className='here'>Here</Link> </p>
      <Footer/>
  </div>;
};

export default Login;
