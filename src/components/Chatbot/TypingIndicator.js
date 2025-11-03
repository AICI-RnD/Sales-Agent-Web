import React from 'react';
import styles from './Chatbot.module.css';
import { BsRobot } from "react-icons/bs";
const TypingIndicator = () => {
  return (
    // Sử dụng class mới từ Chatbot.module.css
    <div className={styles.typingIndicator}> 
      <div className={styles.avatar}>
        <BsRobot />
      </div>
      <div className={styles.typingBubble}>
        <p>Đợi mình tí, mình mới vô nghề, gõ tin nhắn hơi chậm xí...😎</p>
      </div>
    </div>
  );
};

export default TypingIndicator;