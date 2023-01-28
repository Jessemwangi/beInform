import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
             <div className='auth'> 
            <h1>Register</h1>
            <form action="">
                <input type="text" placeholder='username' />
                <input type="password" placeholder='passord' />
                <input type="email" placeholder='passord' required/>
                <button>Login</button>
                <p>error message</p>
                <span> have an accout <Link to='/login'>Login</Link> </span>
            </form> 
        </div>
        </div>
    );
};

export default Register;