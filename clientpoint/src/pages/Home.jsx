import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios'

const Home = () => {
  const [posts, setPosts] = useState([]);
  // const location = useLocation()
  // // console.log(location.search);
  const cat = useLocation().search
  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] =useState(null);


  useEffect(() =>{
const getPosts = async () => {

try {
	  const res = await axios.get(`/posts${cat}`);
    setPosts(res.data);
    // console.log(res.data);
} catch (error) {
	console.log(error)
}
}
getPosts();
  },[cat])
 
  
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.image} alt={post.titles} />
            </div>
            <div className="content">
                <Link to={`/post/${post.id}`}
                className="link ">
<h1>{post.title}</h1><small>{post.datecreated }</small>
                </Link>
<p>{ `${post.description.substring(0, 300)} ...`  }</p>
<button>Read more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
