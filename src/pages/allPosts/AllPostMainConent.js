import React, { useState } from 'react';
import PostCardList from '../../components/PostCardList';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import TopButton from '../../components/TopButton';
import './AllPostMainContent.css';

function MainContent() {
  const MenuIcon = <FontAwesomeIcon icon={faBars} style={{ marginTop: '5px' }}/>;
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleMenuItemHover = (e) => {
    e.target.style.backgroundColor = e.type === 'mouseover' ? '#F7F7F7' : '#fff';
  };

  return (
    <div className="container-fluid px-4 px-lg-5">
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
                <Link
                  className="menu-item sub-menu-item"
                  to="#"
                  onMouseOver={handleMenuItemHover}
                  onMouseOut={handleMenuItemHover}
                >
                  Danh Mục 1
                </Link>
                <Link
                  className="menu-item sub-menu-item"
                  to="#"
                  onMouseOver={handleMenuItemHover}
                  onMouseOut={handleMenuItemHover}
                >
                  Danh Mục 2
                </Link>
                <Link
                  className="menu-item sub-menu-item"
                  to="#"
                  onMouseOver={handleMenuItemHover}
                  onMouseOut={handleMenuItemHover}
                >
                  Danh Mục 3
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="col-md-9">
          <h1>Thời Sự</h1>
          <PostCardList />
        </div>
      </div>
      <TopButton/>
    </div>
  );
}

export default MainContent;
