import React from 'react';
import styles from './EcommerceBotSection.module.css'; // Có thể dùng chung hoặc tạo CSS riêng

const Features = () => {
  return (
    <div className={styles.contentWrapper}>
      <h2>Các Tính Năng Chính Của E-commerce Agent</h2>
      <p>E-commerce Agent sở hữu các tác vụ xử lý như một nhân viên bán hàng thực thụ</p>
      <div className={styles.featureGrid}>
          <div>Tư vấn sản phẩm</div>
          <div>Trả lời các Q&A về sản phẩm</div>
          <div>Lên đơn tự động</div>
      </div>
    </div>
  );
};

export default Features; 