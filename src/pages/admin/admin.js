import React, {useState} from 'react';
import './admin.css';
import AdminNav from './components/AdminNav'
import AllPost from './components/AllPost/AllPost';
import Topic from './components/Topic/Topic';
import User from './components/User/User';
import Role from './components/Role/Role';
import Permission from './components/Permission/Permission';

const tabItems=[
    {label: "Posts"},
    {label: "Topics"},
    {label: "Users"},
    {label: "Roles"},
]
function Admin() {
    const [activeTab, setActiveTab] = useState(0)
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
                                <button aria-pressed={activeTab === tabIndex}>
                                    {item.label}
                                </button>
                                </li>
                            ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* content */}
                <div className="content">
                    {activeTab===0 && <AllPost/>}
                    {activeTab===1 && <Topic/>}
                    {activeTab===2 && <User/>}
                    {activeTab===3 && <Role/>}
                </div>
            </div>
        </>
     );
}

export default Admin;