import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import {isAuthenticated} from '../../utils/auth'
import MyEditor from '../MyEditor';
import './NewPost.css'
function NewPost() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(isAuthenticated());
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(()=>{
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/blog/users/info`);
          const userData = response.data;
          setRole(userData.roles.role);
        } catch (error) {
          console.error('Error fetching post:', error.message);
        }
      };
      fetchPost();
    },[])


    const handleNewPostClick = () => {
        if (loggedIn) {
          // Người dùng đăng nhập, chuyển hướng đến trang tạo bài viết mới
          navigate('/admin');
        }
         else {
          // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
          navigate('/login');
        }
      };


    return ( 
        <div className='new-post-container'>
          {role === 'ROLE_ADMIN' || role === 'ROLE_AUTHOR' ?(
            <button className="new-post-button" onClick={handleNewPostClick}>
                <FontAwesomeIcon icon={faPlus} />
                Bài viết mới
            </button>
          ):null}
        </div>
     );
}

export default NewPost;