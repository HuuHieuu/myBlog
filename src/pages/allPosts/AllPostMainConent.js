import React, { useState, useEffect, useRef } from 'react';
import PostCardList from '../../components/PostCardList';
import { Link, useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TopButton from '../../components/TopButton';
import './AllPostMainContent.css';
import Navbar from '../../components/Navbar';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { FaCommentsDollar } from 'react-icons/fa';

function MainContent() {
  const contentRef = useRef(null);
  const MenuIcon = <FontAwesomeIcon icon={faBars} style={{ marginTop: '5px' }}/>;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab,setActiveTab] = useState(null);
  const [categories, setCategories] = useState([]);
  const [displayMode, setDisplayMode] = useState('all'); 
  const [postsByCategory, setPostsByCategory] = useState([])
  const [posts, setPosts] = useState([]);


  const location = useLocation();
  const { pathname } = location;




  useEffect(()=>{
    if (pathname === '/allposts') {
      axios.get(`http://localhost:8080/api/blog/posts/category/1`)
      .then(response => {
        setPostsByCategory(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts by category:', error.message);
      setPostsByCategory([]);
      });  
    }
  },[pathname])

  const handleTabClick = async (index, categoryId) => {
    setActiveTab(index);
  
    // try {
    //   // Gọi API để lấy tất cả các bài viết trong danh mục
    //   const response = await axios.get(`http://localhost:8080/api/blog/posts/category/${categoryId}`);
    //   const postsInCategory = response.data;

    //   // Lấy index của bài viết đã xuất bản (nếu có)
    //   const publishedPostsInCategory = postsInCategory.filter(post => post.published);
  
    //   // Tạo endpoint dựa trên trạng thái xuất bản của bài viết đầu tiên trong danh mục
    //   const finalResponse = await axios.get('http://localhost:8080/api/blog/posts/publised', {
    //     posts: publishedPostsInCategory
    //   });

    //   setPostsByCategory(finalResponse.data);
    // } catch (error) {
    //   console.error('Error fetching posts by category:', error.message);
    //   setPostsByCategory([]);
    // }
    
    try {
      // Gọi API để lấy tất cả các bài viết đã xuất bản
      const publishedResponse = await axios.get('http://localhost:8080/api/blog/posts/publised');
      const publishedPosts = publishedResponse.data;
    
      // Kiểm tra xem đã có bài viết đã xuất bản hay chưa
      if (publishedPosts.length > 0) {
        // Nếu có bài viết đã xuất bản, lấy danh sách bài viết theo danh mục
        const response = await axios.get(`http://localhost:8080/api/blog/posts/category/${categoryId}`);
        const postsInCategory = response.data;
    
        // Lọc chỉ giữ lại các bài viết đã xuất bản
        const publishedPostsInCategory = postsInCategory.filter(post => post.published);
    
        // Sử dụng danh sách bài viết đã xuất bản từ publishedResponse hoặc publishedPostsInCategory
        setPostsByCategory(publishedPostsInCategory); // Hoặc setPostsByCategory(publishedPostsInCategory);
      } else {
        // Nếu không có bài viết đã xuất bản, lấy danh sách bài viết theo danh mục trực tiếp
        const response = await axios.get(`http://localhost:8080/api/blog/posts/category/${categoryId}`);
        setPostsByCategory(response.data);
      }
    } catch (error) {
      console.error('Error fetching posts by category:', error.message);
      setPostsByCategory([]);
    }
    



  };

  useEffect(() => {
    console.log(postsByCategory);
  }, [postsByCategory]);
  



  useEffect(() => {
    console.log(activeTab);
    // contentRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [activeTab]);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/blog/categories`)
    .then(response => {
      setCategories(response.data);
      console.log(categories)
    })
    .catch(error => {
      console.error('Error fetching posts by category:', error.message);
      setCategories([]);
  });
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // published = true
        const response = await axios.get('http://localhost:8080/api/blog/posts/publised');
        const sortedPosts = response.data.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        const latestSixPosts = sortedPosts.slice(0, 6);

        setPosts(latestSixPosts);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div className="container-fluid px-4 px-lg-5" id='content'>
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-2" style={{ padding: 0 }}>
          <div className="menu">
            <div className="menu-title" onClick={toggleMenu}>
              Danh Mục{MenuIcon}
              {menuOpen}
            </div>
            {menuOpen && (
              <>
                <hr></hr>
                <ul role='tablist' style={{margin:'0', padding:'0'}}>
                  {categories.map((category, tabIndex) =>(
                    <li className="tab"
                      role='tab'
                      aria-selected={activeTab === tabIndex}
                      onClick={()=>{
                        handleTabClick(tabIndex, category.id)
                        setDisplayMode('byCate')
                      }}
                    >
                      <button aria-pressed={activeTab == tabIndex}>{category.title}</button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="col-md-9">

          {displayMode && (
          <div>
            <h1>{categories[activeTab]?.title}</h1>
            <PostCardList categoryId={categories[activeTab]?.id} displayMode={displayMode} postsByCategory={postsByCategory}/>
          </div>
          
        )}
        </div>
      </div>
      <TopButton/>
    </div>
  );
}

export default MainContent;
