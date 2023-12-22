import React from "react";
import { useParams } from "react-router-dom";

import NavBar from "../../components/Navbar";
import AuthorHeader from "../authors/AuthorHeader";
import AuthorMain from "./AuthorMain";
import Footer from "../../components/Footer";

function Author(){
    // const { authorId } = useParams();
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