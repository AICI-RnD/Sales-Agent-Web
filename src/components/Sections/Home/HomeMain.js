import React from 'react';
import styles from './HomeMain.module.css';
import sectionStyles from '../Sections.module.css';
import TypingEffect from './TypingEffect';

const HomeMain = () => {
  const dynamicWords = ["Ứng Dụng", "Thực Chiến", "Tiên Tiến"];
  return (
    <div className={`${styles.homeContainer} ${sectionStyles.section}`}>
      <div className={styles.heroSection}>
        {/* --- KHỐI NỘI DUNG VĂN BẢN (BÊN TRÁI) --- */}
        <div className={styles.heroText}>
          <h1 className={sectionStyles.title}>
            <span className={styles.mainTitle}>Chào mừng bạn đến với AICI GLOBAL </span>
            <span className={styles.secTitle}>Hệ Sinh Thái AI <TypingEffect words={dynamicWords} /> </span>
          </h1>
          <p className={sectionStyles.paragraph}>
            Kết nối cộng đồng chuyên gia và hệ sinh thái AI ứng dụng giúp cá nhân & doanh nghiệp Việt học tập, kết nối và triển khai AI vào thực tiễn nhanh chóng.
          </p>
        </div>

        {/* --- KHỐI HÌNH ẢNH ROBOT (BÊN PHÁI) --- */}
        <div className={styles.heroVisual}>
          <img src="\bott.png" alt="AI Robot" className={styles.robotImage} />
        </div>
      </div>
      {/* --- NÚT CUỘN CHUỘT --- */}
      <div className={styles.scrollDownContainer}>
        <div className={styles.mouse}>
            <div className={styles.scroller}></div>
        </div>
      </div>
    </div>
  );
};
export default HomeMain;