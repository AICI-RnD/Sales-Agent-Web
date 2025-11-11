import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.css';

// const EyeIcon = () => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     viewBox="0 0 24 24" 
//     fill="currentColor" 
//     className={styles.passwordIcon}
//   >
//     <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
//     <path fillRule="evenodd" d="M1.5 11.25c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 12v-.75zM12 9.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12 1.5c-5.916 0-10.957 3.518-13.523 8.432a.75.75 0 000 .836C.543 19.117 5.084 22.5 12 22.5c5.916 0 10.957-3.518 13.523-8.432a.75.75 0 000-.836C23.457 5.018 18.916 1.5 12 1.5z" clipRule="evenodd" />
//   </svg>
// );

// // Icon con mắt gạch chéo (ẩn mật khẩu)
// const EyeSlashIcon = () => (
//   <svg 
//     xmlns="http://www.w3.org/2000/svg" 
//     viewBox="0 0 24 24" 
//     fill="currentColor" 
//     className={styles.passwordIcon}
//   >
//     <path d="M3.536 2.072a.75.75 0 011.06 0l17.757 17.757a.75.75 0 11-1.06 1.06L3.536 3.132a.75.75 0 010-1.06zM11.724 10.198a2.502 2.502 0 014.288 3.328l1.458 1.458a4 4 0 00-6.104-5.386l-.642.643z" />
//     <path fillRule="evenodd" d="M3.204 11.251C.901 13.064.254 15.004.003 16.037a.75.75 0 00.955.679c1.558-.32 3.117-.65 4.675-.98.747-.158 1.512-.279 2.29-.364l1.332 1.332c-.066.088-.137.176-.213.262a4.487 4.487 0 01-1.306 1.39l-.493.385a.75.75 0 00-.783 1.22l.493-.385a5.987 5.987 0 002.503-2.607l1.109 1.109a.75.75 0 001.06-1.06l-.372-.371C14.777 17.436 17.076 18 19.5 18c.312 0 .618-.016.917-.047a.75.75 0 00.003-1.5c-.266.02-.535.034-.805.034-2.188 0-4.224-.59-6.095-1.637l1.096-1.096c2.067.72 4.148 1.085 6.237 1.085.312 0 .618-.016.917-.047a.75.75 0 00.003-1.5c-.266.02-.535.034-.805.034-2.188 0-4.224-.59-6.095-1.637L12 9.248a.75.75 0 00-1.06-1.06L9.432 6.645A.75.75 0 008.372 7.705l1.06 1.06L7.38 7.38a.75.75 0 00-1.06 1.06l1.39 1.39A7.487 7.487 0 004.5 12c-1.734 0-3.376-.328-4.997-.942a.75.75 0 00-.003 1.501c1.547.59 3.255.908 5.003.942v-.001a.75.75 0 00.003-1.501H4.5A8.977 8.977 0 012.35 12c.162.298.344.593.548.884l-1.604-1.604z" clipRule="evenodd" />
//   </svg>
// );

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State để lưu thông báo lỗi
  const [isSubmitting, setIsSubmitting] = useState(false); // State loading
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear lỗi cũ
    setIsSubmitting(true);

    const result = await login(username, password);

    setIsSubmitting(false); // Dừng loading

    // 2. Kiểm tra kết quả
    if (!result.success) {
      // 3. Nếu thất bại, set thông báo lỗi từ API
      setError(result.message); 
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={styles.loginContainer}>
      {/* Thêm logo ở góc trái trên */}
      <div className={styles.logo}>
        <img src="\aici-logo-new.png" alt="Logo" />
      </div>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        {/* Thêm biểu tượng robot cho vui nhộn */}
        <h2 >🤖Trải Nghiệm Hệ Sinh Thái AICI GLOBAL</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Tài khoản</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Mật khẩu</label>
          {/* 1. Thêm một wrapper để định vị tương đối */}
          <div className={styles.passwordInputWrapper}> 
            <input
              type={showPassword ? 'text' : 'password'} // <--- THAY ĐỔI: Loại input động
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
              className={styles.passwordInput} // <--- THÊM MỚI: Class riêng để điều chỉnh padding
            />
            {/* 2. Thêm nút bấm/văn bản để toggle */}
            <i 
              // Kết hợp class CSS module VÀ class Font Awesome
              className={`${styles.passwordToggleIcon} ${showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}`}
              onClick={toggleShowPassword}
            ></i>
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {/* Giả lập tài khoản: admin / password123 */}
        <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
          {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;