import React from 'react';
import styles from './SpaBotSection.module.css'; // Có thể dùng chung hoặc tạo CSS riêng

const FeaturesSpa = () => {
  return (
    <div className={styles.contentWrapper}>
      <h2>Các Tính Năng Chính Của SPA Agent</h2>
      <p>SPA Agent sở hữu các tác vụ xử lý như một nhân viên bán hàng thực thụ</p>
      <div className={styles.featureGrid}>
          <div>Đặt lịch nhanh chóng: Khách hàng chỉ cần nhắn tin, Spa Agent sẽ kiểm tra lịch trống và đặt hẹn ngay..</div>
          <div>Tư vấn dịch vụ cá nhân hóa: Dựa trên nhu cầu và tình trạng da, Agent gợi ý liệu trình phù hợp.</div>
          <div>Chăm sóc sau dịch vụ: Gửi nhắc nhở, hướng dẫn chăm sóc tại nhà, khuyến mãi dành riêng cho khách hàng.</div>
      </div>
    </div>
  );
};

export default FeaturesSpa; 