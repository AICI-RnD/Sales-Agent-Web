import React, { createContext, useReducer, useContext } from 'react';
import chatReducer, { initialState } from './ChatReducer';
import { getBotResponse } from '../services/apiService';

const ChatContext = createContext();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Tạo một hàm gửi tin nhắn lỗi "set cứng"
  const sendHardcodedError = (agentId) => {
    const errorMessage = {
      id: Date.now(),
      text: "Cảm ơn anh/chị đã tin tưởng và trải nghiệm dịch vụ bên em ạ! Nếu anh/chị cần hỗ trợ thêm, cứ chia sẻ với em nhé! 😊",
      sender: 'bot',
    };
    dispatch({ type: 'ADD_MESSAGE', payload: { agentId, message: errorMessage } });
  };

  const sendMessage = async (agentId, chatId, userMessage) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { agentId, message: userMessage } });
    dispatch({ type: 'SET_TYPING', payload: { agentId, isTyping: true } });

    const botReplyText = await getBotResponse(agentId, chatId, userMessage.text);

    dispatch({ type: 'SET_TYPING', payload: { agentId, isTyping: false } });

    // =================================================================
    // NÂNG CẤP V5: Thêm logic xử lý __SILENT_END__
    // =================================================================

    // 1. Xử lý node --end-- (khi backend trả về input)
    if (botReplyText === '__SILENT_END__') {
      sendHardcodedError(agentId);
      return; // Dừng, không làm gì cả, không báo lỗi.
    }

    // 2. Bọc logic cũ trong try...catch
    try {
      // 3. Xử lý khi Backend không trả về nội dung (Falsy)
      if (!botReplyText || botReplyText.trim() === '') {
        sendHardcodedError(agentId); // Gửi lỗi
        return; // Dừng
      }

      // 4. Chia tin nhắn "thông minh" theo khối (vẫn như cũ)
      const doubleNewlineRegex = /\n\s*\n/;
      let messageChunks = [];
      const replyString = String(botReplyText);

      if (doubleNewlineRegex.test(replyString)) {
        messageChunks = replyString
          .split(doubleNewlineRegex)
          .map(chunk => chunk.trim())
          .filter(chunk => chunk.length > 0);
      } else {
        messageChunks = replyString
          .split('\n')
          .filter(chunk => chunk.trim().length > 0);
      }

      // 5. Lặp qua từng phần và gửi chúng (vẫn như cũ)
      for (const [index, chunk] of messageChunks.entries()) {
        const botMessage = {
          id: Date.now() + index,
          text: chunk,
          sender: 'bot',
        };
        dispatch({ type: 'ADD_MESSAGE', payload: { agentId, message: botMessage } });
        if (index < messageChunks.length - 1) {
          await delay(2300); 
        }
      }
    } catch (error) {
      console.error("Lỗi khi xử lý/chia nhỏ tin nhắn bot:", error);
      sendHardcodedError(agentId); // Gửi tin nhắn lỗi "set cứng"
    }
    // =================================================================
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