// import { useUserContext } from '../../components/Context/UserContext';
// import { useNavigate } from 'react-router-dom';
// import React, { useState } from 'react';
// import Nav from '../../components/nav/Nav';
// import './login.css'; 
// import axios from 'axios';
// import avatar from '../../assets/image/background/avatar.jpg'
// const LoginForm = () => {
//   const navigate  = useNavigate()
//   const { login } = useUserContext();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//     setErrorMessage('');
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//     setErrorMessage('');
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/blog/users/login', {
//         username: username,
//         passwordHash: password,
//       });

//       // Lấy token từ response
//       const token = response.data;

//       // Lưu token vào localStorage hoặc Redux state
//       localStorage.setItem('accessToken', token);

//       // Gửi token trong các yêu cầu tiếp theo (nếu cần)
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       console.log(token);

//       // Điều hướng hoặc thực hiện các hành động khác sau khi đăng nhập thành công
//       navigate('/');
//     } catch (error) {
//       console.error('Đăng nhập thất bại:', error.message);
//       // Xử lý lỗi đăng nhập
//     }
//   };
  

//   return (
//     <div className='flex-container'>
//       <Nav/>
//       <div className="login-container">
//         <h2>Đăng nhập</h2>
//         <form>
//             <input type="text" placeholder='Tài khoản' value={username} onChange={handleUsernameChange} />
//             <input type="password" placeholder='Mật khẩu' value={password} onChange={handlePasswordChange} />
//             {errorMessage && <div className="error-message">{errorMessage}</div>}
//             <button type="button" onClick={handleLogin}>
//               Đăng nhập
//             </button>
//             <div className='sign-up-div'>
//               <label>Chưa có tài khoản? </label>
//               <a href='/signup'>Đăng ký</a>
//             </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
