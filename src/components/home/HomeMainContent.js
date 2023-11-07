import React, {useState} from 'react';
import PostCardList from './PostCardList';
import { Outlet, Link } from "react-router-dom";

function MainContent() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    const roundButtonStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '25px',
        backgroundColor: '#fff',
        fontSize: 30,
        color: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '999',
        textDecoration: 'none',
        border: '2px solid black',
    };

    const menuStyle = {
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '4px',
        padding: '10px',
        marginBottom: '0', 
        width: '100%', 
    };

    const menuTitleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px'
    };

    const menuItemStyle = {
        paddingLeft: '0', 
        textDecoration: 'none',
        color: '#343a40',
        display: 'block',
        transition: 'background-color 0.2s',
        textAlign: 'left' 
    };

    const subMenuItemStyle = {
        paddingLeft: '20px', 
    };

    const menuItemHoverStyle = {
        backgroundColor: '#e9ecef'
    };

    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-3" style={{paddingTop:20}}>
                    <div style={menuStyle}>
                        <div style={menuTitleStyle} onClick={toggleMenu}>
                            Danh Mục
                            {menuOpen}
                        </div>
                        {menuOpen && (
                            <>
                                <Link style={{...menuItemStyle, ...subMenuItemStyle}} to="#">Danh Mục 1</Link>
                                <Link style={{...menuItemStyle, ...subMenuItemStyle}} to="#">Danh Mục 2</Link>
                                <Link style={{...menuItemStyle, ...subMenuItemStyle}} to="#">Danh Mục 3</Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="col-md-9">
                    <PostCardList/>
                </div>
                <div className="d-flex justify-content-end mb-4">
                    <Link
                        className="btn btn-primary text-uppercase" 
                        style={{
                        marginRight: 30, 
                        color: 'black', 
                        backgroundColor: '#fff', 
                        border: '1px solid black',
                        transition: 'background-color 0.3s, color 0.3s' 
                        }} 
                        to="#!"
                        onMouseOver={(e) => {e.target.style.color = '#fff'; e.target.style.backgroundColor = '#000';}} 
                        onMouseOut={(e) => {e.target.style.color = 'black'; e.target.style.backgroundColor = '#fff';}} 
                    >
                        ĐỌC THÊM →
                    </Link>
                </div>

            </div>
            <a style={roundButtonStyle} href="#top">↑</a>
        </div>
    );
}

export default MainContent;
