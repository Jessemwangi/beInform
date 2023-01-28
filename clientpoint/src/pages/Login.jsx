import React from 'react';
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='auth'> 
            <h1>login</h1>
            <form action="">
                <input type="text" placeholder='username' />
                <input type="password" placeholder='passord' />
                <button>Login</button>
                <p>error message</p>
                <span>Dont have accout <Link to='/Register'>Register</Link> </span>
            </form> 
        </div>
    );
};
  
export default Login;