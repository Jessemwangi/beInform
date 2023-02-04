import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import logo from '../Assets/Logo.png'
import { AuthContext } from '../context/authContext';
import axios from 'axios';
const Navbar = () => {

    const {currentUser,logout} = useContext(AuthContext)

    const [categories, setCategories] = useState([]);
    useEffect(() =>{
         const getPosts = async () => {
         
         try {
             const res = await axios.get(`/cat/all`);
             setCategories(res.data);
         } catch (error) {
           console.log(error)
         }
         }
         getPosts();
           },[])

    return (
        <div className='navbar'> 
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                    <img src={logo} alt="Logo"  />  
                    </Link>
                </div>
                <div className="links">
                {

categories.map(cat => 
                    <Link className='link' to={`/?cat=${cat.name}`} key={cat.catid}>
                        <h6>{cat.name}</h6>
                    </Link>
    )
                }
                   
                    <span>{currentUser?.usename} </span>
                    
                        {currentUser ? 
                      (

                          <span onClick={logout}>logout</span> 
                      )  
                        :
                        (

                            <Link className='link ' to='./login'>

                            </Link>
                        )}
                    <span className='write'>
                        <Link className='link' to="/write">write
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Navbar;