import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';

export default function CardList() {
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/blog/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);
  // style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}
  return (
    <div>
      <PostCard posts={posts}/>
    </div>
  //   <div>
  //   {posts.map((post) => (
  //     <div key={post.id}>
  //       <Link to={`/posts/${post.id}`}>
  //         {/* Render component PostCard here if needed */}
  //          <PostCard posts={posts}/>

  //       </Link>
  //       {/* Hiển thị một số thông tin khác của bài viết nếu cần */}
  //     </div>
  //   ))}
  // </div>
  );
}
