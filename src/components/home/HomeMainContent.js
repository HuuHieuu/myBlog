import React, {useState} from 'react';
import PostCardList from '../PostCardList';
import { Link } from "react-router-dom";

function MainContent() {

    const roundButtonStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '25px',
        backgroundColor: '#fff',
        fontSize: 30,
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '999',
        textDecoration: 'none',
        border: '2px solid black',
    };

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
            <a style={roundButtonStyle} href="#top">↑</a>
        </div>
    );
}

export default MainContent;
