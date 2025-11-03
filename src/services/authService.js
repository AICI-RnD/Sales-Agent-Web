import axios from 'axios';

// Tạo một "instance" axios
const authService = axios.create({
  // URL trỏ đến server FastAPI của bạn
  baseURL: process.env.REACT_APP_API_AUTH_URL, 
  
  // Dòng này CỰC KỲ QUAN TRỌNG
  // Nó cho phép trình duyệt gửi và nhận httpOnly cookie
  withCredentials: true 
});


export default authService;