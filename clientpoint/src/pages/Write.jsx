import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Write = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cat,setCat]=useState();
  const [image, setImage] = useState("");

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`/cat/all`);
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
  }, []);

  const handleSubmit = (e) =>{
e.preventDefault()

  }
  console.log(value);
  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="title "
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
            onChange={(e) => setImage(e.target.files[0])}
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
        {
categories.map(category => (
<>
          <div className="cat">
            <input
              type="radio"
              name={category.name}
              id={category.id}
              value={category.name}
              onChange={(e)=>setCat(e.target.value)}
            />
            <label htmlFor={category.id}>{category.name}</label>
          </div>
</>
))
}
</div>
      </div>
    </div>
  );
};

export default Write;
