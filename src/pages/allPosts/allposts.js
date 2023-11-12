import React, {useState} from 'react';

import Header from "../../components/Header";
import NavBar from "../../components/Navbar";
import MainContent from './AllPostMainConent';
import Footer from "../../components/Footer";

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