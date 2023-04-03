import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Menu = ({catName}) => {

    const [posts, setPosts] = useState([]);
 useEffect(() =>{
      const getPosts = async () => {
      
      try {
          const res = await axios.get(`/posts/all?cat=${catName ? catName :'' }`);
          setPosts(res.data);
      } catch (error) {
        console.log(error)
        
      }
      }
      getPosts();
        },[catName])


    return (
        <div className='menu '> 
            <h1>other post you may like</h1>
            {posts.map(post=>(
                <div className="post" key={post.id}>
                    <img src={`../posts/images/${post?.image}`} alt="" />
                    <h2>{post.title}</h2>
                    <Link to={`/post/${post.id}`}> <button>Read more</button></Link> 
                </div>
            ))}
        </div>
    );
};

export default Menu;