import React from "react";
import logo from "../Assets/Logo.png";
import { Link as Rink} from "react-router-dom";
import { Link } from "@mui/material";

const Footer = () => {
  return (
    <footer>
      <img src={logo} alt="Logo" />
      <span style={{ color: "white" }}>Inspire and write; <br />
      <Rink
            style={{color:"white","textDecoration":"none"
           ,"borderBottom":"double 2px white","padding":"0.5rem 2rem"
          }}
            to={`/category`}
        >Add Category
          </Rink>
        </span>
      <fieldset
        style={{
          
overflow:"hidden",
          color: "white",
          display: "flex",
          flexDirection: "column",
          padding: "0.5rem 4rem",
          alignItems: "stretch",
          gap: "0.5rem",
        }}
      >
        <legend style={{"fontWeight":"bold"}}> 

        {" "}
        Find me on
        </legend>
        <Link
            className="footelink"
          href="https://github.com/Jessemwangi/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Github
        </Link>
        <Link
          className="footelink"
          href="https://www.linkedin.com/in/jesse-mwangi/"
          target="_blank"
          rel="noreferrer"
        >
          Linkedin
        </Link>
      </fieldset>
    </footer>
  );
};

export default Footer;
