import React, { useState } from 'react';
import Nav from '../../components/nav/Nav'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import styles from './login_register.module.scss';

function LoginRegister() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const handleResetError = () =>{
    setErrorMessage("");
  }

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage('');
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setErrorMessage('');
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setErrorMessage('');
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
    setErrorMessage('');
  };

  const handleEmailChange = (event) =>{
    setEmail(event.target.value);
    setErrorMessage('');
  }

  // login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/blog/users/login', {
        username: username,
        passwordHash: password,
      });

      // Lấy token từ response
      const token = response.data;

      // Lưu token vào localStorage hoặc Redux state
      localStorage.setItem('accessToken', token);

      // Gửi token trong các yêu cầu tiếp theo (nếu cần)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log(token);

      // Điều hướng hoặc thực hiện các hành động khác sau khi đăng nhập thành công
      navigate('/');
    } catch (error) {
      console.error('Đăng nhập thất bại:', error.message);
      console.log(error.response); 
      // Xử lý lỗi đăng nhập
      if (error.response && error.response.status === 401) {
        setErrorMessage('Tài khoản hoặc mật khẩu không đúng.');
      } else {
        setErrorMessage('Tài khoản hoặc mật khẩu không đúng.');
      }
    }
  };

  // signUp
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username || !password || !firstName || !lastName || !phoneNumber) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/blog/users/register', {
        username: username,
        passwordHash: password,
        firstName: firstName,
        lastName: lastName,
        mobile: phoneNumber,
        email: email,
      });

      const token = response.data;
      localStorage.setItem('accessToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/');
    } catch (error) {
      console.error('Đăng ký thất bại:', error.message);
      setErrorMessage('Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <div className={styles.lrContainer}>
      <Nav/>
      <div className={`${styles.container} ${isSignUp ? styles.active : ''}`}>
        <div className={`${styles.formContainer} ${isSignUp ? styles.signUp : styles.signIn}`}>
          <form>
            <h1>{isSignUp ? 'Tạo tài khoản mới' : 'Đăng Nhập'}</h1>
            {isSignUp && 
                <>
                    <input type="firstname" placeholder="First Name" value={firstName} onChange={handleFirstNameChange} />
                    <input type="lastname" placeholder="Last Name" value={lastName} onChange={handleLastNameChange} />
                    <input type="mobile" placeholder="Phone Number" value={phoneNumber} onChange={handlePhoneNumberChange} />
                    <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                </>
            }
            <input type="username" placeholder="Username" value={username} onChange={handleUsernameChange}/>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
            {isSignUp && <button onClick={handleSignUp}>Đăng Ký</button>}
            {!isSignUp && <button onClick={handleLogin}>Đăng Nhập</button>}
            {!isSignUp && errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
            {isSignUp && errorMessage && <div className={styles.errorMessage}>{errorMessage}</div> }
          </form>
        </div>
        <div className={styles.toggleContainer}>
          <div className={styles.toggle} onClick={handleToggle}>
            <div className={`${styles.togglePanel} ${styles.toggleLeft} ${isSignUp ? styles.active : ''}`}>
              <h1>Welcome Back!</h1>
              <p>Đăng nhập để sử dụng tính năng của trang web</p>
              <button className={styles.hidden} id="login" onClick={handleResetError}>
                Đăng Nhập
              </button>
            </div>
            <div className={`${styles.togglePanel} ${styles.toggleRight} ${!isSignUp ? styles.active : ''}`}>
              <h1>Hello, Friend!</h1>
              <p>Đăng ký tài khoản để sử dụng tính năng của trang web</p>
              <button className={styles.hidden} id="register" onClick={handleResetError}>
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
