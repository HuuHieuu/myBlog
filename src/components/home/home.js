import React from "react";

import Header from "../Header";
import NavBar from "../Navbar";
import MainContent from "./HomeMainContent";
import Footer from "../Footer";

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