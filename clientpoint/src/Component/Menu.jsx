import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const Menu = ({catName}) => {

    const [posts, setPosts] = useState([]);
 useEffect(() =>{
      const getPosts = async () => {
      
      try {
          const res = await axios.get(`/posts/all?cat=${catName}`);
          setPosts(res.data);
          console.log(res.data)
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
                    <img src={post.image} alt="" />
                    <h2>{post.title}</h2>
                    <button>Read more</button>
                </div>
            ))}
        </div>
    );
};

export default Menu;