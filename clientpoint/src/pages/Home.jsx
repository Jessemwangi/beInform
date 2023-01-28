import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const posts = [
    {
      id: 1,
      titles: "one",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur consequatur exercitationem animi illo doloribus sit porro sint debitis ad quaerat? Illo hic fugiat quod, ducimus perferendis unde ex itaque obcaecati. lorem",
      img: "https://images.unsplash.com/photo-1674318012388-141651b08a51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
    },
    {
      id: 2,
      titles: "two",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur consequatur exercitationem animi illo doloribus sit porro sint debitis ad quaerat? Illo hic fugiat quod, ducimus perferendis unde ex itaque obcaecati. lorem",
      img: "https://images.unsplash.com/photo-1616021384135-15aae31d1a9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80",
    },
    {
      id: 3,
      titles: "three",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur consequatur exercitationem animi illo doloribus sit porro sint debitis ad quaerat? Illo hic fugiat quod, ducimus perferendis unde ex itaque obcaecati. lorem",
      img: "https://images.unsplash.com/photo-1674240568812-d7481f3699a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1828&q=80",
    },
    {
      id: 4,
      titles: "four",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur consequatur exercitationem animi illo doloribus sit porro sint debitis ad quaerat? Illo hic fugiat quod, ducimus perferendis unde ex itaque obcaecati. lorem",
img:"https://images.unsplash.com/photo-1674244988420-a85176a1fa30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"
    },
  ];
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt={post.titles} />
            </div>
            <div className="content">
                <Link to={`/post/${post.id}`}
                className="link ">
<h1>{post.titles}</h1>
                </Link>
<p>{post.desc}</p>
<button>Read more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
