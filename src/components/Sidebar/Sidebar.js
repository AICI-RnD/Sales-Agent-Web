import React from 'react';
import styles from './Sidebar.module.css';
import { useView } from '../../context/ActiveAgentContext';
import { FaFileAlt, FaTags, FaBoxOpen, FaShoppingCart, FaInfoCircle } from 'react-icons/fa';
import { FcAbout } from "react-icons/fc";
import { SiHomepage } from "react-icons/si";
import { MdProductionQuantityLimits, MdOutlineContactSupport  } from "react-icons/md";
// Cấu trúc config không đổi
const agentConfig = {
    'home': { name: 'Home', items: [
        { id: 'home-main', name: 'Trang Chủ', icon: <SiHomepage /> },
        { id: 'home-about', name: 'Về Chúng Tôi', icon: <FcAbout /> },
        { id: 'home-products', name: 'Sản Phẩm', icon: <MdProductionQuantityLimits /> },
        { id: 'home-contact', name: 'Liên Hệ', icon: <MdOutlineContactSupport /> },
    ] },
    'ecommerce-bot': {
      name: 'E-commerce Agent',
      items: [
        { id: 'ecommerce-bot-intro', name: 'Hướng dẫn', icon: <FaFileAlt /> },
        { id: 'ecommerce-bot-products', name: 'Sản Phẩm', icon: <FaBoxOpen /> },
        { id: 'ecommerce-bot-orders', name: 'Đơn Hàng', icon: <FaShoppingCart /> },
      ]
    },
    'spa-bot': {
      name: 'Spa Agent',
      items: [
        { id: 'spa-bot-intro', name: 'Hướng dẫn', icon: <FaFileAlt /> },
        { id: 'spa-bot-services', name: 'Dịch Vụ', icon: <FaTags /> },
        { id: 'spa-bot-appointments', name: 'Lịch Hẹn', icon: <FaShoppingCart /> },
        ]
    },
    'education-bot': {
      name: 'Education Agent',
        items: [
            { id: 'education-bot-main', name: 'Hướng dẫn', icon: <FaFileAlt /> },
            { id: 'education-bot-courses', name: 'Khóa Học', icon: <FaTags /> },
            { id: 'education-bot-instructors', name: 'Phiếu Đăng Ký', icon: <FaShoppingCart /> },
        ]
    },
};

const Sidebar = () => {
  const { activeView, setActiveView } = useView();
  // Lấy agentId từ activeView, ví dụ: 'ecommerce-bot-intro' -> 'ecommerce-bot'
  const currentAgentId = activeView.split('-')[0] + '-' + activeView.split('-')[1];

  const currentAgent = agentConfig[currentAgentId] || agentConfig['home'];
  const menuItems = currentAgent.items;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h3>{currentAgent.name}</h3>
      </div>
      <nav className={styles.nav}>
        {menuItems.length > 0 ? (
          <ul>
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  className={activeView === item.id ? styles.active : ''}
                  onClick={() => setActiveView(item.id)}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  <span className={styles.text}>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.placeholder}>
             <FaInfoCircle size={24} />
            <p>Chọn một Agent từ thanh Header để xem các mục chi tiết.</p>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;