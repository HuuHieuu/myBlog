import React, { useState, useEffect, useRef } from 'react';
import PostCardList from '../../components/PostCardList';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TopButton from '../../components/TopButton';
import './AllPostMainContent.css';
import Navbar from '../../components/Navbar';
import { red } from '@mui/material/colors';

const tabItems = [
  {label: 'Esport'},
  {label: 'Thời trang'},
  {label: 'Thể thao'}
]

function MainContent() {
  const contentRef = useRef(null);
  const MenuIcon = <FontAwesomeIcon icon={faBars} style={{ marginTop: '5px' }}/>;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab,setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  }
  useEffect(() => {
    console.log(activeTab);
    // contentRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [activeTab]);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };
  

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
                  {tabItems.map((item, tabIndex) =>(
                    <li className="tab"
                      role='tab'
                      aria-selected={activeTab === tabIndex}
                      onClick={()=>{
                        handleTabClick(tabIndex)
                      }}
                    >
                      <button aria-pressed={activeTab == tabIndex}>{item.label}</button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <div className="col-md-9">
          {activeTab === 0 && (
            <div id='content0'>
              <h1>{tabItems[activeTab].label}</h1>
              <PostCardList />
            </div>
          )}
          {activeTab === 1 && (
            <div id='content1'>
              <h1>{tabItems[activeTab].label}</h1>
              <PostCardList/>
            </div>
          )}
          {activeTab === 2 && (
            <div id='content2'>
              <h1>{tabItems[activeTab].label}</h1>
              <PostCardList/>
            </div>
          )}
        </div>
      </div>
      <TopButton/>
    </div>
  );
}

export default MainContent;
