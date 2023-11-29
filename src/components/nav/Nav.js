import { Link as scrollLink, animateScroll as scroll} from 'react-scroll'
import React, { useState, useEffect,  } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaSearch} from 'react-icons/fa';
import './Nav.css';

function Nav() {
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
                        <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/login">ĐĂNG NHẬP</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
      </>
    );
}

export default Nav;
