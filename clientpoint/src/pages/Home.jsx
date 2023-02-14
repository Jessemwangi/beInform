import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import convertToHtml from "../Functions/functions";
import { Box, LinearProgress } from "@mui/material";


const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() =>{
const getPosts = async () => {

try {
  setIsLoading(true)
	  const res = await axios.get(`/posts/all${cat}`);
    setPosts(res.data);
  // console.log(res);
  setIsLoading(false)
} catch (error) {
	// console.log(error)
  setIsLoading(true)
}
}
getPosts();
  },[cat])
  
  return (
    isLoading ? (
<Box sx={{ width: '100%' }}>
      <LinearProgress color="secondary" />
    </Box>
    ):
(
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
           
              <img src={`${post?.image}`} alt={post.titles} />   {/* // with dummy data */}
              {/* <img src={`../posts/images/${post?.image}`} alt={post.titles} />working with db files */}
            </div>
            <div className="content">
                <Link to={`/post/${post.id}`}
                className="link ">
<h1>{post.title}</h1><small>{moment(post.datecreated).fromNow() }</small>
                </Link>
<p>{ `${convertToHtml(post.description.substring(0, 300))} ...`  }</p>
<button>Read more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  );
};

export default Home;
