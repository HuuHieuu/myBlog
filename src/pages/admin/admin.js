import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faEyeSlash, faUser, faUserLock, faListAlt } from '@fortawesome/free-solid-svg-icons';
import './admin.css';
import AdminNav from './components/AdminNav'
import AllPost from './components/AllPost/AllPost';
import Topic from './components/Topic/Topic';
import User from './components/User/User';
import Role from './components/Role/Role';
import Unpublished from './components/Unpublished/Unpublished';
import axios from 'axios';
import MyPost from './components/MyPost/MyPost';

const tabItemsAdmin=[
    {label: "Unpublished", icon: faEyeSlash},
    {label: "Posts", icon: faFileAlt},
    {label: "Topics", icon: faListAlt},
    {label: "Users", icon: faUser},
    {label: "Roles", icon: faUserLock},
]

const tabItemsAuthor=[
    {label: "My Post", icon: faFileAlt},
    // {label: "Unpublished", icon: faEyeSlash},
    // {label: "Posts", icon: faFileAlt},
]

function Admin() {
    const [role, setRole] = useState(null);
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get('http://localhost:8080/api/blog/users/info', {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
    
            const userData = response.data;
            console.log(userData.roles.role);
            setRole(userData.roles.role);
          } catch (error) {
            console.error('Error fetching user info:', error);
          }
        };
        fetchUserInfo();
      }, []);

    const tabItems = role === 'ROLE_ADMIN' ? tabItemsAdmin : tabItemsAuthor;


    const handleTabClick = (index) =>{
        setActiveTab(index)
    }

    return ( 
        <>  
            <AdminNav/>
            <div className="admin-container">
                <div className="admin-content">
                    <div
                        style={{ overflowX: 'auto' }}
                        className="admin-tab"
                        tabIndex={0}
                        >
                        <nav className="">
                            <ul role="tablist" style={{ whiteSpace: 'nowrap' }}>
                            {tabItems.map((item, tabIndex) => (
                                <li
                                style={{ paddingRight: '5px' }}
                                // className={cx(tabClass2(tabIndex))}
                                role="tab"
                                tabIndex={activeTab === tabIndex ? 0 : -1}
                                aria-selected={activeTab === tabIndex}
                                onClick={() => handleTabClick(tabIndex)}
                                >
                                <button aria-pressed={activeTab === tabIndex} style={{display: 'flex'}}>
                                <div style={{width:'27px', height:'27px'}}>
                                    <FontAwesomeIcon icon={item.icon} size="lg" color="white" style={{width:'100%'}}/>
                                </div>
                                    <div style={{paddingLeft:'24%'}}>{item.label}</div>
                                </button>
                                </li>
                            ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* content */}
                <div className="content">
                    {role === 'ROLE_ADMIN' && (
                        <div>
                            {activeTab===0 && <Unpublished/>}
                            {activeTab===1 && <AllPost/>}
                            {activeTab===2 && <Topic/>}
                            {activeTab===3 && <User/>}
                            {activeTab===4 && <Role/>}
                        </div>
                    )}
                    {role === 'ROLE_AUTHOR' && (
                        <div>
                            {activeTab===0 && <MyPost/>}
                            {/* {activeTab===1 && <Unpublished/>}
                            {activeTab===2 && <AllPost/>} */}
                        </div>
                    )}
                </div>
            </div>
        </>
     );
}

export default Admin;