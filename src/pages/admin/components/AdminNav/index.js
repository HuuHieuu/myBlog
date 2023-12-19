import { useUserContext } from "../../../../components/Context/UserContext"
import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import './AdminNav.css'
import avatar from '../../../../assets/image/avatar1.jpeg'

function AdminNav() {
    const {isLoggedIn, user, logout } = useUserContext();
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

    const handleLogout =() =>{
        localStorage.removeItem('accessToken')
    }


    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav" style={{position:'relative', backgroundColor:'rgb(51 81 115)'}}>
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" to="/">Blog Không Tên</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/" onClick={handleLogout}>
                                ĐĂNG XUẤT
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      </>
    );
}

export default AdminNav;
