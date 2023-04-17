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
          "select p.id,p.title,p.description,p.image,p.UpdateOn,p.uid,p.CatID,p.datecreated, u.id as userID,u.username,u.image as userImage,c.catId,c.name as category from posts p join category c on p.CatID = c.catId join users u on u.id=p.uid where c.name = ? order by p.id Desc")
      : (q =
          "select p.id,p.title,p.description,p.image,p.UpdateOn,p.uid,p.CatID,p.datecreated, u.id as userID,u.username,u.image as userImage,c.catId,c.name as category from posts p join category c on p.CatID = c.catId join users u on u.id=p.uid order by p.id Desc");
    db.query(q, cat, (err, data) => {
      if (data.length) {
        res.status(200).json(data);
      } else {
        res.status(500).json(err);
      }
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
      const q =
        "insert into posts (`title`,`description`,`image`,`CatID`,`uid`) VALUES (?)";
      const q2 =
        "insert into postsStatus (`postId`,`statusId`,`createdBy`,`publishedBy`) VALUES (?)";

      const postParams = [
        req.body.title,
        req.body.description,
        req.body.image,
        req.body.CatID,
        userInfo.id,
      ];

      db.query(q, [postParams], async (err, data) => {
        if (err) {
          return res.status(500).json("cant insert the data query 1");
        } else {
          const insertedId = await data.insertId;
          if (insertedId > 0) {
            const postStatusParams = [
              insertedId,
              req.body.statusId,
              userInfo.id,
              userInfo.id,
            ];
            db.query(q2, [postStatusParams], (err, data) => {
              if (err) {
                console.log(err);
                db.query(
                  "delete from posts where id=(?)",
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
            db.query("delete from posts where id=(?)", [insertedId], () => {});
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
  const q =
    "select p.id,p.title,p.description,p.image,p.UpdateOn,p.uid,p.CatID,p.datecreated, u.id as userID,u.username,u.image as userImage,c.catId,c.name as category from posts p join category c on p.CatID = c.catId join users u on u.id=p.uid where p.id = ? order by p.id Desc";
  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(200).json(data[0]);
  });
};

// const deletePost = (req, res) => {

// };

const deleteData = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not Authenticated!");

  jwt.verify(token, "s3cr3t", (err, userInfo) => {
    if (err) return res.status(403).json("Authentication token Not Valid!");

    const q = "delete from posts where id = ? and uid = ?";
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

    const q =
      "update posts set title = ?,description = ?,image = ?,CatID = ? where id=? and uid = ?";
    const params = [
      req.body.title,
      req.body.description,
      req.body.image,
      req.body.CatID,
    ];
    const postId = req.params.id;
    db.query(q, [...params, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
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
