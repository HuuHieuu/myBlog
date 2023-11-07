import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Outlet, Link } from "react-router-dom";

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://i1-dulich.vnecdn.net/2022/05/11/hoan-kiem-lake-7673-1613972680-1508-1652253984.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=2wB1cBTUcNKuk68nrG6LMQ"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" textAlign="left"> 
          Demo Thẻ Bài Viết
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="left"> 
          Hiển thị một phần trích nhỏ của bài viết này,
          cho người dùng đọc qua ở đây!
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="left"> 
          <i>
            <br></br>
            Đăng bởi <Link to={"#"}>TÊN NGƯỜI VIẾT</Link>
            <br></br>
          </i>
          <br></br>07/11/2023
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Chi Tiết</Button>
      </CardActions>
    </Card>
  );
}
