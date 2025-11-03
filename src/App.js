// src/App.js
import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import { ViewProvider } from './context/ActiveAgentContext'; // Đổi tên file này thành ViewContext.js cho rõ ràng
// import CustomCursor from './components/CustomCursor/CustomCursor';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

function AppContent() {
  const { isAuthenticated } = useAuth();

  // Nếu đã đăng nhập, hiển thị HomePage (đã bao gồm Header, Sidebar...)
  // Nếu chưa, hiển thị LoginPage
  return isAuthenticated ? (
    <ViewProvider>
      <HomePage />
    </ViewProvider>
  ) : (
    <LoginPage />
  );
}

function App() {
  return (
    <div className="App">
      <AuthProvider> {/* Bọc toàn bộ App bằng AuthProvider */}
        {/* <CustomCursor /> */}
        <AppContent /> {/* Hiển thị nội dung chính */}
      </AuthProvider>
    </div>
  );
}

export default App