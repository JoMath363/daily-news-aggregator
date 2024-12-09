import './CSS/Auth.css'

import arrow_icon from '../Components/Assets/arrow-icon.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Login = (props) => {

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const navigate = useNavigate();

   const handleLogin = () => {
      const user = {
         email: email,
         password: password
      }

      fetch('http://localhost:5555/user/login', {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(user),
      })
         .then((response) => {
            if (response.ok) {
               return response.json()
            }
         })
         .then((data) => {
            const userData = {
               name: data.name,
               email: data.email,
               favorites: data.favorites
            }

            localStorage.setItem('user', JSON.stringify(userData));
            navigate('/')
         })
         .catch((error) => console.error(error));
   }


   return (
      <div className="login-signup">
         <div className="loginsignup-topbar">
            <a href="/">
               <img src={arrow_icon} alt="" />
            </a>
         </div>

         <div className="loginsignup-container">
            <h1>Login</h1>
            <div className="loginsignup-fields">
               <input type="email" placeholder="Email Adress" onChange={(e) => setEmail(e.target.value)} />
               <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Continue</button>
            <p className="loginsignup-login">Don't have an acount? <a href='/signup'>Sign Up Here</a></p>

         </div>
      </div>
   )
};

export default Login;
