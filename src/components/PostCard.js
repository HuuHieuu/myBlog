import React, {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import axios from 'axios';
import styles from './PostCard.module.scss'

export default function MediaCard({posts}) {
  return (
    <div className={styles.cardContainer}>
      {posts.map(post => (
        <Link  to={`/posts/${post.id}`} key={post.id} sx={{ maxWidth: 345, margin: '10px' }}>
          <CardMedia
            sx={{ height: 140 }}
            image={post.thumbnail || null} // Thay thế 'URL-mặc-định-nếu-không-có-hình-ảnh' bằng URL hình ảnh mặc định
            title={post.title || 'Tiêu đề-mặc-định-nếu-không-có-tiêu-đề'} // Thay thế 'Tiêu đề-mặc-định-nếu-không-có-tiêu-đề' bằng tiêu đề mặc định
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign="left">
              {post.title || 'Tiêu đề-mặc-định-nếu-không-có-tiêu-đề'}{/* Thay thế tiêu đề mặc định */}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="left">
              {post.summary || 'Nội dung-mặc-định-nếu-không-có-nội-dung'}{/* Thay thế nội dung mặc định */}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="left">
              <i>
                <br />
                Đăng bởi {post.author && post.author.firstName || 'TÊN NGƯỜI VIẾT-mặc-định-nếu-không-có-tên-người-viết'}{/* Thay thế tên người viết mặc định */}
                <br />
                {/* 
                {post.date || 'Ngày đăng-mặc-định-nếu-không-có-ngày-đăng'}{/* Thay thế ngày đăng mặc định */}
                View: {post.views}
              </i>
              <br />
            </Typography>
          </CardContent>
        </Link>
       ))} 
    </div>
  );
}
