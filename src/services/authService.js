import axios from 'axios';

const authService = axios.create({
  // Đảm bảo URL chính xác với path prefix
  baseURL: process.env.REACT_APP_API_AUTH_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  }
});
authService.interceptors.request.use(
  (config) => {
    // Lấy token từ LocalStorage
    const token = localStorage.getItem('accessToken');
    
    if (token) {
      // Gắn token vào header theo chuẩn Bearer
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- (Tùy chọn) INTERCEPTOR: Xử lý khi Token hết hạn (401) ---
authService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Nếu token hết hạn hoặc không hợp lệ -> Xóa token và logout
      localStorage.removeItem('accessToken');
      window.location.href = '/login'
    }
    return Promise.reject(error);
  }
);

export default authService;