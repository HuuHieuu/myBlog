import React from "react";

import NavBar from "../../components/Navbar";
import AuthorHeader from "../authors/AuthorHeader";
import AuthorMain from "./AuthorMain";
import Footer from "../../components/Footer";

function Author(){
    return(
        <div>
            <NavBar/>
            <AuthorHeader/>
            <AuthorMain/>
            <Footer/>
        </div>
    );
}

export default Author;