import React, {useState} from 'react';
import PostCardList from '../PostCardList';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function MainContent() {
    const MenuIcon = <FontAwesomeIcon icon={faBars} />;

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
        border: '1px solid #e9ecef',
        borderRadius: '4px',
        padding: '10px',
        marginBottom: '0', 
        width: '100%', 
    };

    const menuTitleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between'
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
        paddingLeft: '5px', 
        fontSize: '18px'
    };

    return (
        <div className="container-fluid px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-2" style={{padding:0}}>
                    <div style={menuStyle}>
                        <div style={menuTitleStyle} onClick={toggleMenu}>
                            Danh Mục{MenuIcon}
                            {menuOpen}
                        </div>
                        {menuOpen && (
                            <>
                                <hr></hr>
                                <Link style={{...menuItemStyle, ...subMenuItemStyle}} to="#">Danh Mục 1</Link>
                                <Link style={{...menuItemStyle, ...subMenuItemStyle}} to="#">Danh Mục 2</Link>
                                <Link style={{...menuItemStyle, ...subMenuItemStyle}} to="#">Danh Mục 3</Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="col-md-9">
                    <h1>Thời Sự</h1>
                    <PostCardList/>
                </div>
            </div>
            <a style={roundButtonStyle} href="#top">↑</a>
        </div>
    );
}

export default MainContent;
