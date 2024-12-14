import './CSS/Auth.css'

import arrow_icon from '../Components/Assets/arrow-icon.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
   const apiUrl = import.meta.env.VITE_API_URL;

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const navigate = useNavigate();

   const handleSignup = () => {
      const newUser = {
         name: name,
         email: email,
         password: password
      }

      fetch(`${apiUrl}/user/signup`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newUser),
      })
         .then((response) => {
            console.log(response.json())
            navigate('/login')
         })
         .catch((error) => console.error(error));
   }

   return (
      <div className="login-signup">
         <div className="loginsignup-topbar">
            <a href="/login">
               <img src={arrow_icon} alt="" />
            </a>
         </div>

         <div className="loginsignup-container">
            <h1>SIGN UP</h1>
            <div className="loginsignup-fields">
               <input type="text" placeholder="User Name" onChange={(e) => setName(e.target.value)} />
               <input type="email" placeholder="Email Adress" onChange={(e) => setEmail(e.target.value)} />
               <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleSignup}>Continue</button>
            <p className="loginsignup-login">Already have an acount? <a href='/login'>Login Here</a></p>
         </div>
      </div>
   )
};

export default SignUp;
