import { TextField } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

const Write = () => {
  const state = useLocation().state;

  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [CatID, setCat] = useState(state?.CatID || "");
  const [image, setImage] = useState(state?.image || "");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [categories, setCategories] = useState([]);
  const [errorState, setErrorState] = useState(true);
  const [btnDisable, setBtnDisable] = useState(()=>errorState);

 
  const uploadPostImage = async (img) => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", img);
      const { data } = await axios.post("/upload/posts/images", formData);
      setUploadingImage(false);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get(`/cat/all`);
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateData = {
        title,
        description: value,
        CatID,
        image: image ? image : state?.image,
        UpdateOn: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      };

      const postData = {
        title,
        description: value,
        CatID,
        image: image ? image : "",
      };
      console.log("updateData ...", updateData, "postData ...", postData);
      state
        ? await axios.put(`/posts/${state.id}`, updateData)
        : await axios.post(`/posts/`, postData);
    } catch (error) {
      console.log(error);
    }
  };

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
            if (title.length > 10) {
              setErrorState(false);
            } else {
              setErrorState(true);
            }
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
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        {uploadingImage ? <>uploading your image...</> : ""}

        {image && (
          <div className="item">
            <img
              src={`../posts/images/${image}`}
              alt="Feature"
              className="postImage"
            />
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
              setImage(upldImg);
              // console.log('image ....',image, 'upldImg....',upldImg)
            }}
          />
          <label className="file" htmlFor="file">
            Upload img
          </label>
          <div className="buttons">
            <button className={`${btnDisable}`} disabled={btnDisable}>save as a draft</button>
            <button className={`${btnDisable}`} disabled={btnDisable} onClick={handleSubmit}>
              Publish
            </button>
          </div>
        </div>
        <div className="item">
          <h1>category</h1>
          {categories.map((category) => (
            <>
              <div className="cat" key={category.catid}>
                <input
                  type="radio"
                  name={category.name}
                  id={category.catid}
                  value={category.catid}
                  checked={CatID === category.catid}
                  onChange={(e) => {
                    setCat(category.catid);
                  }}
                />
                <label htmlFor={category.id}>{category.name}</label>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;
