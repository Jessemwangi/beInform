import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Write = () => {
  const [value, setValue] = useState("");

  console.log(value);
  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="title " />
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
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
            <input type="file" name="" id="file" style={{display:"none"}}/>
            <label className="file" htmlFor="file">Upload img</label>
         <div className="buttons"> 
         <button>save as a draft</button>
         <button>update</button>
         </div>
          </div>
          <div className="item">
            <h1>category</h1>
            <div className="cat">
            <input type="radio" name="cat" id="art" value="art"/>
          <label htmlFor="art">art</label>

            </div>
            <div className="cat">
                
          <input type="radio" name="technology" id="technology" value="technology"/>
          <label htmlFor="technology">technology</label>
                </div>

                <div className="cat">
                
          <input type="radio" name="food" id="food" value="food"/>
          <label htmlFor="food">food</label>
                </div>
                <div className="cat">
                
          <input type="radio" name="science" id="science" value="science"/>
          <label htmlFor="science">science</label>
                </div>
                <div className="cat">
                
          <input type="radio" name="design" id="design" value="design"/>
          <label htmlFor="design">design</label>
                </div>
                <div className="cat">
                
          <input type="radio" name="cinema" id="cinema" value="cinema"/>
          <label htmlFor="cinema">cinema</label>
                </div>

          </div>
        </div>
      </div>

  ); 
};

export default Write;
