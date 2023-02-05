import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {


  

    useEffect(()=>
    {
        const getall = async () => {

            const {data} = await axios('/posts/dum/all');
           
            console.log(data)
        }
        getall()
    },[])
    return (
        <div>
            <h1>OOOPPPSS !!! gone for lunch let go back home and use another office

            </h1>
            <button><Link to="/">Click here it safe</Link></button>
        </div>
    );
};

export default NotFound;