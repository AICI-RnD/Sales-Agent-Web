import React, { createContext, useContext, useState, useEffect } from 'react';
// Import file service chúng ta đã tạo (sẽ ở bước 2 nếu bạn chưa có)
import authService from '../services/authService'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check login khi tải trang
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await authService.get('/auth/me');
        setIsAuthenticated(true);
        setUser(response.data);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    };
    checkAuthStatus();
  }, []);

  // --- PHẦN SỬA LỖI NẰM Ở ĐÂY ---
  const login = async (username, password) => {
    try {
      // 1. Gọi API login
      const response = await authService.post('/auth/login', {
        username,
        password
      });

      // 2. Nếu thành công
      setIsAuthenticated(true);
      setUser(response.data);
      return { success: true }; // Trả về thành công

    } catch (error) {
      // 3. Nếu thất bại (API trả về 401)
      // Đọc thông báo lỗi "detail" từ server FastAPI
      const message = error.response?.data?.detail || 'Lỗi đăng nhập không xác định.';
      
      // 4. Trả về thất bại VÀ thông báo lỗi
      return { success: false, message: message }; 
    }
  };
  // ------------------------------------

  const logout = async () => {
    try {
      await authService.post('/auth/logout');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };

  if (isLoading) {
    return <div>Đang tải ứng dụng...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};