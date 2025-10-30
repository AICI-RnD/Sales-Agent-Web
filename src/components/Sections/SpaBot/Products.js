import React from 'react';
import styles from './SpaBotSection.module.css'; // Có thể dùng chung hoặc tạo CSS riên
import sectionStyles from '../Sections.module.css';
const ProductsSpa = () => {
  const data = [
        { id: 1, type: "Nam", name: "Trị liệu giác quan bằng mùi hương", time: "60 phút", price: 400000, description: "Massage với tinh dầu thơm + kích thích khứu giác, giảm stress" },
        { id: 2, type: "Nam", name: "Trị liệu giác quan bằng mùi hương", time: "90 phút", price: 500000, description: "Mùi hương + massage sâu hơn, kéo dài thư giãn" },
        { id: 3, type: "Nam", name: "Trị liệu thư giãn đôi chân", time: "60 phút", price: 250000, description: "Ngâm chân & massage chân nhẹ, giảm mỏi" },
        { id: 4, type: "Nam", name: "Trị liệu thư giãn đôi chân", time: "90 phút", price: 350000, description: "Massage chân + bấm huyệt sâu hơn & kéo dài" },
        { id: 5, type: "Nam", name: "Liệu pháp đả thông kinh mạch", time: "60 phút", price: 500000, description: "Day ấn huyệt + kéo cơ cơ bản, giảm nhức mỏi nhanh" },
        { id: 6, type: "Nam", name: "Liệu pháp đả thông kinh mạch", time: "90 phút", price: 600000, description: "Huyệt + kéo căng cơ nhiều vùng, thư giãn sâu" },
        { id: 7, type: "Nam", name: "Trị liệu bóng thảo dược", time: "90 phút", price: 550000, description: "Dùng bóng thảo dược massage + nhiệt để thư giãn sâu" },
        { id: 8, type: "Nam", name: "Bể sục nóng lạnh", time: "30 phút", price: 220000, description: "Combo xông + bể sục nóng lạnh thư giãn nhanh" },
        { id: 9, type: "Nam", name: "Bể sục nóng lạnh", time: "60 phút", price: 350000, description: "Combo xông + bể sục + thư giãn lâu hơn" },
        { id: 10, type: "Nam", name: "Trị liệu đôi chân với đá nóng", time: "90 phút", price: 400000, description: "Massage chân với đá nóng + bấm huyệt sâu" },
        { id: 11, type: "Nữ", name: "Trị liệu oxy tươi tinh khiết", time: "60 phút", price: 500000, description: "Làm sạch sâu + oxy tươi, dưỡng da sáng" },
        { id: 12, type: "Nữ", name: "Trị liệu oxy tươi tinh khiết", time: "90 phút", price: 650000, description: "Quy trình oxy + dưỡng chuyên sâu kéo dài" },
        { id: 13, type: "Nữ", name: "Trị liệu đàn hồi Thạch anh", time: "60 phút", price: 450000, description: "Sử dụng đá thạch anh nhẹ nhàng, massage mặt + cổ" },
        { id: 14, type: "Nữ", name: "Trị liệu đàn hồi Thạch anh", time: "90 phút", price: 600000, description: "Massage lâu hơn + chăm sóc vùng mắt cổ sâu hơn" },
        { id: 15, type: "Nữ", name: "Trắng sáng tảo thiên nhiên", time: "60 phút", price: 550000, description: "Đắp tảo thiên nhiên + dưỡng sáng da mặt" },
        { id: 16, type: "Nữ", name: "Trắng sáng tảo thiên nhiên", time: "90 phút", price: 700000, description: "Đắp tảo + chăm sóc da toàn diện kéo dài" },
        { id: 17, type: "Nữ", name: "Dưỡng ẩm Linseed chuyên sâu", time: "60 phút", price: 500000, description: "Dưỡng ẩm sâu với dầu Linseed, mặt và cổ" },
        { id: 18, type: "Nữ", name: "Dưỡng ẩm Linseed chuyên sâu", time: "90 phút", price: 650000, description: "Chăm sóc da lâu hơn + đắp mặt nạ dưỡng cao cấp" },
        { id: 19, type: "Nữ", name: "Chăm sóc da thiên nhiên", time: "60 phút", price: 450000, description: "Sản phẩm thiên nhiên + nhẹ nhàng cho da nhạy cảm" },
        { id: 20, type: "Nữ", name: "Chăm sóc da thiên nhiên", time: "90 phút", price: 600000, description: "Làm sáng + dưỡng sâu vùng da nhạy cảm" }
      ];
    
      return (
        <div className={styles.wrapper}>
          <h2 className={sectionStyles.word}>Danh Sách Dịch Vụ</h2>
          <h4>🌟Dưới đây là các dịch vụ chăm sóc của trung tâm Spa. Hãy tham khảo và nhờ Agent hỗ trợ đặt lịch nhé!</h4>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Phù hợp với</th>
                <th>Dịch vụ</th>
                <th>Thời gian</th>
                <th>Giá</th>
                <th>Mô tả dịch vụ</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.type}</td>
                  <td>{p.name}</td>
                  <td>{p.time}</td>
                  <td>{p.price}</td>
                  <td>{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  };
export default ProductsSpa;