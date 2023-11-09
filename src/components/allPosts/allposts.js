import React, {useState} from 'react';

import Header from "../Header";
import NavBar from "../Navbar";
import MainContent from './AllPostMainConent';
import Footer from "../Footer";

function AllPost(){
    return(
        <div>
            <Header/>
            <NavBar/>
            <MainContent/>
            <Footer/>
        </div>
    );
}

export default AllPost;