import React from 'react';
import styles from './EcommerceBotSection.module.css'; // Có thể dùng chung hoặc tạo CSS riêng

const Orders = () => {
  const data = [
      { id: 1, name: "Sản phẩm A", price: 100, stock: 50 },
      { id: 2, name: "Sản phẩm B", price: 200, stock: 30 },
      { id: 3, name: "Sản phẩm C", price: 300, stock: 20 },
    ];
  
    return (
      <div className={styles.wrapper}>
        <h2>Danh sách sản phẩm</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Mã SP</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Tồn kho</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Orders; 