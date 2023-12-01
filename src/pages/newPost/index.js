
import MyEditor from "../../components/MyEditor/index";
import Nav from "../../components/nav/Nav";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function NewPostEditor() {
    return ( <>
        <div>
            <Header/>
            <Nav/>
            <MyEditor/>
            <Footer/>
        </div>
    </> );
}

export default NewPostEditor;