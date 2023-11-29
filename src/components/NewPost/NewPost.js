import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../Context/UserContext';
import './NewPost.css'
function NewPost() {
    const navigate = useNavigate();
    const { isLoggedIn } = useUserContext();

    const handleNewPostClick = () => {
        if (isLoggedIn) {
          // Người dùng đăng nhập, chuyển hướng đến trang tạo bài viết mới
          navigate('/new-post');
        } else {
          // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
          navigate('/login');
        }
      };


    return ( 
        <div className='new-post-container'>
            <button className="new-post-button" onClick={handleNewPostClick}>
                <FontAwesomeIcon icon={faPlus} />
                Bài viết mới
            </button>
        </div>
     );
}

export default NewPost;