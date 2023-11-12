import React from "react";

import Header from "../../components/Header";
import NavBar from "../../components/Navbar";
import MainContent from "./HomeMainContent";
import Footer from "../../components/Footer";

function Home(){
    return(
        <div>
            <Header/>
            <NavBar/>
            <MainContent/>
            <Footer/>
        </div>
    );
}

export default Home;