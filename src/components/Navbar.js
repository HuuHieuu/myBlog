import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
    useEffect(() => {
        const categoriesMenu = document.querySelector('.nav-item.categories');

        categoriesMenu.addEventListener('mouseenter', () => {
            categoriesMenu.querySelector('.dropdown-menu').classList.add('show');
        });

        categoriesMenu.addEventListener('mouseleave', () => {
            categoriesMenu.querySelector('.dropdown-menu').classList.remove('show');
        });
    }, []);

    return (
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
                            <Link className="nav-link px-lg-3 py-3 py-lg-4" to="#" id="navbarDropdown" role="button" aria-expanded="false">
                                DANH MỤC
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="#">Danh Mục 1</Link></li>
                                <li><Link className="dropdown-item" to="#">Danh Mục 2</Link></li>
                                <li><Link className="dropdown-item" to="#">Danh Mục 3</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="index.html">GIỚI THIỆU</Link></li>
                        <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="about.html">LIÊN HỆ</Link></li>
                        <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="admin.html">ĐĂNG BÀI</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
