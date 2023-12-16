import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import axios
import '../AllPost/AllPost.css'

function User() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1); // Trang hiện tại
  const pageSize = 2 // kích thước trang
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

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
  }, []); // [] để đảm bảo useEffect chỉ chạy một lần khi component được mount

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
                style={{margin:'0', width:'15%',backgroundColor:'transparent', color:'black',opacity:'1'}}
                onClick={handleSearch}
                onMouseOver={(e) => e.target.style.opacity = '0.7'} // Hover effect
                onMouseOut={(e) => e.target.style.opacity = '1'}
                >Search</button>
            </div>
            <div className='btn-content'>
              <div className="table-buttons">
                <a href="#" className="btn primary-btn small-btn">
                  <FontAwesomeIcon icon={faPlus} />
                  Add User
                </a>
              </div>
            </div>
          </div>
          {selectedUser ? (
            <div className="table-post">
                <table style={{ border: '1px solid', width: '75%' }}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>{selectedUser.id}</td>
                        <td>{selectedUser.username}</td>
                        <td>{selectedUser.email}</td>
                    </tbody>
              </table>
            </div>
          ):(
          <div className='table-post'>
            <table style={{ border: '1px solid', width: '75%' }}>
              <thead style={{ border: '1px solid' }}>
                <tr>
                  <th>STT</th>
                  <th>Username</th>
                  <th>Email</th>
                  {/* <th>Role</th> */}
                </tr>
              </thead>
              <tbody>
                {usersForCurrentPage.map((user, index) => (
                  <tr key={startIndex + index} className='border-tr'>
                    <td>{startIndex + index + 1}</td>
                    <td>{user.username}</td>
                    <td>
                      {user.email}
                      <div className="td-action-links">
                        <a href="#" className="trash">Delete</a>
                        <span className="inline-divider">|</span>
                        <a href="#" className="edit">Edit</a>
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
