import { useUserContext } from "../Context/UserContext";
import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import './Nav.css';

function Navbar({style}) {
    const { isLoggedIn, user, logout } = useUserContext();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        // Thực hiện chuyển hướng đến '/onepost'
        navigate('/onepost');
    
        // Sau khi chuyển hướng, cuộn đến phần tử có id là 'targetElement'
        setTimeout(() => {
          const targetElement = document.getElementById('content');
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
    };

    const profile = () =>{
        navigate('/profile')
    }


    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div className="container px-4 px-lg-5">
                <Link style={{color:'black'}} className="navbar-brand" to="/">Blog Không Tên</Link>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item"><Link style={{color:'black'}} className="nav-link px-lg-3 py-3 py-lg-4" to="/">TRANG CHỦ</Link></li>
                        <li className="nav-item dropdown categories">
                            <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/allposts" id="navbarDropdown" role="button" aria-expanded="false" 
                            onClick={handleClick} style={{color:'black'}}
                            >
                                BÀI VIẾT
                            </Link>
                        </li>
                        {/* <li className="nav-item"><Link style={{color:'black'}}  className="nav-link px-lg-3 py-3 py-lg-4" to="index.html">GIỚI THIỆU</Link></li> */}
                    </ul>
                </div>
            </div>
        </nav>
      </>
    );
}

export default Navbar;
