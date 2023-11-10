import React from "react";

import NavBar from "../Navbar";
import AuthorHeader from "./AuthorHeader";
import AuthorMain from "./AuthorMain";
import Footer from "../Footer";

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