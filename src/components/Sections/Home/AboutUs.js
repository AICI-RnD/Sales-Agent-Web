// src/components/Sections/Home/AboutUs.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './AboutUs.module.css';

const HomeAbout = () => {
  // Thêm 'image' vào data. Sử dụng placeholder, bạn hãy thay bằng ảnh thật nhé.
  const features = [
    {
      title: 'Thực Chiến',
      description: 'Ưu tiên tính ứng dụng – mọi nội dung đều bám sát công việc thật, bài toán thật.',
      image: '/amp.jpeg',
    },
    {
      title: 'Dễ Tiếp Cận',
      description: 'Học bằng tiếng Việt, mentor kèm 1-1, lộ trình rõ ràng, phù hợp cả người chưa biết gì.',
      image: '/AI4Everyone.png',
    },
    {
      title: 'Đồng Hành',
      description: 'Không bỏ mặc học viên – có người hướng dẫn, cộng đồng hỗ trợ, gamification giúp giữ nhịp.',
      image: '/donghanh.jpeg',
    },
    {
      title: 'Kết Nối',
      description: 'Liên kết học viên, chuyên gia, doanh nghiệp, tổ chức  cùng phát triển năng lực AI.',
      image: '/connect.jpeg',
    },
    {
      title: 'Tiên Phong',
      description: 'Cập nhật liên tục những công cụ, xu hướng, mô hình AI mới nhất.',
      image: '/tp.jpeg',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const numItems = features.length;
  const itemAngle = 360 / numItems;
  const wheelRotation = -activeIndex * itemAngle;

  const intervalRef = useRef(null);

  // FIX: Bọc hàm bằng useCallback
  const goToNextItem = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % numItems);
  }, [numItems]);

  // FIX: Khởi tạo và dừng tự động xoay
  useEffect(() => {
    // Xóa interval cũ nếu có
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Thiết lập interval mới
    intervalRef.current = setInterval(goToNextItem, 10000); // Tự động xoay sau mỗi 5 giây

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [goToNextItem]); // FIX: Dependency đã chính xác

  // FIX: Bọc hàm bằng useCallback
  // const handleItemClick = useCallback((index) => {
  //   setActiveIndex(index);
  //   // Reset timer khi người dùng click
  //   if (intervalRef.current) {
  //     clearInterval(intervalRef.current);
  //     intervalRef.current = setInterval(goToNextItem, 5000);
  //   }
  // }, [goToNextItem]);
  return (
    <div className={styles.aboutContainer}>
      {/* Tiêu đề */}
      <div className={styles.heroBox}>
        <h1 className={styles.title}>Định Hình Tương Lai Với AI</h1>
        <p className={styles.subtitle}>
          Năm giá trị cốt lõi trong hệ sinh thái của AICI Global
        </p>
      </div>

      {/* Bố cục chính: 2 cột */}
      <div className={styles.mainLayout}>
        {/* Cột trái: Bánh xe xoay */}
        <div className={styles.wheelContainer}>
          <div
            className={styles.wheel}
            style={{ transform: `rotate(${wheelRotation}deg)` }}
          >
            {features.map((feature, index) => {
              const itemRotation = index * itemAngle;
              return (
                <div
                  key={index}
                  className={`${styles.wheelItem} ${
                    index === activeIndex ? styles.active : ''
                  }`}
                  style={{
                    transform: `rotate(${itemRotation}deg) translate(var(--wheel-radius))`,
                  }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div
                    className={styles.itemContent}
                    style={{
                      transform: `rotate(${-(itemRotation + wheelRotation)}deg)`,
                    }}
                  >
                    {feature.title}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Trung tâm bánh xe (trang trí) */}
          <div className={styles.wheelHub}></div>
        </div>

        {/* Cột phải: Nội dung chi tiết */}
        <div className={styles.contentContainer}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.contentItem} ${
                index === activeIndex ? styles.visible : ''
              }`}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className={styles.contentImage}
                onError={(e) => {
                  // Fallback phòng khi ảnh lỗi
                  e.target.src =
                    'https://placehold.co/600x400/1e293b/94a3b8?text=Image+Error';
                }}
              />
              <p className={styles.description}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;