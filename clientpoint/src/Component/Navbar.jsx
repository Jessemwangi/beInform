import React, { useContext, useEffect, useState } from "react";
import {  NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import "./navbar.css";

const Navbar = () => {
  const [mobilemenucss, setMobilemenucss] = useState("");
  const { currentUser, logout } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`/cat/all`);
        setCategories(res.data);
      } catch (error) {
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    mobilemenucss !== "responsive"
      ? (document.body.style.overflow = "")
      : (document.body.style.overflow = "hidden");
  }, [mobilemenucss]);

  const showMobileMennu = () => {
    mobilemenucss !== "responsive"
      ? setMobilemenucss("responsive")
      : setMobilemenucss("");
  };
  return (
    <header id="back-to-top-anchor">
      <nav className={`mainnav ${mobilemenucss}`}>
        <button className="mobilebtn" onClick={showMobileMennu}>
          <span className="MuiSvgIcon-_root">
            <MenuIcon
              fontSize="large"
              color="info"
              focusable="true"
              titleAccess={
                mobilemenucss !== "responsive" ? "Open Menu" : "Collapse Menu "
              }
              shapeRendering="geometricPrecision"
            />
          </span>
        </button>
        <ul className="menuUl">
        <li className="mainMenuList" >
              <NavLink
                className="link hundredpx"
                to={`/`}
                
              >
                <h6>Home</h6>
              </NavLink>
            </li>
          {categories && categories.map((cat) => (
            <li className="mainMenuList" key={cat.name}>
              <NavLink
                className="link hundredpx"
                to={`/?cat=${cat.name}`}
                key={cat.catid}
              >
                <h6>{cat.name}</h6>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="actionArea"> 
        {currentUser ? (
          <span onClick={logout} className="userDisplay">
            <small>Hi {currentUser?.username}</small> <br />
            logout{" "}
          </span>
        ) : (
          <NavLink className="write userDisplay" to="./login">
            Login
          </NavLink>
        )}{" "}
        <span></span>
        <span >
          <NavLink className="write userDisplay" to="/write">
            write
          </NavLink>
        </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
