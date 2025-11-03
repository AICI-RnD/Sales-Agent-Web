import React, { createContext, useReducer, useContext } from 'react';
import chatReducer, { initialState } from './ChatReducer';
import { getBotResponse } from '../services/apiService';

const ChatContext = createContext();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const TYPING_MESSAGES = [
  "Đợi mình tí, mình mới vô nghề, gõ tin nhắn hơi chậm xí...😎",
  "Hmm, để ní xem nào... 🤔",
  "Dạ em đang tìm thông tin ạ...",
  "Xin chờ một lát nhé! 🤓",
  "Để em kiểm tra nhaaaaa...",
  "Đợi mình hỏi sếp phát nha...😅",
];

const getRandomTypingText = () => TYPING_MESSAGES[Math.floor(Math.random() * TYPING_MESSAGES.length)];

// Hằng số và hàm chia nhỏ từ V6 (Giữ nguyên)
const MAX_CHAR_PER_CHUNK = 300; 
const splitChunkSmartly = (text, limit) => {
  if (text.length <= limit) return [text];
  const chunks = [];
  let currentText = text;
  while (currentText.length > 0) {
    if (currentText.length <= limit) {
      chunks.push(currentText);
      break;
    }
    let breakPos = -1;
    breakPos = currentText.lastIndexOf(' ', limit);
    if (breakPos === -1) breakPos = currentText.lastIndexOf('.', limit);
    if (breakPos === -1 || breakPos < limit * 0.7) breakPos = limit;
    chunks.push(currentText.substring(0, breakPos).trim());
    currentText = currentText.substring(breakPos).trim();
  }
  return chunks;
};
// =================================================================


export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const sendHardcodedError = (agentId) => {
    const errorMessage = {
      id: Date.now(),
      text: "Cảm ơn anh/chị đã tin tưởng và trải nghiệm dịch vụ bên em ạ! Nếu anh/chị cần hỗ trợ thêm, cứ chia sẻ với em nhé! 😊",
      sender: 'bot',
    };
    dispatch({ type: 'ADD_MESSAGE', payload: { agentId, message: errorMessage } });
  };

  const sendMessage = async (agentId, chatId, userMessage) => {
    // 1. Gửi tin nhắn của người dùng
    dispatch({ type: 'ADD_MESSAGE', payload: { agentId, message: userMessage } });
    
    // 2. THAY ĐỔI: Bật typing "chuẩn" trong khi chờ API
    dispatch({ type: 'SET_TYPING_TEXT', payload: { agentId, text: "Xin chờ mình một lát nhé! 🤓" } });
    const botReplyText = await getBotResponse(agentId, chatId, userMessage.text);

    // 3. THAY ĐỔI: Tắt typing "chuẩn"
    dispatch({ type: 'SET_TYPING_TEXT', payload: { agentId, text: null } });

    // 4. Xử lý node --end-- (Như cũ)
    if (botReplyText === '__SILENT_END__') {
      return; 
    }

    try {
      // 5. Xử lý lỗi Falsy (Như cũ)
      if (!botReplyText || botReplyText.trim() === '') {
        sendHardcodedError(agentId); 
        return; 
      }

      // 6. Chia tin nhắn thông minh (Như cũ - V6)
      const doubleNewlineRegex = /\n\s*\n/;
      const replyString = String(botReplyText);
      let initialChunks = [];
      if (doubleNewlineRegex.test(replyString)) {
        initialChunks = replyString.split(doubleNewlineRegex).map(chunk => chunk.trim()).filter(chunk => chunk.length > 0);
      } else {
        initialChunks = replyString.split('\n').filter(chunk => chunk.trim().length > 0);
      }
      
      const finalMessageChunks = [];
      for (const chunk of initialChunks) {
        if (chunk.length <= MAX_CHAR_PER_CHUNK) {
          finalMessageChunks.push(chunk);
        } else {
          const subChunks = splitChunkSmartly(chunk, MAX_CHAR_PER_CHUNK);
          finalMessageChunks.push(...subChunks);
        }
      }

      // =================================================================
      // 7. NÂNG CẤP V7: Thay đổi vòng lặp gửi tin nhắn
      // =================================================================
      for (const [index, chunk] of finalMessageChunks.entries()) {
        
        // A. BẬT typing ngẫu nhiên
        const randomText = getRandomTypingText();
        dispatch({ type: 'SET_TYPING_TEXT', payload: { agentId, text: randomText } });
        
        // B. CHỜ (Đây chính là 3000ms của bạn, giờ nó là "thời gian gõ")
        await delay(3000); 
        
        // C. TẮT typing
        dispatch({ type: 'SET_TYPING_TEXT', payload: { agentId, text: null } });

        // D. GỬI tin nhắn thật
        const botMessage = {
          id: Date.now() + index,
          text: chunk,
          sender: 'bot',
        };
        dispatch({ type: 'ADD_MESSAGE', payload: { agentId, message: botMessage } });

        // E. Chờ 0.5s trước khi lặp lại (cho tự nhiên)
        if (index < finalMessageChunks.length - 1) {
          await delay(500); 
        }
      }
      // =================================================================

    } catch (error) {
      console.error("Lỗi khi xử lý/chia nhỏ tin nhắn bot:", error);
      dispatch({ type: 'SET_TYPING_TEXT', payload: { agentId, text: null } }); // Tắt typing nếu lỗi
      sendHardcodedError(agentId);
    }
  };
  
  const resetSession = (agentId) => {
    dispatch({ type: 'RESET_SESSION', payload: { agentId } });
  };

  return (
    <ChatContext.Provider value={{ conversations: state, sendMessage, resetSession }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};