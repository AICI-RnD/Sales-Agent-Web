import React from 'react';
import styles from './Header.module.css';
import { useView } from '../../context/ActiveAgentContext'; // Import hook mới

const Header = () => {
  const { setActiveView, activeView } = useView();

  const navLinks = [
    // Thêm 'defaultView' để biết click vào sẽ mở mục con nào đầu tiên
    { agentId: 'home', text: 'Home', defaultView: 'home-main' },
    { agentId: 'ecommerce-bot', text: 'E-commerce Agent', defaultView: 'ecommerce-bot-intro' },
    { agentId: 'spa-bot', text: 'Spa Agent', defaultView: 'spa-bot-intro' },
    { agentId: 'education-bot', text: 'Education Agent', defaultView: 'education-bot-main' },
  ];

  return (
    <header className={styles.header}>
        <div className={styles.logo}><img src="\logo-aici.png" alt="Logo" className={styles.logoImage} /></div>
      <nav className={styles.nav}>
        {navLinks.map(link => {
          // Xác định xem header link có active không (bằng cách check activeView có bắt đầu bằng agentId không)
          const isActive = activeView.startsWith(link.agentId);
          return (
            <button
              key={link.agentId}
              className={isActive ? styles.active : ''}
              onClick={() => setActiveView(link.defaultView)}
            >
              {link.text}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;