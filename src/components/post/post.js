import React from "react";

import PostContent from "./postContent";
import Footer from "../Footer";
import Navbar from "../Navbar";

const Post = () =>{
    return(
        <div>
            <Navbar/>
            <PostContent/>
            <Footer/>
        </div>
    )
}

export default Post;