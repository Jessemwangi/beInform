import { Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ModCategory = () => {
  const navigate =useNavigate();
  const location = useLocation()
  const {state} = location
  const [err, setErr] = useState(null);
  const [cat,setCat] = useState({...state})
console.log(cat)

const submitCategory =async (e) =>{
  e.preventDefault();
  try {
      const url = `${process.env.REACT_APP_BASE_URL}cat/${cat.catid}`
    const {data} = await axios.put(url,cat, { withCredentials: true })
     console.log(url,data)
     toast.success(data);
 navigate('/')
  } catch (error) {
      console.log(error)
      toast.error(error.message)
      setErr(error.message)
      return
  }
      }
      console.log(cat)
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
          value={cat.description}
        />
        <button type="submit">save</button>
      </fieldset>
    </form>
    {err && <p>{err}</p>}
  </Container>
  );
};

export default ModCategory;

