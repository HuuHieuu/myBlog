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
  
    try {
      // Gọi API để lấy các bài post theo danh mục
      const response = await axios.get(`http://localhost:8080/api/blog/posts/category/${categoryId}`);
      setPostsByCategory(response.data);
      console.log(postsByCategory)
    } catch (error) {
      console.error('Error fetching posts by category:', error.message);
      setPostsByCategory([]);
    }
  };



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
