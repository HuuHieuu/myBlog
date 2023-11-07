import React, { useState, useEffect } from 'react';

function Header() {
    const [backgroundImage, setBackgroundImage] = useState([
        "url('https://i1-dulich.vnecdn.net/2022/05/11/hoan-kiem-lake-7673-1613972680-1508-1652253984.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=2wB1cBTUcNKuk68nrG6LMQ')",
        "url('https://a.cdn-hotels.com/gdcs/production7/d644/58a05166-51bf-4797-9cda-33da7db7233f.jpg?impolicy=fcrop&w=1600&h=1066&q=medium')",
        "url('https://images.unsplash.com/photo-1555921015-5532091f6026?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
    ]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % backgroundImage.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [backgroundImage]);

    return (
        <header className="masthead" style={{
            backgroundImage: backgroundImage[currentImageIndex],
            transition: 'background-image 1s ease-in-out'
        }}>
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="site-heading">
                            <h1>BLOG <br/> "KHÔNG TÊN"</h1>
                            <span className="subheading">
                                Một trang blog nhỏ từ Thủ đô Hà Nội
                                <img height="25" src="https://upload.wikimedia.org/wikipedia/commons/0/07/Flag_of_Vietnam-Animated.gif" style={{ marginLeft: '5px' }} ></img>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
