import { Box, LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Menu = ({catName}) => {

    const [posts, setPosts] = useState([]);
    const [error, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
 useEffect(() =>{
      const getPosts = async () => {
      
      try {
        setIsLoading(true)
          const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}posts/all?cat=${catName ? catName :'' }`, { withCredentials: true });
          if(data){
              setPosts(data);
              setIsLoading(false)
          }
      } catch (error) {
        setIsLoading(false)
        setErr(error.message)
      }
      }
      getPosts();
        },[catName])


    return (
        isLoading ? (
            <Box sx={{ width: '100%' }}>
                  <LinearProgress color="secondary" />
                </Box>
                ):
            (
              <>
                {
                error ? 
                (
                <>
                 <p className="error"> {error.message} </p></>
                 ) 
                :
                (
        <div className='menu '> 
            <h1>other post you may like</h1>
            {posts && posts.map(post=>(
                <div className="post" key={post.id}>
                    <img src={`../posts/images/${post?.image}`} alt="" />
                    <h2>{post.title}</h2>
                    <Link to={`/post/${post.id}`}> <button>Read more</button></Link> 
                </div>
            ))}
        </div>
               )
            }
            </>
          
            )
    );
};

export default Menu;