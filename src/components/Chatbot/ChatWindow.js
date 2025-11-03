import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import { useView } from '../../context/ActiveAgentContext'; // Bạn cần file context này
import styles from './Chatbot.module.css';
import { FaUser, FaPaperPlane, FaSync  } from 'react-icons/fa';
import { BsRobot } from "react-icons/bs";
import TypingIndicator from './TypingIndicator'
// Cấu hình tên và icon Agent
const agentConfig = {
    'home': { name: 'Trợ lý chung', icon: <BsRobot /> },
    'ecommerce-bot': { name: 'E-commerce Agent', icon: <BsRobot /> },
    'spa-bot': { name: 'Spa Agent', icon: <BsRobot /> },
    'education-bot': { name: 'Education Agent', icon: <BsRobot /> },
    'default': { name: 'Trợ lý ảo', icon: <BsRobot /> }
};

const ChatWindow = () => {
  const { conversations, sendMessage, resetSession  } = useChat(); 
  const { activeView } = useView();
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Xác định agentId hiện tại
  let agentId = activeView.startsWith('home') ? 'default' : activeView.split('-').slice(0, 2).join('-');
  if (!conversations[agentId]) {
      agentId = 'default';
  }

  const currentConversation = conversations[agentId];
  const agentName = agentConfig[agentId]?.name || "Trợ lý ảo";
  const agentIcon = agentConfig[agentId]?.icon || <BsRobot />;

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
    };
    
    setInputValue('');
    await sendMessage(agentId, currentConversation.chat_id, userMessage);
  };
  const handleReset = () => {
    resetSession(agentId);
  };
  if (!currentConversation) {
    return <div className={styles.loading}>Đang tải cuộc hội thoại...</div>;
  }

  const isBotTyping = !!currentConversation.typingText;

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <h3>Chat với {agentName}</h3>
        <button onClick={handleReset} className={styles.resetButton} title="Bắt đầu lại cuộc trò chuyện">
          <FaSync />
        </button>
      </div>
      <div className={styles.messageList}>
        {currentConversation.messages.map((msg) => (
          <div key={msg.id} className={`${styles.message} ${styles[msg.sender]}`}>
            <div className={styles.avatar}>
              {msg.sender === 'bot' ? agentIcon : <FaUser />}
            </div>
            <p>{msg.text}</p>
          </div>
        ))}
        {isBotTyping && <TypingIndicator text={currentConversation.typingText} />}
        <div ref={messagesEndRef} />
      </div>
      <form className={styles.chatInputForm} onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nhập tin nhắn..."
          // THAY ĐỔI: Vô hiệu hóa khi 'isBotTyping' là true
          disabled={isBotTyping}
        />
        <button type="submit" disabled={!inputValue.trim() || isBotTyping}>
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;