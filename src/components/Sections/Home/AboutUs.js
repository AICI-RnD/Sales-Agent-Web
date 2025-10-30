// src/components/Sections/Home/AboutUs.js
import React, { useState } from 'react';
import styles from './AboutUs.module.css';
import sectionStyles from '../Sections.module.css';

const HomeAbout = () => {
  const features = [
    { 
      title: "Thực Chiến", 
      description: "Ưu tiên tính ứng dụng – mọi nội dung đều bám sát công việc thật, bài toán thật.",
      icon: "⚡"
    },
    { 
      title: "Dễ Tiếp Cận", 
      description: "Học bằng tiếng Việt, mentor kèm 1-1, lộ trình rõ ràng, phù hợp cả người chưa biết gì.",
      icon: "🎯"
    },
    { 
      title: "Đồng Hành", 
      description: "Không bỏ mặc học viên – có người hướng dẫn, cộng đồng hỗ trợ, gamification giúp giữ nhịp.",
      icon: "🤝"
    },
    { 
      title: "Kết Nối", 
      description: "Liên kết học viên, chuyên gia, doanh nghiệp, tổ chức  cùng phát triển năng lực AI.",
      icon: "🔗"
    },
    { 
      title: "Tiên Phong", 
      description: "Cập nhật liên tục những công cụ, xu hướng, mô hình AI mới nhất.",
      icon: "🚀"
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={styles.aboutContainer}>
      {/* Hero Section */}
      <div className={styles.heroBox}>
        <h1 className={sectionStyles.title}>Định Hình Tương Lai Với AI</h1>
        <p className={styles.subtitle}>Năm giá trị cốt lõi trong hệ sinh thái của AICI Global</p>
      </div>

      {/* Honeycomb Grid */}
      <div className={styles.honeycombWrapper}>
        <div className={styles.honeycombGrid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={styles.honeycombItem}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`${styles.honeycombCell} ${hoveredIndex === index ? styles.hovered : ''}`}>
                <div className={styles.cellBackground}></div>
                
                <div className={styles.cellContent}>
                  <div className={`${styles.featureIcon} ${hoveredIndex === index ? styles.iconHovered : ''}`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className={`${styles.featureTitle} ${hoveredIndex === index ? styles.titleHovered : ''}`}>
                    {feature.title}
                  </h3>
                  
                  <p className={`${styles.featureDescription} ${hoveredIndex === index ? styles.descriptionVisible : ''}`}>
                    {feature.description}
                  </p>
                </div>

                {hoveredIndex === index && <div className={styles.shineEffect}></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;