import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State để lưu thông báo lỗi
  const [isSubmitting, setIsSubmitting] = useState(false); // State loading
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
          />
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