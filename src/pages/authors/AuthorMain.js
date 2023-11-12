import React from "react";

import TopButton from "../../components/TopButton"; 
import PostCardList from "../../components/PostCardList";
function AuthorMain(){
    return(
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <h1>Các Bài Viết</h1>
                <div className="col-md-9">
                    <PostCardList/>
                </div>
            </div>
            <TopButton/>
        </div>
    );
}

export default AuthorMain;