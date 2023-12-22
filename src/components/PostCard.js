import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from './PostCard.module.scss'
import { format } from 'date-fns';

export default function MediaCard({posts}) {
  const navigate = useNavigate();
  const handleAuthorClick=(authorId)=>{
    navigate(`/profile/${authorId}`)
  }
  return (
    <div className={styles.cardContainer}>
      {posts.map(post => (
        <Link  key={post.id} sx={{ maxWidth: 345, margin: '10px' }}>
          <Link to={`/posts/${post.id}`}>
            <CardMedia
              sx={{ height: 140 }}
              image={post.thumbnail || null}
              title={post.title || 'Không-có-tiêu-đề'}
            />
          </Link>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign="left">
              <Link  to={`/posts/${post.id}`}>
                {post.title || 'Không-có-tiêu-đề'}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="left">
              {post.summary || 'Nội dung-mặc-định-nếu-không-có-nội-dung'}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="left" style={{position:'relative'}}>
              <i>
                <br />
                Đăng bởi: 
                <Link to={`/profile/${post.author && post.author.id}`} onClick={()=>handleAuthorClick(post.author.id)}>
                  {post.author && post.author.firstName || 'TÊN NGƯỜI VIẾT'}
                </Link>
                <br />
                {/* 
                {post.date || 'Ngày đăng-mặc-định-nếu-không-có-ngày-đăng'}{/* Thay thế ngày đăng mặc định */}
                <span>View: {post.views}</span>
                <span style={{position:'absolute', right:'0'}}>UpdatedAt: {format(new Date(post.updatedAt), 'dd/MM/yyyy HH:mm')}</span>
              </i>
              <br />
            </Typography>
          </CardContent>
        </Link>
       ))} 
    </div>
  );
}
