// src/components/Sections/Home/Products.js
import React from 'react';
import styles from './Products.module.css';
import { useView } from '../../../context/ActiveAgentContext'; 
import { FaArrowRight, FaShoppingCart, FaSpa, FaUserGraduate } from 'react-icons/fa';

// Danh sách sản phẩm
const agentCards = [
  {
    id: 'ecommerce-bot',
    view: 'ecommerce-bot-intro',
    title: 'E-commerce AI Agent',
    description: 'Giải pháp tự động hóa quy trình bán hàng, chốt đơn và chăm sóc khách hàng 24/7. Tăng trưởng doanh thu vượt trội.',
    // Nếu bạn có ảnh thật, điền đường dẫn vào đây: image: '/images/ecommerce.jpg',
    image: './eco.jpeg', 
    fallbackIcon: <FaShoppingCart size={50} color="white" />,
    fallbackColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' // Xanh dương
  },
  {
    id: 'spa-bot',
    view: 'spa-bot-intro',
    title: 'Spa & Beauty AI',
    description: 'Hệ thống quản lý lịch hẹn thông minh, nhắc lịch tự động và tư vấn liệu trình làm đẹp cá nhân hóa chuyên nghiệp.',
    image: './spa.jpeg',
    fallbackIcon: <FaSpa size={50} color="white" />,
    fallbackColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' // Hồng tím
  },
  {
    id: 'education-bot',
    view: 'education-bot-main',
    title: 'Education Assistant',
    description: 'Trợ lý tuyển sinh ảo, hỗ trợ giải đáp thắc mắc học viên tức thì và xây dựng lộ trình học tập hiệu quả.',
    image: './edu.jpeg',
    fallbackIcon: <FaUserGraduate size={50} color="white" />,
    fallbackColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' // Xanh ngọc
  }
];

const HomeProducts = () => {
  const { setActiveView } = useView();

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>Giải Pháp AI Toàn Diện</h2>
      </div>
      
      <div className={styles.cardsGrid}>
        {agentCards.map((card) => (
          <div key={card.id} className={styles.card}>
            
            {/* --- PHẦN HÌNH ẢNH TRÀN VIỀN --- */}
            <div className={styles.imageContainer}>
              {card.image ? (
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className={styles.productImage} 
                />
              ) : (
                // Nếu chưa có ảnh thì hiện Gradient + Icon
                <div 
                  className={styles.imagePlaceholder}
                  style={{ background: card.fallbackColor }}
                >
                  {card.fallbackIcon}
                </div>
              )}
            </div>
            
            {/* --- PHẦN NỘI DUNG --- */}
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
              
              <button 
                className={styles.learnMoreBtn}
                onClick={() => setActiveView(card.view)}
              >
                Tìm hiểu thêm <FaArrowRight size={12} />
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeProducts;