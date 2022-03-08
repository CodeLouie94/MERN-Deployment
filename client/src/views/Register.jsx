import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import Footer from '../components/Footer';
import Header from '../components/Header';
import "./styles/Register.css"

const Register = (props) => {
    const {user, setUser} = props
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", {
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: password,
            confirmPassword: confirmPassword

        }, { withCredentials: true })
            .then(res => {
                setUser("LoggedIn")
                console.log(res.data)
                history.push('/')
            })
            .catch(err => console.log(err))
    }

    return <div>
        <Header />
        <div className='regForm'>
            <form onSubmit={submitHandler}>
                <h3>Register:</h3>
                <p>
                    <label>First name:</label>
                    <input type="text" onChange={(e) => setFirstname(e.target.value)} />
                </p>
                <p>
                    <label>Last name:</label>
                    <input type="text" onChange={(e) => setLastname(e.target.value)} />
                </p>
                <p>
                    <label>Email:</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} />
                </p>
                <p>
                    <label>Password:</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </p>
                <p>
                    <label>Confirm Password:</label>
                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </p>
                {
                    password === confirmPassword && password.length > 1 ?
                        <button className='reg' >Register</button>
                        : <p className='reg'>Register</p>

                }
            </form>
        </div>

        <Footer />
    </div>;
};

export default Register;
