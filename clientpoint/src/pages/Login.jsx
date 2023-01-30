import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const initial ={
        username:''
        ,password:'',
    }
    const [inputs,SetInputs] = useState(initial)
    const [err,setErr] =useState(null)
    const navigate = useNavigate();

    const handleChange = (e) => {
        
        SetInputs(prev => ({...prev, [e.target.name]:e.target.value}))
        console.log(inputs);
    }
    const signIn = async (e) =>{
        e.preventDefault();
     try {
	  const res = await  axios.post('/auth/login',inputs)
      navigate('/');
	  console.log(res.data);

} catch (error) {
	console.log(error);
   setErr(error.response.data)
 
}
    }
    return (
        <div className='auth'> 
            <h1>login</h1>
            <form action="">
                <input type="text" name='username' placeholder='username' onChange={handleChange}/>
                <input type="password" name='password' placeholder='passord' onChange={handleChange} />
                <button onClick={signIn}>Login</button>
                {err && <p>{err}</p>}
                <span>Dont have accout <Link to='/Register'>Register</Link> </span>
            </form> 
        </div>
    );
};
  
export default Login;