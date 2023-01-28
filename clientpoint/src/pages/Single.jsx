import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import Menu from "../Component/Menu";

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://images.unsplash.com/photo-1617709612173-d820eb8b862f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1863&q=80"
          alt="imageone"
        />
        <div className="user">
          <img
            src="https://images.unsplash.com/photo-1563995103864-d87d3c1fdd39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1936&q=80"
            alt="user"
            srcset=""
          />
          <div className="info">
            <span>John</span>
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
        <h1>Lorem ipsum dolor  cumque voluptatem. Consectetur veritatis hic, </h1>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis vitae cum similique, illo minima aliquid? Molestias molestiae perferendis architecto officia voluptatem? Labore neque laborum minus, nemo voluptate
         ipsum earum accusamus?400consequuntur maiores enim eius!
         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum similique dignissimos, assumenda, eveniet nisi neque sequi repellat, aperiam voluptas tenetur atque! Illum sit nihil vel ea magnam dolorem doloremque consequuntur.
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet blanditiis corporis quae sed beatae sint, consectetur ipsa illum expedita itaque! Inventore vel omnis totam asperiores numquam doloremque quae culpa odio!
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis necessitatibus minus hic aliquid recusandae aperiam fugiat atque? Fugit ad, illo doloremque neque odio earum possimus facilis eligendi architecto voluptates? Temporibus?
         lo500 sit amet  nulla eius earum 
         500:Lorem consectetur adipisicing elit. Ea doloribus, rem minus eveniet officiis optio animi reprehenderit quas
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, esse, qui voluptates laborum nisi, eaque asperiores tempore sed ullam aspernatur fuga porro earum! Quam error, atque deserunt architecto eveniet nesciunt?
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt ullam corrupti eius labore possimus inventore illo ut minus, qui ducimus laudantium delectus repudiandae fugit pariatur reprehenderit nemo error beatae voluptatem?
         </p>
      </div>
     <Menu/>
    </div>
  );
};

export default Single;
