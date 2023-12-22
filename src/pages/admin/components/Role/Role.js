import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentsDollar, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../AllPost/AllPost.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
function Role() {
    const [roleU, setRoleU] = useState(['ROLE_ADMIN', 'ROLE_AUTHOR', 'ROLE_GUEST']);
    const [roles, setRoles] = useState([]);
    const [showFormRoleEdit, setShowFormRoleEdit] = useState(false);
    const [editRole, setEditRole] = useState(null);
    const [deleteRole,setDeleteRole] = useState(null);
    const [newRole, setNewRole] = useState({
        user: {
            id: null, 
        },
        role: '',
    });
    const [isEditMode,setIsEditMode] = useState(true);

    useEffect(() => {
        // Gửi yêu cầu GET đến API Endpoint /admin khi component được mount
        axios.get('http://localhost:8080/api/blog/admin/role')
            .then(response => {
            // Nếu yêu cầu thành công, cập nhật state với danh sách role từ server
            setRoles(response.data);
            })
            .catch(error => {
            console.error('Lỗi khi lấy danh sách role', error.message);
            });    
        }, []); 

    useEffect(() => {
        // Nếu có bài viết được chọn, sử dụng nó để cập nhật trạng thái của trình soạn thảo
        if (editRole) {
            const user = editRole.user || {}; // Nếu user null, sẽ trả về đối tượng trống
            console.log(user)
            setNewRole(prevNewRole => ({
                ...prevNewRole,
                user: {
                    ...prevNewRole.user,
                    id: user.id || null, // hoặc giá trị mặc định nếu cần
                },
                role: editRole.role,
            }));
            console.log(user)
        }
    }, [editRole]);


    const handleAddClick =()=>{
        setShowFormRoleEdit(true);
        setEditRole(false);
        setIsEditMode(false)
        setNewRole({
            user: {
                id: null, // Giả sử userId là kiểu chuỗi (string), bạn có thể điều chỉnh kiểu dữ liệu tùy thuộc vào ứng dụng của bạn
            },
            role: '',
        })
    }

    const handleEditClick = (role) =>{
        setEditRole(role);
        setShowFormRoleEdit(true);
        setIsEditMode(true)
        const user = role.user || {};
        setNewRole(prevNewRole => ({
            ...prevNewRole,
            user: {
                ...prevNewRole.user,
                id: user.id || null, // hoặc giá trị mặc định nếu cần
            },
            role: role.role,
        }));
        console.log(role);
    }

    const handleDeleteClick = async (roleId) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa?");
        if (!confirmed) {
            return;
        }
        try {
            await axios.delete(`http://localhost:8080/api/blog/admin/role/${roleId}`);
            // Cập nhật danh sách sau khi xoá thành công
            setRoles(prevRoles => prevRoles.filter(role => role.roleId !== roleId));
            window.alert('Role deleted successfully!');
            handleRoleSubmitted();
        } catch (error) {
            console.error('Lỗi khi xoá role:', error.message);
            if (error.response) {
                // Log status code và data từ phản hồi
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            }
            window.alert('Error deleting role!');
        }
    };


    const handleRoleSubmitted = async () => {
        // Lấy danh sách bài viết đã cập nhật
        try {
            const response = await axios.get('http://localhost:8080/api/blog/admin/role');
            // Cập nhật trạng thái với dữ liệu mới
            setRoles(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách role:', error.message);
        }
    };

    const handleSubmit = async () =>{
        try {
            let response
            if(editRole){
                response = await axios.put(`http://localhost:8080/api/blog/admin/role/${editRole.roleId}`, newRole);
            }else{
                // Gửi yêu cầu POST để thêm mới category
                response = await axios.post('http://localhost:8080/api/blog/admin/role', newRole);
            }
            // Kiểm tra xem yêu cầu thành công hay không
            if (response.status === 201 || response.status === 200) {
                setRoles(prevRoles => [...prevRoles, response.data]);
                setShowFormRoleEdit(false);
                setNewRole({
                    user: {
                        id: null, 
                    },
                    role: '',
                });
                handleRoleSubmitted();
                const successMessage = editRole ? 'Role updated successfully!' : 'Role added successfully!';
                window.alert(successMessage);
            } else {
                console.error('Lỗi khi thêm mới hoặc cập nhật role:', response.statusText);
            }
        } catch (error) {
            console.error('Lỗi khi thêm mới hoặc cập nhật role:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }
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
                                <a href="#" class="btn primary-btn small-btn" onClick={handleAddClick}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                    Add Role
                                </a>
                            </div>
                        </div>
                    </div>
                    {showFormRoleEdit && (
                        <div className='popup'>
                            <div style={{textAlign:'left', marginLeft:'2%', marginBottom:'1%'}}>
                                <button className="close-button" onClick={() => setShowFormRoleEdit(false)}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                            <div className='flex-user-container'>
                                <div className='flex-user-content'>
                                    <label>UserID:</label>
                                    <input
                                        style={{border:'1px solid black', width:'45%', marginLeft:'1.4%',color:'black',marginRight:'1.4%'}}
                                        type="userId"
                                        value={newRole.user.id || ''}
                                        readOnly={isEditMode}
                                        onChange={(e)=>setNewRole({ ...newRole,
                                            user: {
                                                id: e.target.value,
                                            },
                                            role: newRole.role,})}
                                    />
                                </div>
                                <div className='flex-user-content'>
                                    <label>Role:</label>
                                    {/* <select
                                        style={{ border: '1px solid black', width: '45%', marginLeft: '1.4%', color: 'black', marginRight: '1.4%' }}
                                        value={newRole.role}
                                        onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
                                    >
                                        <option value="" disabled>Select a role</option>
                                        {roles
                                            .filter(role => role.role === 'ROLE_ADMIN' || role.role === 'ROLE_AUTHOR' || role.role === 'ROLE_GUEST')
                                            .map((role) => (
                                                <option key={role.roleId} value={role.role}>
                                                    {role.role}
                                                </option>
                                        ))}
                                    </select> */}
                                    <input
                                        style={{border:'1px solid black', width:'45%', marginLeft:'1.4%',color:'black',marginRight:'1.4%'}}
                                        type="role"
                                        value={newRole.role}
                                        onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button onClick={handleSubmit}
                                style={{margin:'0', width:'21%',backgroundColor:'transparent', color:'black',opacity:'1',marginBottom:'1.2%'}}
                                onMouseOver={(e) => e.target.style.opacity = '0.7'} // Hover effect
                                onMouseOut={(e) => e.target.style.opacity = '1'}
                            >Submit</button>
                        </div>
                    )}
                    <div className='table-post'>
                        <table style={{border:'1px solid', width:'75%'}}>
                            <thead style={{border:'1px solid'}}>
                                <th>RoleId</th>
                                <th>UserID</th>
                                <th>Role</th>
                                <th>Name</th>
                                <th>Username</th>
                            </thead>
                            <tbody>
                                {roles.map((role,index)=>(
                                    <tr key={index} className='border-tr'>
                                        <td>{role.roleId}</td>
                                        <td>{role.user&&role.user.id}</td>
                                        <td>{role.role}
                                            <div className="td-action-links">
                                                <a  className="edit" onClick={()=>handleEditClick(role)}>Edit</a>
                                            </div>
                                        </td>
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