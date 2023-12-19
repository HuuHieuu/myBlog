import jwtDecode from 'jwtDecode';

// Hàm decode token
const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Lỗi khi giải mã token:', error);
    return null;
  }
};

export default decodeToken;
