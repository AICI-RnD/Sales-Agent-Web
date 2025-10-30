import React from 'react';
import styles from './HomeMain.module.css';
import { useView } from '../../../context/ActiveAgentContext'; // Đảm bảo đường dẫn đúng
import { FaShoppingCart, FaSpa, FaUserGraduate, FaArrowRight } from 'react-icons/fa';

const agentCards = [
  {
    id: 'ecommerce-bot',
    view: 'ecommerce-bot-intro',
    icon: <FaShoppingCart size={40} />,
    title: 'E-commerce Agent',
    description: 'Tự động hóa bán hàng, quản lý sản phẩm và xử lý đơn hàng chuyên nghiệp.',
    color: '#007BFF'
  },
  {
    id: 'spa-bot',
    view: 'spa-bot-intro',
    icon: <FaSpa size={40} />,
    title: 'Spa Agent',
    description: 'Quản lý lịch hẹn, giới thiệu dịch vụ và chăm sóc khách hàng cho spa của bạn.',
    color: '#17A2B8'
  },
  {
    id: 'education-bot',
    view: 'education-bot-main',
    icon: <FaUserGraduate size={40} />,
    title: 'Education Agent',
    description: 'Giới thiệu khóa học, hỗ trợ học viên và hỗ trợ đăng ký khóa học nhanh chóng.',
    color: '#28A745'
  }
];

const HomeProducts = () => {
  const { setActiveView } = useView();
    return (
    <div className={styles.homeContainer}>
      <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Trải Nghiệm Sản Phẩm AI Từ Chúng Tôi</h1>
          </div>
        <div className={styles.cardsGrid}>
                {agentCards.map((card) => (
                  <div
                    key={card.id}
                    className={styles.card}
                    onClick={() => setActiveView(card.view)}
                  >
                    <div className={styles.cardIcon} style={{ backgroundColor: card.color }}>
                      {card.icon}
                    </div>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardDescription}>{card.description}</p>
                    <div className={styles.cardFooter}>
                      <span>Try it now</span>
                      <FaArrowRight />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        };
        export default HomeProducts;