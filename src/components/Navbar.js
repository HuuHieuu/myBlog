import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect,useCallback  } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaSearch} from 'react-icons/fa';
import {isAuthenticated} from '../utils/auth'
import './NavBar.css';
import axios from "axios";
import avatar from '../assets/image/avatar1.jpeg'
import logo from '../assets/image/logo2.png'


function Navbar() {
    const [loggedIn, setLoggedIn] = useState(isAuthenticated());
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults2, setSearchResults2] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const displayMode = 'search'
    const navigate = useNavigate();

    const handleTitleClick=(id)=>{
        navigate(`/posts/${id}`);
    }
    

    const handleSearch = async() => {
        if (searchTerm.trim() !== '') {
            try {
                const response = await axios.get(`http://localhost:8080/api/blog/posts/keyword/${searchTerm}`);
                const publishedResults = response.data.filter(post => post.published);
                setSearchResults(publishedResults);
                // setSearchResults(response.data);
                console.log('After handleSearch - searchResults:', searchResults);
            } catch (error) {
                console.error('Error fetching user by ID:', error.message);
                setSearchResults([]);
            }
        }else{
            setSearchResults([])
        }
        console.log('After handleSearch - searchResults:', searchResults);
    };

    useEffect(() => {
        // useEffect này sẽ chạy mỗi khi searchResults thay đổi
        console.log('Updated searchResults:', searchResults);
    }, [searchResults]);

    const handleSearchInputChange = (event) => {
        event.persist(); // Giữ lại sự kiện
      
        setSearchTerm(event.target.value);
      };

    const handleKeyDown = (event)=>{
        if (event.key === 'Enter') {
            console.log('searchTerm Value:', searchTerm);
            console.log('Before handleSearch - searchTerm:', searchTerm);
            handleSearch();
          }
    }

    useEffect(()=>{
        const fetchPost = async () => {
            try {
              const response = await axios.get(`http://localhost:8080/api/blog/users/info`);
              setUser(response.data);
            //   console.log('User:', response.data);
            // console.log(user.profile)
            } catch (error) {
              console.error('Error fetching post:', error.message);
            }
          };
          fetchPost();
    },[])

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

    


    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" to="/">
                    <img src={logo}/>
                    {/* Blog */}
                </Link>
                <div className="input-wrapper">
                    <FaSearch id="search-icon" onClick={handleSearch}/>
                    <input placeholder="Tìm kiếm"
                        name="search-term" 
                        id="search-post-input"
                        value={searchTerm}
                        onChange={(e)=>setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{position:'relative'}}
                    />
                    {searchResults && searchResults.length > 0 && (
                        <div style={{position:'absolute',top:'57px', left:'22.5%',backgroundColor:'#ddd6d645', width:'31%'}}>
                            <ul style={{padding:0}}>
                                {searchResults.map((result) => (
                                <li key={result.id} style={{listStyleType:'none', boxShadow:'0px 0px 20px #ddd'}}>
                                {/* </li> */}
                                 {/* <PostCardList postsBySearch={searchResults} displayMode="search" /> */}
                                    <div style={{display:'flex',width:'100%',justifyContent:'space-between', color:'white', cursor:'pointer'}} onClick={()=>handleTitleClick(result.id)}>
                                        {result.title}
                                        {/* <div style={{width:'30%',marginLeft:'2%'}}><img style={{width:'100%'}} src={result.thumbnail}/></div> */}
                                    </div>
                                 </li>
                                ))}
                            </ul>
                        </div>
                    )}
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
                        {/* <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="index.html">GIỚI THIỆU</Link></li> */}
                        <li className="nav-item">
                            {loggedIn ? (
                                <div className="user-avatar">
                                    <img className="user-avatar-df" src={user && user.profile ? user.profile : avatar} alt="User"  onClick={() => setMenuOpen(!isMenuOpen)}/>
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
