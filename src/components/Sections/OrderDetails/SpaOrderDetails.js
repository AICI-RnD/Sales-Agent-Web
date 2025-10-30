import React from 'react';
import styles from '../OrdersDisplay.module.css';

const SpaOrderDetails = ({ order }) => {
  return (
    <div className={styles.recentOrderBody}>
        <p><strong>Mã Lịch hẹn:</strong> {order.ID}</p>
        <p><strong>Tên khách:</strong> {order.Name}</p>
        <p><strong>SĐT:</strong> {order.Phone}</p>
        <p><strong>Email:</strong> {order.Email}</p>
        <p><strong>Tên NV thực hiện:</strong> {order.staff}</p>
        <p><strong>Phòng:</strong> {order.room}</p>
    </div>
  );
};

export default SpaOrderDetails;