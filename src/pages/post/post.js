import React from "react";

import PostContent from "./postContent";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

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