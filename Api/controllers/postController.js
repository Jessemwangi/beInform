"use strict";

const { msDb ,psPool} = require("../db/dbconnect");
const db = psPool;
const jwt = require("jsonwebtoken");

const getPosts = (req, res) => {
  try {
    const cat = req.query.cat;
    let q = "";
    cat
      ? (q =
          "select p.id,p.title,p.description,p.image,p.UpdateOn,p.uid,p.CatID,p.datecreated, u.id as userID,u.username,u.image as userImage,c.catId,c.name as category from posts p join category c on p.CatID = c.catId join users u on u.id=p.uid where c.name = $1 order by p.id Desc")
      : (q =
          "select p.id,p.title,p.description,p.image,p.UpdateOn,p.uid,p.CatID,p.datecreated, u.id as userID,u.username,u.image as userImage,c.catId,c.name as category from posts p join category c on p.CatID = c.catId join users u on u.id=p.uid order by p.id Desc");
          psPool.query(q, cat, (err, data) => {
            if(err){
              console.log(err)
             return res.status(500).json(err);
            }
        res.status(200).json(data.rows);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addPost = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not Authenticated!");
    jwt.verify(token, "s3cr3t", (err, userInfo) => {
      if (err) return res.status(403).json("Authentication token Not Valid");
      const q = "INSERT INTO posts (title, description, image, CatID, uid) VALUES ($1, $2, $3, $4, $5) RETURNING id";
      const q2 =
        "insert into postsStatus (`postId`,`statusId`,`createdBy`,`publishedBy`) VALUES ($1, $2, $3, $4)";

      const postParams = [
        req.body.title,
        req.body.description,
        req.body.image,
        req.body.CatID,
        userInfo.id,
      ];

      db.query(q, postParams, async (err, data) => {
        if (err) {
          return res.status(500).json("cannot insert the data query 1");
        } else {
          const insertedId =  data.rows[0].id;
          if (insertedId > 0) {
            const postStatusParams = [
              insertedId,
              req.body.statusId,
              userInfo.id,
              userInfo.id,
            ];
            db.query(q2, postStatusParams, (err, data) => {
              if (err) {
                console.log(err);
                db.query(
                  "delete from posts where id=($1)",
                  [insertedId],
                  () => {}
                );
                return res
                  .status(500)
                  .json(
                    "An error occured creating post status details, reverted back ...."
                  );
              } else {
                return res.status(200).json("Post Successful Created");
              }
            });
          } else {
            console.log(err);
            db.query("delete from posts where id=($1)", insertedId, () => {});
            return res
              .status(500)
              .json("Failed to retrieve inserted post ID. reverting back ...");
          }
        }
      });
    });
  } catch (error) {
    res.json(error);
  }
};

const getPost = (req, res) => {
  try {
    console.log('1234567')
    const q =
    "select p.id,p.title,p.description,p.image,p.UpdateOn,p.uid,p.CatID,p.datecreated, u.id as userID,u.username,u.image as userImage,c.catId,c.name as category from posts p join category c on p.CatID = c.catId join users u on u.id=p.uid where p.id = $1 order by p.id Desc";
  db.query(q, req.params.id, (err, data) => {
    if (err){
console.log(err)
return res.status(500).json(err);
    } 
    if (data.rows.length) return res.status(200).json(data[0]);
  });
  } catch (error) {
    console.log(error)
  }

};

// const deletePost = (req, res) => {

// };

const deleteData = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  jwt.verify(token, "s3cr3t", (err, userInfo) => {
    if (err) return res.status(403).json("Authentication token Not Valid!");

    const q = "delete from posts where id = $1 and uid = $2";
    db.query(q, [req.params.id, userInfo.id], (err, data) => {
      if (err) {
        return res.status(403).json("You can delete only you post!");
      } else {
        return res.status(200).json(`Delete record with id ${req.params.id}`);
      }
    });
  });
};

const putPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  jwt.verify(token, "s3cr3t", (err, userInfo) => {
    if (err) return res.status(403).json("Authentication token Not Valid!");
    const q = "UPDATE posts SET title = $1, description = $2, image = $3, CatID = $4 WHERE id = $5 AND uid = $6";
    const params = [
      req.body.title,
      req.body.description,
      req.body.image,
      req.body.CatID,
      req.params.id,
      userInfo.id,
    ];
    
    db.query(q, params, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(200).json("post updated successful");
    });
  });
};

const updatePost = (req, res) => {
  res.json("GET request to the homepage");
};
module.exports = {
  addPost,
  getPosts,
  getPost,
  deleteData,
  putPost,
  updatePost,
};
