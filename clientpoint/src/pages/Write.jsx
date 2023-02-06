import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

const Write = () => {
  const state = useLocation().state;
  console.log(state)

  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [description, setDescription] = useState(state?.title || "");
  const [CatID, setCat] = useState(state?.CatID || "");
  const [image, setImage] = useState(state?.image || "");
  const [previewImg, setPreviewImage] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false)

  const [categories, setCategories] = useState([]);

  const uploadPostImage = async (img) => {
    console.log(img)
    setUploadingImage(true)
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
    title,description:value,
    CatID,
    image:image ? image : state?.image, 
    UpdateOn:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  }

  const postData = {
    title,description:value,
    CatID,
    image:image ? image : ''
      }
      console.log('updateData ...',updateData ,'postData ...',postData)
   state ? await axios.put(`/posts/${state.id}`,updateData)
   :
   await axios.post(`/posts/`,postData)
} catch (error) {
  console.log(error)
}

  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="title "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
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
      { console.log('image ....',image) }{
      uploadingImage ?  <>uploading your image...</> : ''}

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
            onChange={async (e) =>{
              const upldImg = await uploadPostImage(e.target.files[0])
              setImage(upldImg)
              // console.log('image ....',image, 'upldImg....',upldImg)
            } 
          }
          />
          <label className="file" htmlFor="file">
            Upload img
          </label>
          <div className="buttons">
            <button>save as a draft</button>
            <button onClick={handleSubmit}>Publiish</button>
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
                  checked = {CatID === category.catid}
                
                  onChange={(e) => {
                    setCat(category.catid)
                  console.log(category.catid, CatID)}}
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
