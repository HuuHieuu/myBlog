import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../AllPost/AllPost.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
function Role() {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        // Gửi yêu cầu GET đến API Endpoint /admin khi component được mount
        axios.get('http://localhost:8080/api/blog/admin/role')
            .then(response => {
            // Nếu yêu cầu thành công, cập nhật state với danh sách người dùng từ server
            setRoles(response.data);
            })
            .catch(error => {
            console.error('Lỗi khi lấy danh sách role', error.message);
            });    
        }, []); 

    const click = ()=>{
        console.log(roles);
    }

    return ( 
        <>
            <div className='post-container'>
                <div className='post-content'>
                    <h3>Roles</h3>
                    <hr></hr>
                    <div className='btn-func'>
                        <div className='btn-content'>
                            <div class="table-buttons">
                                <a href="#" class="btn primary-btn small-btn" onClick={click}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                    Add Role
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='table-post'>
                        <table style={{border:'1px solid', width:'75%'}}>
                            <thead style={{border:'1px solid'}}>
                                <th>STT</th>
                                <th>Role</th>
                                <th>Name</th>
                                <th>Username</th>
                            </thead>
                            <tbody>
                                {roles.map((role,index)=>(
                                    <tr key={index} className='border-tr'>
                                        <td>{index+1}</td>
                                        <td>{role.role}</td>
                                        <td>{role.user && role.user.firstName}</td>
                                        <td>{role.user && role.user.username}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Role;