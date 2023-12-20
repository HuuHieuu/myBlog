// Trong file PostContent.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import CardMedia from '@mui/material/CardMedia';
import styles from './postContent.module.scss'


const PostContent = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/blog/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error.message);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar/>
      <div>
        <CardMedia
          sx={{height: 600}}
          image={post.thumbnail}
        />
        <h1 className={styles.ckH1}>{post.title}</h1>
        <div className={styles.ckDiv}
          style={{margin:'20px 10%', textAlign:'justify'}}
        dangerouslySetInnerHTML={{ __html: post.content }} />
        {/* <p>{post.content}</p> */}
        {/* Hiển thị nội dung và thông tin khác của bài viết */}
        {/* Ví dụ: <p>{post.content}</p> */}
      </div>
    </div>
  );
};

export default PostContent;
