import { useUserContext } from '../../components/Context/UserContext';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Nav from '../../components/nav/Nav';
import './login.css'; 
import avatar from '../../assets/image/background/avatar.jpg'
const LoginForm = () => {
  const navigate  = useNavigate()
  const { login } = useUserContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setErrorMessage('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorMessage('');
  };

  const handleLogin = () => {
    // Xử lý logic đăng nhập ở đây
    if(username == "" || password ==""){
      setErrorMessage('Vui lòng nhập đầy đủ tên tài khoản và mật khẩu.');
    }else if( username == "hieu" && password == "1"){
      console.log(`Đăng nhập với tên người dùng: ${username} và mật khẩu: ${password}`);
      login({ username, avatar: {avatar} });
      navigate('/')
    }else{
      setErrorMessage('Tên tài khoản hoặc mật khẩu không đúng.');
    }
  };

  return (
    <div className='flex-container'>
      <Nav/>
      <div className="login-container">
        <h2>Đăng nhập</h2>
        <form>
            <input type="text" placeholder='Tài khoản' value={username} onChange={handleUsernameChange} />
            <input type="password" placeholder='Mật khẩu' value={password} onChange={handlePasswordChange} />
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="button" onClick={handleLogin}>
              Đăng nhập
            </button>
            <div className='sign-up-div'>
              <label>Chưa có tài khoản? </label>
              <a href='/signup'>Đăng ký</a>
            </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
