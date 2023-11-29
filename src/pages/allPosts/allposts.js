import React, {useState} from 'react';

import Header from "../../components/Header";
import NavBar from "../../components/Navbar";
import MainContent from './AllPostMainConent';
import Footer from "../../components/Footer";
import NewPost from "../../components/NewPost/NewPost";

function AllPost(){
    return(
        <div>
            <Header/>
            <NavBar/>
            <NewPost/>
            <MainContent/>
            <Footer/>
        </div>
    );
}

export default AllPost;