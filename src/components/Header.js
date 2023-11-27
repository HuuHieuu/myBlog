import React, { useState, useEffect } from 'react';

function Header() {
    const [backgroundImage, setBackgroundImage] = useState([
        "url('http://congnghevadoisong.vn/files/VPBANK_HANOI_MARATHON_2022_1.jpg')",
        "url('http://congnghevadoisong.vn/files/VPBANK_HANOI_MARATHON_2022_3.jpg')",
        "url('https://doanhnhanplus.vn/wp-content/uploads/2017/11/24132052_163691874229099_7935479807625083105_o.jpg')"
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
                            <h1>BLOG <br/> CHO CÁC RUNNER</h1>
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
