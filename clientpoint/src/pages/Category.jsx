import React, { useContext, useState } from "react";
import { Container, TextField } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Category = () => {
  const [cat, setCat] = useState({name:'',description:''});
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [err, setErr] = useState(null);
  const [categories, setCategories] = useState([]);

  const getcateogry = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}cat/all`, {
        withCredentials: true,
      });
      setCategories(res.data);
    } catch (error) {
      console.log(error);
      setErr(error.message);
    }
  };


  useEffect(() => {
  if(currentUser === null){
    navigate("/login")
  }

},[currentUser, navigate])
  useEffect(() => {
    getcateogry();
  }, [categories.length]);

  if (categories.length >= 6) {
    return (
      <div className="catUpdate">
        <h2> Oops! My apologies, the categories are full and you cannot add any more.
             You could try renaming the existing ones instead.</h2>

        <hr />
        <h2>Modify Existing Category Name</h2>
        <ul style={{ listStyle: "none", display: "fl" }}>
          {categories.map((cat) => (
            <li key={cat.catid}>
              <Link
                to={`/cat?name=${cat.name}&catId=${cat.catid}`}
                className="link "
              >
                <p>{cat.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const submitCategory = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_BASE_URL}cat`;
      await axios.post(url, cat, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.log(error);
      setErr(error.message);
    }
    console.log(err);
  };
 
  return (
    <Container className="category">
      <form onSubmit={submitCategory}>
        <fieldset>
          <legend>Create a new category..</legend>
          <TextField
            id="outlined-basic"
            label={`Category name,  ${20 - cat.name.length} char's rem.*`}
            variant="outlined"
            maxLength={20} 
            name="name"
            value={cat.name}
            fullWidth
            onChange={(e) => {
              setCat(() => ({ ...cat, [e.target.name]: e.target.value.slice(0, 20)}));
            }}
          />
          <TextField
            id="outlined-basic"
            label="Category description *"
            variant="outlined"
            name="description"
            multiline
            fullWidth
            onChange={(e) => {
              setCat(() => ({ ...cat, [e.target.name]: e.target.value }));
            }}
          />
          <button type="submit">save</button>
        </fieldset>
      </form>
      {err && <p>{err}</p>}
    </Container>
  );
};

export default Category;
