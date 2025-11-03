import React from 'react';
import styles from './Chatbot.module.css';
import { BsRobot } from "react-icons/bs";

const TypingIndicator = ({ text }) => {
  return (
    <div className={styles.typingIndicator}> 
      <div className={styles.avatar}>
        <BsRobot />
      </div>
      <div className={styles.typingBubble}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default TypingIndicator;