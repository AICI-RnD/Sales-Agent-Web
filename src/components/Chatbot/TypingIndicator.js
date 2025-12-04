import React from 'react';
import styles from './Chatbot.module.css';

const TypingIndicator = () => {
  return (
    <div className={styles.bot}> {/* Thêm class bot để avatar và bubble thẳng hàng */}
      <div className={styles.typingContainer}>
        <div className={styles.typingDot}></div>
        <div className={styles.typingDot}></div>
        <div className={styles.typingDot}></div>
      </div>
    </div>
  );
};

export default TypingIndicator;