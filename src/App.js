// src/App.js
import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import { ViewProvider } from './context/ActiveAgentContext'; // Đổi tên file này thành ViewContext.js cho rõ ràng
// import CustomCursor from './components/CustomCursor/CustomCursor';
import './index.css';

function App() {
  return (
    <div className="App">
      {/* <CustomCursor /> */}
      <ViewProvider>
        <HomePage />
      </ViewProvider>
    </div>
  );
}

export default App;