import React from 'react';
import PostCardList from '../PostCardList';
import { Link } from "react-router-dom";
import TopButton from '../TopButton';

function MainContent() {

    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <h1>Các bài viết mới nhất</h1>
                <div className="col-md-9">
                    <PostCardList/>
                </div>
                <br></br>
                <div className="d-flex justify-content-end mb-4">
                    <Link
                        className="btn btn-primary text-uppercase" 
                        style={{
                        marginRight: 30, 
                        color: 'black', 
                        backgroundColor: '#fff', 
                        border: '1px solid black',
                        transition: 'background-color 0.3s, color 0.3s' 
                        }} 
                        to="/allposts"
                        onMouseOver={(e) => {e.target.style.color = '#fff'; e.target.style.backgroundColor = '#000';}} 
                        onMouseOut={(e) => {e.target.style.color = 'black'; e.target.style.backgroundColor = '#fff';}} 
                    >
                        ĐỌC THÊM →
                    </Link>
                </div>
            </div>
            <TopButton/>
        </div>
    );
}

export default MainContent;
