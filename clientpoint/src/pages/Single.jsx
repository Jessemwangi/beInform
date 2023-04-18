import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import Menu from "../Component/Menu";
import  axios  from "axios";
import moment from 'moment';
import { useContext } from "react";
import { AuthContext } from '../context/authContext';
import convertToHtml from "../Functions/functions";
import { toast } from "react-toastify";

const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation() // location will have a path so use split to remove it
  const navigate = useNavigate()
  const {currentUser} = useContext(AuthContext)

  const postId = location.pathname.split('/')[2]  //locahost:.../posts/2?cat=cat
  useEffect(() =>{
    const getPosts = async () => {
    
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_ApiHost}/posts/${postId}`);
        setPost(data);
     
    } catch (error) {
    }
    }
    getPosts();
      },[postId])

     const handleImageDelete = async() =>{
      try {
        await axios.delete(`${process.env.REACT_APP_ApiHost}/posts/${postId}`)
        toast.info("Deleted ")
        navigate('/');
      } catch (error) {
      }
     
     }


  return (
    <div className="single">
     
      <div className="content">
        <img
          src={`../posts/images/${post?.image}`}
          alt="imageone"
        />
        <div className="user">
          
          <img
            src={post.userImage ? post.userImage : 
            "https://images.unsplash.com/photo-1563995103864-d87d3c1fdd39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80"
          }
            alt="user"
            
          />
          <div className="info">
            <span>{post.username}</span>
            <p>posted {moment(post.datecreated).fromNow()}</p>
          </div>
          
            {currentUser?.username === post.username && 
            <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <FiEdit />
      
            </Link>
            <MdDeleteForever onClick={handleImageDelete}></MdDeleteForever>
          </div>
}
        </div>
        <h1>{post.title} </h1>
        <p
      dangerouslySetInnerHTML={{
        __html: `${convertToHtml(post.description)}`,
      }}
    ></p>
      </div>
     <Menu catName={post.category}/>
    </div>
  );
};

export default Single;
