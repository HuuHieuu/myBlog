import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect,  } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaSearch} from 'react-icons/fa';
import {isAuthenticated} from '../utils/auth'
import './NavBar.css';
import avatar from '../assets/image/avatar1.jpeg'


function Navbar() {
    const [loggedIn, setLoggedIn] = useState(isAuthenticated());
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();
    const handleLogout = () => {
        // Xóa token khi đăng xuất
        localStorage.removeItem('accessToken');
        setLoggedIn(false);
        // Thực hiện các bước khác sau khi đăng xuất (ví dụ: chuyển hướng)
      };
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

    const admin = () =>{
        navigate('/admin')
    }

    useEffect(() => {
        // Lấy token từ localStorage (hoặc từ nơi bạn lưu trữ token)
        const token = localStorage.getItem('accessToken');
    
        if (token) {
        //   // Giải mã token để lấy thông tin người dùng, bao gồm vai trò (role)
        //   const decodedToken = jwtDecode(token);
          
        //   // Lấy vai trò từ decoded token và cập nhật state
        //   setUserRole(decodedToken.roles);
            try {
                const decodedToken = jwtDecode(token);
                setUserRole(decodedToken.roles);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
      }, []);

      


    // useEffect(() => {



        // const categoriesMenu = document.querySelector('.nav-item.categories');
        

        // categoriesMenu.addEventListener('mouseenter', () => {
        //     categoriesMenu.querySelector('.dropdown-menu').classList.add('show');
        // });

        // categoriesMenu.addEventListener('mouseleave', () => {
        //     categoriesMenu.querySelector('.dropdown-menu').classList.remove('show');
        // });
        
    // }, []);


    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" to="/">Blog Không Tên</Link>
                <div className="input-wrapper">
                    <FaSearch id="search-icon"/>
                    <input placeholder="Tìm kiếm"/>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/">TRANG CHỦ</Link></li>
                        <li className="nav-item dropdown categories">
                            <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/allposts" id="navbarDropdown" role="button" aria-expanded="false" 
                            onClick={handleClick}
                            >
                                BÀI VIẾT
                            </Link>
                        </li>
                        <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="index.html">GIỚI THIỆU</Link></li>
                        <li className="nav-item">
                            {loggedIn ? (
                                <div className="user-avatar">
                                    <img className="user-avatar-df" src={avatar} alt="User"  onClick={() => setMenuOpen(!isMenuOpen)}/>
                                    {isMenuOpen && (
                                        <div className="menu-open">
                                            {userRole.includes('ROLE_ADMIN') && 
                                                <div className="admin-page">
                                                    <button onClick={admin}>ADMIN</button>
                                                </div>
                                            }
                                            <div className="profile">
                                                <button onClick={profile}>Hồ sơ cá nhân</button>
                                            </div>
                                            <div className="logout-menu">
                                                <button onClick={handleLogout}>Đăng xuất</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/login">
                                    ĐĂNG NHẬP
                                </Link>
                            )}
                            {/* <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/login">ĐĂNG NHẬP</Link> */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      </>
    );
}

export default Navbar;
