import React, {useState} from 'react'

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
            <button className="new-post-button" onClick={handleNewPostClick}>
                <FontAwesomeIcon icon={faPlus} />
                Bài viết mới
            </button>
        </div>
     );
}

export default NewPost;