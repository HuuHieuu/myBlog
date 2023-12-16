export const isAuthenticated = () => {
    // Kiểm tra xem có token được lưu trong localStorage hay không
    const token = localStorage.getItem('accessToken');
    return !!token; // Trả về true nếu có token, ngược lại trả về false
  };