import React from "react";

import Header from "../../components/Header";
import NavBar from "../../components/Navbar";
import MainContent from "./HomeMainContent";
import Footer from "../../components/Footer";
import NewPost from "../../components/NewPost/NewPost";

function Home(){
    return(
        <div>
            <Header/>
            <NewPost/>
            <NavBar/>
            <MainContent/>
            <Footer/>
        </div>
    );
}

export default Home;