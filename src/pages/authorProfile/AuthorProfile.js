// Trong AuthorProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import avatar from '../../assets/image/avatar1.jpeg'
import axios from 'axios';
import Navbar from '../../components/Navbar';
import PostCardList from '../../components/PostCardList';
import Footer from '../../components/Footer';

function AuthorProfile() {
  const { authorId } = useParams();
  const [authorPosts, setAuthorPosts] = useState([])
  const [authorInfo, setAuthorInfo] = useState(null);
  const [profile, setProfile] = useState('')

  const displayMode = 'ap'

  useEffect(() => {
    const fetchAuthorInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/blog/users/${authorId}`);
        setAuthorInfo(response.data);
      } catch (error) {
        console.error('Error fetching author info:', error.message);
      }
    };

    fetchAuthorInfo();
  }, [authorId]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        // Gọi API để lấy danh sách bài viết của người dùng
        const userPostsResponse = await axios.get(`http://localhost:8080/api/blog/posts/author/${authorId}`);
        
        // Lọc những bài viết đã xuất bản
        const publishedUserPosts = userPostsResponse.data.filter(post => post.published);
  
        // Set state chỉ với những bài viết đã xuất bản
        setAuthorPosts(publishedUserPosts);
      } catch (error) {
        console.error('Error fetching user posts:', error.message);
        setAuthorPosts([]);
      }
    };
  
    fetchUserPosts();
  }, []);

  return (
    <>
        <Navbar/>
        <header className="masthead" style={{backgroundImage: `url("https://xdcs.cdnchinhphu.vn/446259493575335936/2023/8/23/dhxd-1692750442833376701747.jpg")`}}>
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        {authorInfo && (
                            <table style={{ width: '100%' }}>
                                <tr>
                                    <td>
                                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                            <img
                                                src={ profile || authorInfo.profile || avatar}
                                                style={{
                                                    width: 220,
                                                    height: 220,
                                                    borderRadius: '50%'
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td colSpan={2}>
                                        <div className="site-heading">
                                            <h2>{authorInfo.firstName} {authorInfo.lastName}</h2>
                                            <span className="subheading">
                                                {/* <i>
                                                    "{authorInfo.intro}"
                                                </i> */}
                                                <img height="25" src="https://upload.wikimedia.org/wikipedia/commons/0/07/Flag_of_Vietnam-Animated.gif" style={{ marginLeft: '5px' }} alt="Vietnam Flag"></img>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </header>
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <h1>Các Bài Viết</h1>
                <div className="col-md-9">
                    <PostCardList displayMode={displayMode} postsAP={authorPosts}/>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  );
}

export default AuthorProfile;
