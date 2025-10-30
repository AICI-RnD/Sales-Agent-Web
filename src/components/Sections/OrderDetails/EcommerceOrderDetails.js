import React from 'react';
import styles from '../OrdersDisplay.module.css';

const EcommerceOrderDetails = ({ order }) => {
  return (
    <div className={styles.recentOrderBody}>
      <p><strong>Mã Đơn Hàng:</strong> {order.order_id}</p>
      <p><strong>Tên Khách Hàng:</strong> {order.customer_name}</p>
      <p><strong>SĐT:</strong> {order.customer_phone}</p>
      <p><strong>Địa chỉ:</strong> {order.customer_address}</p>

       <p><strong>Tổng cộng:</strong> {order.grand_total}</p>
    </div>
    
  );
};

export default EcommerceOrderDetails;