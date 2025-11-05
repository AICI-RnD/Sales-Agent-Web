import React from 'react';
import styles from '../OrdersDisplay.module.css';

const EducationOrderDetails = ({ order }) => {
  return (
    <div className={styles.recentOrderBody}>
      <p><strong>Mã Đăng ký:</strong> {order.ID}</p>
      <p><strong>Họ tên học viên:</strong> {order["Customer name"]}</p>
      <p><strong>SĐT:</strong> {order["Customer phone"]}</p>
      <p><strong>Email:</strong> {order["Customer email"]}</p>
      <p><strong>Ngày nhập học:</strong> {order["Admission day"]}</p>
      <p><strong>Học phí:</strong> {order["Grand total"]}</p>
    </div>
  );
};  

export default EducationOrderDetails;