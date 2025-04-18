import { Button, TextField } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

import { toast } from "react-toastify";



const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [CatID, setCat] = useState(state?.catid || "");
  const [postImage, setPostImage] = useState(state ? {
     imageurl:state.imageurl,
    image:state.image
  } : "");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [categories, setCategories] = useState([]);
  const [errorState, setErrorState] = useState(true);
  const [btnDisable, setBtnDisable] = useState(()=>errorState);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [charCount, setCharCount] = useState(0);
const [exceededLimit, setExceededLimit] = useState(false);
const MAX_CHARS = 4225;
  
  const options = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  useEffect(() => {
    if(currentUser === null){
      navigate("/login")
    }

  },[currentUser, navigate])
 
  const uploadPostImage = async (img) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", img);
      toast.info("Uploading image",options)
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}upload/posts/images`, formData,{withCredentials:true});
   
      setUploadingImage(false);
      return data;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}cat/all`,{withCredentials:true});
        setCategories(res.data);
      } catch (error) {
      }
    };
    fetchCats();
  }, []);


  const handleEditorChange = (content) => {
    const textOnly = content.replace(/<[^>]*>/g, '');
    const count = textOnly.length;
    
    setCharCount(count);
    
    if (count <= MAX_CHARS) {
      setValue(content);
      setExceededLimit(false);
    } else {
      setExceededLimit(true);
    }
  };

  const handleSubmit = async (e,status_Id) => {
    e.preventDefault();
    if (exceededLimit) {
      toast.error("Description exceeds maximum length of 4225 characters", options);
      return;
    }

    try {
      const updateData = {
        title,
        description: value,
        CatID,
        image: postImage ? postImage.image : (state?.image || "noImage"),
        UpdateOn: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        statusId:status_Id,
      };
  
      const postData = {
        title,
        description: value,
        CatID,
        image: postImage ? postImage.image : "noImage",
        statusId:status_Id,
        publishedOn:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      };
  
      let response, result;
  
      if (state) {
        result = await axios.put(`${process.env.REACT_APP_BASE_URL}posts/${state.id}`, updateData,{withCredentials:true})
      } else {
        result = await axios.post(`${process.env.REACT_APP_BASE_URL}posts/`, postData, { withCredentials: true });
      }
  
      response = {
        message: result.data,
        code: result.status
      };
  
      if (response.code === 200) {
        toast.success(response,options);
        navigate("/")
      } else {
        toast.error(response,options);
      }
  
    } catch (error) {
      toast.error("An error has occured",options);
    }
  };
  
  const deleteImage = async () =>{
   try
   {
     const {data} = await axios.delete(`${process.env.REACT_APP_BASE_URL}delete/img/${postImage.image}`,{},{withCredentials:true});
     toast.success(data)
     setPostImage('');
   } 
   catch(error){
    toast.error("Error")
   }
  }
  useEffect(() =>{
    if (title.length > 10) {
      setErrorState(false);
    } else {
      setErrorState(true);
    }
  },[title.length])

  return (
    <div className="add">
      <div className="content">
        <TextField
          error={errorState}
          id="outlined-basic"
          label="Required Blog Title *"
          variant="outlined"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setBtnDisable(()=>errorState)
          }}
        />
        {/* <input
          type="text"
          placeholder="title "
          
        /> */}
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={handleEditorChange}
          />
        </div>
          <div className="char-counter" style={{ 
  marginTop: '0.5rem', 
  color: exceededLimit ? 'red' : 'inherit',
  display: 'flex',
  justifyContent: 'flex-end'
}}>
  {charCount}/{MAX_CHARS} characters
</div>
      </div>
      <div className="menu">
        {uploadingImage ? <>uploading your image...</> : ""}

        {postImage && (
          <div className="item">
            <img
              src={postImage.imageurl}
              alt="Feature"
              className="postImage"
            />
<div style={{"display":"flex", "flexDirection":"row-reverse"}}>

            <Button style={{"background":"black","color":"white", "marginTop":"1rem"}} onClick={deleteImage}>Delete image</Button>
</div>
          </div>
        )}
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status</b>Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input
            type="file"
            name=""
            id="file"
            style={{ display: "none" }}
            onChange={async (e) => {
              const upldImg = await uploadPostImage(e.target.files[0]);
              setPostImage(upldImg);
            }}
          />
          <label className="file" htmlFor="file">
            Upload img
          </label>
          <div className="buttons">
            <button className={`${btnDisable}`} disabled={btnDisable}>save as a draft</button>
            <button className={`${btnDisable}`} disabled={btnDisable} onClick={(e)=>handleSubmit(e,1)}>
              Publish
            </button>
          </div>
        </div>
        <div className="item">
          <h1>category</h1>
          {categories.map((category) => (
           
              <div className="cat" key={category.catid}>
                <input
                  type="radio"
                  name={category.name}
                  id={category.catid}
                  value={category.catid}
                  checked={CatID === category.catid}
                  onChange={(e) => {
                    setCat(category.catid);
                  }
                }
                />
                <label htmlFor={category.id}>{category.name}</label>
              </div>
            
          ))}
        </div>

      </div>
    </div>
  );
};

export default Write;
