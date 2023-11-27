import React, { useState } from 'react';
import './login.css'; 

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Xử lý logic đăng nhập ở đây
    console.log(`Đăng nhập với tên người dùng: ${username} và mật khẩu: ${password}`);
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <form>
          <input type="text" placeholder='Tài khoản' value={username} onChange={handleUsernameChange} />
        
          <input type="password" placeholder='Mật khẩu' value={password} onChange={handlePasswordChange} />
        
        <button type="button" onClick={handleLogin}>
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
