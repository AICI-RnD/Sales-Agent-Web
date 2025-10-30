import React from 'react';
import styles from './EducationBotSection.module.css'; // Có thể dùng chung hoặc tạo CSS riêng

const FeaturesEdu= () => {
  return (
    <div className={styles.contentWrapper}>
      <h2>Các Tính Năng Chính Của Education Agent</h2>
      <p>Education Agent sở hữu các tác vụ xử lý như một nhân viên bán hàng thực thụ</p>
      <div className={styles.featureGrid}>
          <div>Tư vấn khóa học thông minh: Giúp học viên tìm chương trình phù hợp theo nhu cầu, mục tiêu học tập và ngân sách.</div>
          <div>Hỗ trợ đăng ký nhanh: Tự động hướng dẫn học viên điền thông tin, xác nhận và thanh toán.</div>
          <div>Chăm sóc học viên 24/7: Trả lời thắc mắc, cung cấp tài liệu, nhắc nhở lịch học hoặc kỳ thi.</div>
      </div>
    </div>
  );
};

export default FeaturesEdu; 