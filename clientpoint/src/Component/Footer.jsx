import React from 'react';
import logo from '../Assets/Logo.png'
import { Link } from '@mui/material';

const Footer = () => {
     
    return (
        <footer>
             <img src={logo} alt="Logo"  />
             <span style={{"color":"white"}}>Made to inspire and write; </span>
             <span style={{"color":"white", "display":"flex","flexDirection":"column", "paddingRight":"4rem","alignItems": "stretch","gap":"0.5rem"}}> find me on
             <Link border={1} padding={1} color={"white"} underline="hover" href='https://github.com/Jessemwangi/' target='_blank' rel="noreferrer" > Github</Link>
             <Link className="footelink" href='https://www.linkedin.com/in/jesse-mwangi/' target='_blank' rel="noreferrer" >Linkedin</Link>
                     </span>
        </footer>
    );
} ;

export default Footer;