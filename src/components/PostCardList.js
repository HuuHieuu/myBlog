import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';

export default function CardList({categoryId, displayMode}) {
  
  const [posts, setPosts] = useState([]);
  const [postByCategory, setPostByCategory] = useState([])

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/blog/posts/category/${categoryId}`)
    .then(response => {
      setPostByCategory(response.data);
    })
    .catch(error => {
      console.error('Error fetching posts by category:', error.message);
      setPostByCategory([]);
    });
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // published = true
        const response = await axios.get('http://localhost:8080/api/blog/posts/publised');
        const sortedPosts = response.data.sort((a, b) => {
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        });
        const latestSixPosts = sortedPosts.slice(0, 6);

        setPosts(latestSixPosts);
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
      {displayMode && (
        <PostCard posts={postByCategory}/>
      )}
    </div>
  );
}
