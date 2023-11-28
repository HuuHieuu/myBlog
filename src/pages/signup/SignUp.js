import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Nav from '../../components/nav/Nav';
import './SignUp.css'; 
const errorStyle = {
    color: 'red',       // Màu chữ đỏ
    fontSize: '12px',  // Kích thước font nhỏ hơn
    marginTop:'-12px'
  };
const SignUp = () => {
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10}$/;
  const isPasswordValid = (password) => password.length >= 8;

  const [username, setUsername] = useState('');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if(formErrors.username){
        setFormErrors({...formErrors, username: ''});
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    // Xóa thông báo lỗi khi người dùng thay đổi nội dung trường
    if (formErrors.name) {
      setFormErrors({ ...formErrors, name: '' });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (formErrors.email) {
      setFormErrors({ ...formErrors, email: '' });
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (formErrors.password) {
        setFormErrors({ ...formErrors, password: '' });
      }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (formErrors.confirmPassword) {
      setFormErrors({ ...formErrors, confirmPassword: '' });
    }
  };

  const handleSignUp = () => {
    const errors = {};

    if(!username){
        errors.username = "Vui lòng nhập tên tài khoản"
    }
    if (!name) {
      errors.name = "Vui lòng nhập tên";
    }
    // if (!phone) {
    //   errors.phone = "Vui lòng nhập số điện thoại";
    // } else if (!phoneRegex.test(phone)) {
    //   errors.phone = "Số điện thoại không hợp lệ";
    // }
    if (!email) {
      errors.email = "Vui lòng nhập email";
    } else if (!emailRegex.test(email)) {
      errors.email = "Email không hợp lệ";
    }
    if (!password) {
      errors.password = "Vui lòng nhập mật khẩu";
    } else if (!isPasswordValid(password)) {
      errors.password = "Mật khẩu phải có ít nhất 8 ký tự";
    }
    if (!confirmPassword) {
      errors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }


    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    } else {
      // Nếu không có lỗi, chuyển hướng đến trang khác (ví dụ: trang đăng nhập)
      navigate("/login");
    }
  }

  return (
    <div className='flex-container'>
      <Nav/>
      <div className="login-container">
        <h2>Đăng ký</h2>
        <form>
            <input type="text" placeholder='Tài khoản' value={username} onChange={handleUsernameChange} />
            {formErrors.username && <div style={errorStyle}>{formErrors.username}</div>}
            
            <input type="name" placeholder='Họ tên' value={name} onChange={handleNameChange} />
            {formErrors.name && <div style={errorStyle}>{formErrors.name}</div>}

            <input type="email" placeholder='Email' value={email} onChange={handleEmailChange} />
            {formErrors.email && <div style={errorStyle}>{formErrors.email}</div>}

            <input type="password" placeholder='Mật khẩu' value={password} onChange={handlePasswordChange} />
            {formErrors.password && <div style={errorStyle}>{formErrors.password}</div>}

            <input type="confirmPassword" placeholder='Xác nhận mật khẩu' value={confirmPassword} onChange={handleConfirmPasswordChange} />
            {formErrors.confirmPassword && <div style={errorStyle}>{formErrors.confirmPassword}</div>}

            <button type="button" onClick={handleSignUp}>
              Đăng ký
            </button>
            <div className='sign-up-div'>
              <label>Đã có tài khoản? </label>
              <a href='/login'>Đăng nhập</a>
            </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
