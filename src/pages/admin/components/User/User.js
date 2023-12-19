import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios
import '../AllPost/AllPost.css'

function User() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1); // Trang hiện tại
  const pageSize = 5 // kích thước trang
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [userRole,setUserRole] = useState(null);

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
        setUserRole(userData.roles.role);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    // Gửi yêu cầu GET đến API Endpoint /admin khi component được mount
    axios.get('http://localhost:8080/api/blog/users/admin')
      .then(response => {
        // Nếu yêu cầu thành công, cập nhật state với danh sách người dùng từ server
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách người dùng:', error.message);
      });

      console.log(users)
  }, []); // [] để đảm bảo useEffect chỉ chạy một lần khi component được mount

  const handleUserSubmitted = async () => {
    // Lấy danh sách bài viết đã cập nhật
    try {
        const response = await axios.get('http://localhost:8080/api/blog/users/admin');
        // Cập nhật trạng thái với dữ liệu mới
        setUsers(response.data);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error.message);
    }
};

  const handleEditClick = (user) => {
    setEditUser(user); // Lưu thông tin người dùng đang sửa vào state
    setShowForm(true); // Hiển thị form
    console.log(editUser)
  };

  const handleUpdateUser = async () => {
    try {
      if(userRole === 'ROLE_ADMIN'){
        // Gửi yêu cầu PUT để cập nhật người dùng
        const response = await axios.put(`http://localhost:8080/api/blog/users?id=${editUser.id}`, editUser,);
    
        // Kiểm tra xem yêu cầu thành công hay không
        if (response.status === 200) {
          // Nếu thành công, cập nhật danh sách người dùng và ẩn form sửa
          setUsers(prevUsers => prevUsers.map(user => (user.id === editUser.id ? response.data : user)));
          setShowForm(false);
          setEditUser(null);
          window.alert('User updated successfully!');
          handleUserSubmitted();
        } else {
          console.error('Lỗi khi cập nhật người dùng:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật người dùng:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
    if (!confirmed) {
        return;
    }

    try {
      // Gửi yêu cầu DELETE để xóa người dùng
      const response = await axios.delete(`http://localhost:8080/api/blog/users/admin/delete?id=${id}`);

      // Kiểm tra xem yêu cầu thành công hay không
      if (response.status === 200) {
        // Nếu thành công, cập nhật danh sách người dùng
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        window.alert('User deleted successfully');
        handleUserSubmitted();
      } else {
        console.error('Lỗi khi xóa người dùng:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };


  const click =()=>{
    console.log(users)
  }


  const handleSearch = () => {
    // Fetch user by ID
    axios.get(`http://localhost:8080/api/blog/users/${searchTerm}`)
      .then(response => {
        setSelectedUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user by ID:', error.message);
        setSelectedUser(null);
      });
      console.log('Selected User:', selectedUser);
  };

  // Tính toán index bắt đầu và kết thúc cho mỗi trang
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Lấy các người dùng cho trang hiện tại từ toàn bộ danh sách
  const usersForCurrentPage = users.slice(startIndex, endIndex);
  const totalPageCount = Math.ceil(users.length / pageSize);

  return (
    <>
      <div className='post-container'>
        <div className='post-content'>
          <h3>Users</h3>
          <hr></hr>
          <div className='btn-func'>
            <div className='table-action'>
                <input type="text" name="search-term" id="search-post-input" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button
                style={{margin:'0', width:'15%',backgroundColor:'transparent', color:'black',opacity:'1',marginBottom:'1%'}}
                onClick={handleSearch}
                onMouseOver={(e) => e.target.style.opacity = '0.7'} // Hover effect
                onMouseOut={(e) => e.target.style.opacity = '1'}
                >Search</button>
            </div>
            {/* <div className='btn-content'>
              <div className="table-buttons">
                <a href="#" className="btn primary-btn small-btn">
                  <FontAwesomeIcon icon={faPlus} />
                  Add User
                </a>
              </div>
            </div> */}
          </div>
          {showForm && (
            <div className='popup'>
              <div style={{textAlign:'left', marginLeft:'2%', marginBottom:'1%'}}>
                  <button className="close-button" onClick={() => setShowForm(false)}>
                      <FontAwesomeIcon icon={faTimes} />
                  </button>
              </div>
              <div className='flex-user-container'>
                <div className='flex-user-content'>
                  <label>Username:</label>
                  <input
                    style={{border:'1px solid black', width:'45%', marginLeft:'1.4%',color:'black',marginRight:'1.4%'}}
                    type="username"
                    value={editUser.username}
                    onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                  />
                </div>
                <div className='flex-user-content'>
                  <label>Firstname:</label>
                  <input
                    style={{border:'1px solid black', width:'50%', marginLeft:'1.4%',color:'black',marginRight:'1.4%'}}
                    type="username"
                    value={editUser.firstName}
                    onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
                  />
                </div>
                <div className='flex-user-content'>
                  <label>Lastname:</label>
                  <input
                    style={{border:'1px solid black', width:'50%', marginLeft:'1.4%',color:'black',marginRight:'1.4%'}}
                    type="username"
                    value={editUser.lastName}
                    onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
                  />
                </div>
                <div className='flex-user-content' style={{width:'40%'}}>
                  <label>Email:</label>
                  <input
                    style={{border:'1px solid black', width:'64%', marginLeft:'1.4%',color:'black',marginRight:'1.4%'}}
                    type="username"
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  />
                </div>
                <div className='flex-user-content'>
                  <label>Mobile:</label>
                  <input
                    style={{border:'1px solid black', width:'72%', marginLeft:'1.4%',color:'black',marginRight:'1.4%'}}
                    type="username"
                    value={editUser.mobile}
                    onChange={(e) => setEditUser({ ...editUser, mobile: e.target.value })}
                  />
                </div>
              </div>
              <button onClick={handleUpdateUser}
                style={{margin:'0', width:'21%',backgroundColor:'transparent', color:'black',opacity:'1',marginBottom:'1.2%'}}
                onMouseOver={(e) => e.target.style.opacity = '0.7'} // Hover effect
                onMouseOut={(e) => e.target.style.opacity = '1'}
              >Submit</button>
            </div>
          )}
          {selectedUser ? (
            <div className="table-post">
                <table style={{ border: '1px solid', width: '75%' }}>
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>Username</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Mobile</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>{selectedUser.id}</td>
                        <td>{selectedUser.username}</td>
                        <td>{selectedUser.firstName}</td>
                        <td>{selectedUser.lastName}</td>
                        <td>{selectedUser.mobile}</td>
                        <td>{selectedUser.email}</td>
                    </tbody>
              </table>
            </div>
          ):(
          <div className='table-post'>
            <table style={{ border: '1px solid', width: '75%' }}>
              <thead style={{ border: '1px solid' }}>
                <tr>
                  <th>UserId</th>
                  <th>Username</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  {/* <th>Role</th> */}
                </tr>
              </thead>
              <tbody>
                {usersForCurrentPage.map((user, index) => (
                  <tr key={startIndex + index} className='border-tr'>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.mobile}</td>
                    <td>
                      {user.email}
                      <div className="td-action-links">
                        <a className="trash" onClick={()=>handleDeleteUser(user.id)}>Delete</a>
                        <span className="inline-divider">|</span>
                        <a className="edit" onClick={()=>handleEditClick(user)}>Edit</a>
                      </div>
                    </td>
                    {/* <td>{user.roles}</td> */}
                  </tr>
                ))}
              </tbody>
              <tfoot>
              <td colSpan="6">
                  <div className="pagination-links">
                    {[...Array(totalPageCount).keys()].map(num => (
                      <a
                        key={num + 1}
                        href={`#${num + 1}`}
                        className={num + 1 === page ? "link active" : "link"}
                        onClick={() => setPage(num + 1)}
                      >
                        {num + 1}
                      </a>
                    ))}
                  </div>
                </td>
              </tfoot>
            </table>
          </div>
          )}
        </div>
      </div>
    </>
  );
}

export default User;
