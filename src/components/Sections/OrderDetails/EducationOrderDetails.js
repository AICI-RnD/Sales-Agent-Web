import React from 'react';
import styles from '../OrdersDisplay.module.css';

const EducationOrderDetails = ({ order }) => {
  return (
    <div className={styles.recentOrderBody}>
      <p><strong>Mã Đăng ký:</strong> {order.ID}</p>
      <p><strong>Họ tên học viên:</strong> {order.Name}</p>
      <p><strong>SĐT:</strong> {order.Phone}</p>
      <p><strong>Email:</strong> {order.Email}</p>
      <p><strong>Khóa học:</strong> {order.Course}</p>
      <p><strong>Học phí:</strong> {order.Fee}</p>
    </div>
  );
};  

export default EducationOrderDetails;