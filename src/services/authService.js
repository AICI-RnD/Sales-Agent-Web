import axios from 'axios';

const authService = axios.create({
  // Đảm bảo URL chính xác với path prefix
  baseURL: process.env.REACT_APP_API_AUTH_URL || 'https://varicolored-aleena-incisively.ngrok-free.app/api/v1/login_server',
  withCredentials: true
});

export default authService;