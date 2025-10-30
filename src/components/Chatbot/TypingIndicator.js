import React from 'react';
import styles from './Chatbot.module.css';

const TypingIndicator = () => {
  return (
    <div className={`${styles.message} ${styles.bot}`}>
      <div className={styles.typingIndicator}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default TypingIndicator;