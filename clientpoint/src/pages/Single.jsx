import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import Menu from "../Component/Menu";
import  axios  from "axios";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation() // location will have a path so use split to remove it
  // /post/1?cat = food

  const postId = location.pathname.split('/')[2]  //locahost:.../posts/2?cat=cat
  useEffect(() =>{
    const getPosts = async () => {
    
    try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
    } catch (error) {
      console.log(error)
    }
    }
    getPosts();
      },[postId])
  return (
    <div className="single">
      <div className="content">
        <img
          src={post?.image}
          alt="imageone"
        />
        <div className="user">
          
          <img
            src="https://images.unsplash.com/photo-1563995103864-d87d3c1fdd39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80"
            alt="user"
            
          />
          <div className="info">
            <span>{post.username}</span>
            <p>posted two days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
              <FiEdit />
              {/* <img src="" alt="edit"  srcset="" /> */}
            </Link>
            {/* will usee icon */}
            {/* <img src="" alt="delete" /> */}
            <MdDeleteForever></MdDeleteForever>
          </div>

        </div>
        <h1>{post.title} </h1>
      <p>{post.description}</p>
      </div>
     <Menu/>
    </div>
  );
};

export default Single;
