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
      const token = localStorage.getItem('accessToken');
      
      // Nếu không có token trong storage, coi như chưa login -> Dừng luôn
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        // Token có tồn tại, gọi API để lấy thông tin User & Validate token
        const response = await authService.get('/auth/me');
        setIsAuthenticated(true);
        setUser(response.data);
      } catch (error) {
        // Token hết hạn hoặc không hợp lệ
        console.error("Token invalid:", error);
        localStorage.removeItem('accessToken'); // Xóa token rác
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
      // Gọi API login
      const response = await authService.post('/auth/login', {
        username, // Form-data hoặc JSON tùy backend, ở đây giả sử JSON
        password
      });

      // Backend FastAPI thường trả về: { access_token: "...", token_type: "bearer" }
      const { access_token, user: userData } = response.data;

      // LƯU TOKEN VÀO STORAGE (Quan trọng)
      localStorage.setItem('accessToken', access_token);

      // Cập nhật State
      setIsAuthenticated(true);
      // Nếu backend trả về thông tin user ngay khi login thì set luôn, 
      // nếu không thì gọi lại /auth/me hoặc dùng decoded token
      setUser(userData || { username: username }); 

      return { success: true }; 

    } catch (error) {
      const message = error.response?.data?.detail || 'Lỗi đăng nhập không xác định.';
      return { success: false, message: message }; 
    }
  };
  // ------------------------------------

  const logout = () => {
    // Với Bearer Token, quan trọng nhất là xóa ở Client
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setUser(null);
    
    // Tùy chọn: Gọi API để blacklist token ở server nếu cần bảo mật cao
    // try { authService.post('/auth/logout'); } catch(e) {}
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