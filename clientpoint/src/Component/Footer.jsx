import React from 'react';
import logo from '../Assets/Logo.png'

const Footer = () => {
    return (
        <footer>
             <img src={logo} alt="Logo"  />
             <span style={{"color":"white"}}>Made to inspire and write; &copy: 2023</span>
        </footer>
    );
};

export default Footer;