import React, { useState } from 'react';
import { Container, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Category = () => {
    const [cat,setCat] =useState('')
    const [categories, setCategories] = useState([]);
    const getcateogry = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}cat/all`, { withCredentials: true });
            setCategories(res.data);
          } catch (error) {
            console.log(error)
          }
    }
    useEffect(() => {
        getcateogry()
    },[categories.length])
 

    if ( categories.length >= 6 ) {
        return <div className='catUpdate'><h1> Can not add more category</h1>

        <hr />
        <h2>
            Modify Existing Category Name
        </h2>
        <ul style={{"listStyle":"none" , "display":"fl"}}>
            {
                categories.map(cat =>
               <li key={cat.catid}><Link to={`/cat?name=${cat.name}&catId=${cat.catid}`}
               className="link ">
<p>{cat.name}</p></Link></li>
                    )
            }
        </ul>
            </div>
    }

    const submitCategory =async () =>{
try {
    const url = `${process.env.REACT_APP_BASE_URL}cat`
    const {data} = await axios.post(url,cat, { withCredentials: true })
    console.log(data)
} catch (error) {
    console.log(error)
}
    }

    return (
        <Container className='category'>
            <form onSubmit={submitCategory}>
  <fieldset >
    <legend>Create a new category..</legend>
    <TextField
              id="outlined-basic"
              label="category name required *"
              variant="outlined"
              
              fullWidth
              onChange={
                (e)=>{
                setCat(()=>(e.target.value))
            }
            }
    />
    <button type='submit' >save</button>
    </fieldset>
    </form>
        </Container>
    );
};

export default Category;