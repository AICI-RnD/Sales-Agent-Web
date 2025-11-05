import React, { useState, useRef, useEffect } from 'react';
import styles from './Header.module.css';
import { useView } from '../../context/ActiveAgentContext'; // Import hook
import { useAuth } from '../../context/AuthContext'; // Import hook Auth
import { FaUserCircle, FaSignOutAlt, FaShieldAlt } from 'react-icons/fa';

const Header = () => {
  const { setActiveView, activeView } = useView();
  const { logout, user } = useAuth(); // Lấy hàm logout từ AuthContext
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    // Thêm 'defaultView' để biết click vào sẽ mở mục con nào đầu tiên
    { agentId: 'home', text: 'Home', defaultView: 'home-main' },
    { agentId: 'ecommerce-bot', text: 'E-commerce Agent', defaultView: 'ecommerce-bot-intro' },
    { agentId: 'spa-bot', text: 'Spa Agent', defaultView: 'spa-bot-intro' },
    { agentId: 'education-bot', text: 'Education Agent', defaultView: 'education-bot-main' },
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
  };
  

  // Xử lý click ra ngoài để đóng dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className={styles.header}>
        <div className={styles.logo}><img src="\logo-aici.png" alt="Logo" className={styles.logoImage} /></div>
      
      {/* Thêm một div bọc cho các mục bên phải */}
      <div className={styles.headerRight}>
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
          {/* Kiểm tra nếu user tồn tại và username là 'admin' */}
          {user && user.username === 'AICIGLOBAL_DEV' && (
            <button
              key="admin-stats"
              className={activeView.startsWith('AICIGLOBAL_DEV') ? styles.active : ''}
              onClick={() => setActiveView('admin-stats')}
            >
              <FaShieldAlt style={{ marginRight: '8px' }} />
              Quản lý
            </button>
          )}
        </nav>

        <div className={styles.userProfile} ref={dropdownRef}>
          <button onClick={toggleDropdown} className={styles.avatarButton}>
            {/* CHỈ CÓ ICON */}
            <FaUserCircle />
          </button>
          
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              {/* MỚI: Thêm phần hiển thị thông tin user */}
              <div className={styles.dropdownUserInfo}>
                <h4>{user?.username || 'User'}</h4>
                <span>{user?.email}</span>
              </div>
            
              <button onClick={handleLogout}>
                <FaSignOutAlt /> Đăng xuất
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;