import React, { useEffect } from "react";

function Navbar() {
    useEffect(() => {
        // Thêm sự kiện hover vào mục "Categories"
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
                <a className="navbar-brand" href="index.html">Blog Không Tên</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="index.html">TRANG CHỦ</a></li>
                        <li className="nav-item dropdown categories">
                            <a className="nav-link px-lg-3 py-3 py-lg-4" href="#" id="navbarDropdown" role="button" aria-expanded="false">
                                DANH MỤC
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Danh Mục 1</a></li>
                                <li><a className="dropdown-item" href="#">Danh Mục 2</a></li>
                                <li><a className="dropdown-item" href="#">Danh Mục 3</a></li>
                            </ul>
                        </li>
                        <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="index.html">GIỚI THIỆU</a></li>
                        <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="about.html">LIÊN HỆ</a></li>
                        <li className="nav-item"><a className="nav-link px-lg-3 py-3 py-lg-4" href="admin.html">ĐĂNG BÀI</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
