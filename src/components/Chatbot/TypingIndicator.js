import React from 'react';
import styles from './Chatbot.module.css';

const TypingIndicator = ({ text }) => {
  return (
    <div className="flex items-center space-x-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none w-fit">
      {/* Dot 1 */}
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      {/* Dot 2 */}
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      {/* Dot 3 */}
      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
    </div>
  );
};

export default TypingIndicator;