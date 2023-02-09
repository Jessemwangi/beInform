import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../Assets/Logo.png";
import { AuthContext } from "../context/authContext";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import "./navbar.css";

const Navbar = () => {
  const [mobilemenucss, setMobilemenucss] = useState("");
  const { currentUser, logout } = useContext(AuthContext);
  console.log(currentUser);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`/cat/all`);
        setCategories(res.data);
      } catch (error) {
        console.log(error);
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
          {categories.map((cat) => (
            <li className="mainMenuList" key={cat.name}>
              <NavLink
                className="link"
                to={`/?cat=${cat.name}`}
                key={cat.catid}
              >
                <h6>{cat.name}</h6>
              </NavLink>
            </li>
          ))}
        </ul>
        {currentUser ? (
          <span onClick={logout} className="userDisplay">
            <small>Hi {currentUser?.username}</small> <br />
            logout{" "}
          </span>
        ) : (
          <NavLink className="link " to="./login">
            Login
          </NavLink>
        )}{" "}
        <span></span>
        <span className="write">
          <NavLink className="link" to="/write">
            write
          </NavLink>
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
