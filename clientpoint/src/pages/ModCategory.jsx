import { Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";


const ModCategory = () => {
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const catId = search.get('catId')
  const name = search.get('name')

  const [cat,setCat] = useState({catId,name})

const submitCategory =async () =>{
  try {
      const url = `${process.env.REACT_APP_BASE_URL}cat`
      const {data} = await axios.put(url,cat, { withCredentials: true })
      console.log(data)
  } catch (error) {
      console.log(error)
  }
      }
  return (
    <Container className='category'>
            <form onSubmit={submitCategory}>
  <fieldset >
    <legend>Update Category</legend>
    <TextField
              id="outlined-basic"
              label="category name required *"
              variant="outlined"
              fullWidth
              value={cat.name}
              onChange={
                (e)=>{
                setCat({...cat,name:e.target.value})
            }
            }
    />
    <button type='submit' >Update</button>
    </fieldset>
    </form>
    <div style={{"paddingTop":"3rem", "display":"flex", "width":"90%", "flexDirection":"row-reverse"}}>
      <button className="btncancel">Cancel</button>
      </div>
        </Container>
  );
};

export default ModCategory;

