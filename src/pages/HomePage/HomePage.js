// src/pages/HomePage/HomePage.js
import React from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainContent from '../../components/MainContent/MainContent';
import Chatbot from '../../components/Chatbot/Chatbot';
import { ChatProvider } from '../../context/ChatContext';
import styles from './HomePage.module.css';
import { useView } from '../../context/ActiveAgentContext';

const HomePageWrapper = () => {
  const { activeView } = useView();
  const isHomePage = activeView.startsWith('home');

  // Sử dụng một class riêng cho trang Home để thay đổi layout
  const homePageClass = isHomePage
    ? `${styles.homePage} ${styles.isHome}`
    : styles.homePage;

  return (
    <div className={homePageClass}>
      <Header />
      {!isHomePage && <Sidebar />}
      <MainContent />
      {!isHomePage && <Chatbot />}
    </div>
  );
};

const HomePage = () => (
  <ChatProvider>
    <HomePageWrapper />
  </ChatProvider>
);

export default HomePage;