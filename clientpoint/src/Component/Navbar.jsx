import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import logo from '../Assets/Logo.png'
import { AuthContext } from '../context/authContext';
const Navbar = () => {
    const {currentUser,logout} = useContext(AuthContext)
    return (
        <div className='navbar'> 
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                    <img src={logo} alt="Logo"  />  
                    </Link>
                </div>
                <div className="links">
                    <Link className='link' to="/?cat=art" >
                        <h6>ART</h6>
                    </Link>
                    <Link className='link' to="/?cat=science" >
                        <h6>Science</h6>
                    </Link>
                    <Link className='link' to="/?cat=design" >
                        <h6>DESIGN</h6>
                    </Link>
                    <Link className='link' to="/?cat=food" >
                        <h6>FOOD</h6>
                    </Link>
                    <Link className='link' to="/?cat=technology" >
                        <h6>TECHNOLOGY</h6>
                    </Link>
                    <Link className='link' to="/?cat=cinema" >
                        <h6>CINEMA</h6>
                    </Link>
                    <span>{currentUser && currentUser} </span>
                    
                        {currentUser ? 
                        <span onClick={logout}>logout</span> 
                        :
                        <Link className='link ' to='./login'></Link>}
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