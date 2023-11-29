import React from "react";

import PostContent from "./postContent";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CommentBox from '../../components/comment/CommentBox'

const Post = () =>{
    return(
        <div>
            <Navbar/>
            <PostContent/>
            <CommentBox/>
            <Footer/>
        </div>
    )
}

export default Post;