// Trong file PostContent.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import CardMedia from '@mui/material/CardMedia';


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
        <h1 style={{textAlign:'center'}}>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        {/* <p>{post.content}</p> */}
        {/* Hiển thị nội dung và thông tin khác của bài viết */}
        {/* Ví dụ: <p>{post.content}</p> */}
      </div>
    </div>
  );
};

export default PostContent;
