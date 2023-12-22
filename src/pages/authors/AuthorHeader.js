import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/UserService';
import avatar from '../../assets/image/avatar1.jpeg'
import axios from 'axios';

function AuthorHeader() {
    const [user, setUser] = useState(null);
    const [userEdit, setUserEdit] = useState(null);
    const [profile, setProfile] = useState('');
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchPost = async () => {
            try {
              const response = await axios.get(`http://localhost:8080/api/blog/users/info`);
              setUser(response.data);
              console.log('User:', response.data);
            } catch (error) {
              console.error('Error fetching post:', error.message);
            }
          };
          fetchPost();
    },[])

    const handleOpenPopup = () => {
        setPopupOpen(true);
        setUserEdit(user);
      };

    useEffect(() => {
        console.log(userEdit);
    }, [userEdit]);
    
      const handleClosePopup = () => {
        setPopupOpen(false);
      };

      const handleImageChange = (event) => {
        const file = event.target.files[0];
        // Xử lý logic khi chọn ảnh
        setSelectedImage(file)
      };

      const handleConfirm = async () => {
        if (selectedImage) {
            try {
                // Upload ảnh mới lên server
                const imageUrl = await uploadImgProfile(selectedImage);
                userEdit.profile = imageUrl;
                userEdit.passwordHash='null';
            
                // setUserEdit((preUserEdit)=>({
                //     ...preUserEdit,
                //     profile: imageUrl,
                // }))

                updateUserProfile()
                // Cập nhật thông tin người dùng trên server
                // const updatedUser = await updateUserProfile();
                // setUser(userEdit);
                
                console.log('userEdit after update ',userEdit);
            } catch (error) {
                console.error('Error updating user profile:', error.message);
            }
        }
        handleClosePopup();
      };

      const updateUserProfile = async () => {
        const token = localStorage.getItem('accessToken');
        const headers = {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`,
        };
        try {
            const response = await axios.put(`http://localhost:8080/api/blog/users?id=${user.id}`, userEdit, {headers});

            if (response.status === 200) {
                return response.data;
                // setUser(response.data)
                // console.log(user)
            } else {
                console.error('Lỗi khi cập nhật người dùng:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user profile:', error.message);
        }
    };


    function uploadImgProfile(file) {
        return new Promise((resolve, reject) => {
            const body = new FormData();
            body.append("image", file);
    
            //token
            const token = localStorage.getItem('accessToken');
            const API_URL = "http://localhost:8080/api/blog/image/upload"; 
            fetch(`${API_URL}`, {
                method: "post",
                body: body,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text(); // giả sử server trả về JSON, nếu không, bạn cần điều chỉnh phần này
            })
            .then(data => {
                console.log(data);
                // Resolve với thumbnailUrl
                resolve(`http://localhost:8080/api/blog/image/display/${data}`);
            })
            .catch((err) => {
                console.error(err);
                // Reject nếu có lỗi
                reject(err);
            });
        });
    }
      

    return (
        <header className="masthead" style={{backgroundImage: `url("https://xdcs.cdnchinhphu.vn/446259493575335936/2023/8/23/dhxd-1692750442833376701747.jpg")`}}>
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        {user && (
                            <table style={{ width: '100%' }}>
                                <tr>
                                    <td>
                                        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                            
                                            <img
                                                src={ profile || user.profile || avatar}
                                                style={{
                                                    width: 220,
                                                    height: 220,
                                                    borderRadius: '50%'
                                                }}
                                                onClick={handleOpenPopup}
                                            />
                                            <span style={{color:'white', textAlign:'center', cursor:'pointer'}}
                                                onClick={handleOpenPopup}
                                            >Thay đổi avatar</span>
                                        </div>
                                        {isPopupOpen && (
                                            <div className="popup-container">
                                            <div className="popup-content" style={{display:'flex', flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
                                                {/* Nút để đóng popup */}
                                                <span className="close-popup" onClick={handleClosePopup} style={{color:'white',fontSize:'30px', cursor:'pointer'}}>
                                                &times;
                                                </span>

                                                {/* Form chọn ảnh */}
                                                <input type="file" accept="image/*" onChange={handleImageChange} style={{width:'58%'}}/>
                                                <button onClick={handleConfirm} style={{backgroundColor:'transparent'}}>Xác nhận</button>
                                            </div>
                                            </div>
                                        )}
                                    </td>
                                    <td colSpan={2}>
                                        <div className="site-heading">
                                            <h2>{user.firstName} {user.lastName}</h2>
                                            <span className="subheading">
                                                {/* <i>
                                                    "{user.intro}"
                                                </i> */}
                                                <img height="25" src="https://upload.wikimedia.org/wikipedia/commons/0/07/Flag_of_Vietnam-Animated.gif" style={{ marginLeft: '5px' }} alt="Vietnam Flag"></img>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AuthorHeader;
