// src/App.js
import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage'; // Import trang Login
import { ViewProvider } from './context/ActiveAgentContext';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import AuthProvider và useAuth
import './index.css';

// Tạo một component con để có thể truy cập useAuth()
// Vì App.js là nơi cung cấp AuthProvider
function AppContent() {
  const { isAuthenticated } = useAuth();
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

export default App;


// // src/App.js
// import React from 'react';
// import HomePage from './pages/HomePage/HomePage';
// import { ViewProvider } from './context/ActiveAgentContext'; // Đổi tên file này thành ViewContext.js cho rõ ràng
// // import CustomCursor from './components/CustomCursor/CustomCursor';
// import './index.css';

// function App() {
//   return (
//     <div className="App">
//       {/* <CustomCursor /> */}
//       <ViewProvider>
//         <HomePage />
//       </ViewProvider>
//     </div>
//   );
// }

// export default App;