import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const initial ={
        username:''
        ,password:'',
    }
    

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const [inputs,SetInputs] = useState(initial)
    const [err,setErr] =useState(null)
    const navigate = useNavigate();

    const {login} = useContext(AuthContext)
   

    const handleChange = (e) => {
        
        SetInputs(prev => ({...prev, [e.target.name]:e.target.value}))
    }


    const signIn = async (e) =>{
        e.preventDefault();
     try {
	  await  axios.post('/auth/login',inputs)
await login(inputs);
      navigate('/');
	//   console.log(res.data);

} catch (error) {
	console.log(error);
   setErr(error.response.data)
 
}
    }
    return (
        <div className='auth'> 
              <div style={{"width":"200px", "height":"200px", "overflow":"hidden", "borderRadius":"50%", "margin":"auto"}}>
        <img style={{"height":"100%"}}
          src="https://cdn.pixabay.com/photo/2020/12/08/16/56/eye-5814965_1280.jpg"
          alt=""
        />
      </div>
            <h1>login</h1>
            <form action="">


            <InputLabel htmlFor="input-with-icon-adornment">
          UserName
        </InputLabel>
        <OutlinedInput name='username'
          id="input-with-icon-adornment"
          endAdornment={
            <InputAdornment position="end">
              <AccountCircle />
            </InputAdornment>
          }
          onChange={handleChange}
        />

<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput onChange={handleChange}  name='password'
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
           
          />
                {/* <input type="text"  placeholder='username' /> */}
                {/* <input type="password"  placeholder='passord' /> */}
                <div style={{position:"relative"}}>

                <button className='loginBtn' onClick={signIn}>Login</button>
                </div>
                {err && <p>{err}</p>}
                <span>Dont have accout <Link to='/Register'>Register</Link> </span>
            </form> 
         
        </div>
    );
};
  
export default Login;