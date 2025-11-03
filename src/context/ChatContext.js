import React, { createContext, useReducer, useContext } from 'react';
import chatReducer, { initialState } from './ChatReducer';
import { getBotResponse } from '../services/apiService';

const ChatContext = createContext();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// =================================================================
// NÂNG CẤP V6: Thêm hằng số và hàm chia nhỏ theo ký tự
// =================================================================
const MAX_CHAR_PER_CHUNK = 300; // Giới hạn ký tự mỗi tin nhắn

/**
 * Hàm chia nhỏ một chunk văn bản dài thành nhiều chunk nhỏ hơn.
 * Ưu tiên ngắt tại dấu cách hoặc dấu chấm gần giới hạn.
 * @param {string} text - Đoạn văn bản cần chia.
 * @param {number} limit - Số ký tự tối đa.
 * @returns {string[]} - Mảng các đoạn văn bản đã chia nhỏ.
 */
const splitChunkSmartly = (text, limit) => {
  if (text.length <= limit) {
    return [text];
  }

  const chunks = [];
  let currentText = text;

  while (currentText.length > 0) {
    if (currentText.length <= limit) {
      chunks.push(currentText);
      break;
    }

    // Tìm vị trí ngắt lý tưởng (dấu cách, dấu chấm) gần giới hạn
    let breakPos = -1;
    // Thử tìm dấu cách
    breakPos = currentText.lastIndexOf(' ', limit);
    // Nếu không có dấu cách, thử tìm dấu chấm
    if (breakPos === -1) {
      breakPos = currentText.lastIndexOf('.', limit);
    }
    // Nếu không tìm thấy cả hai, hoặc vị trí quá xa (ví dụ: ở đầu), thì cắt cứng
    if (breakPos === -1 || breakPos < limit * 0.7) {
      breakPos = limit;
    }

    // Lấy chunk và phần còn lại
    chunks.push(currentText.substring(0, breakPos).trim());
    currentText = currentText.substring(breakPos).trim();
  }

  return chunks;
};
// =================================================================

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Tạo một hàm gửi tin nhắn lỗi "set cứng"
  // (Tôi thấy bạn đã đổi câu này, tôi sẽ giữ nguyên)
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
    // NÂNG CẤP V6: Tích hợp logic chia theo ký tự
    // =================================================================

    // 1. Xử lý node --end-- (khi backend trả về input)
    if (botReplyText === '__SILENT_END__') {
      return; // Dừng, không làm gì cả, không báo lỗi.
    }

    // 2. Bọc logic cũ trong try...catch
    try {
      // 3. Xử lý khi Backend không trả về nội dung (Falsy)
      if (!botReplyText || botReplyText.trim() === '') {
        sendHardcodedError(agentId); // Gửi lỗi
        return; // Dừng
      }

      // 4. Chia tin nhắn "thông minh" (Vẫn như cũ)
      const doubleNewlineRegex = /\n\s*\n/;
      const replyString = String(botReplyText);
      let initialChunks = [];

      if (doubleNewlineRegex.test(replyString)) {
        // Ưu tiên chia theo CÁC KHỐI VĂN BẢN
        initialChunks = replyString
          .split(doubleNewlineRegex)
          .map(chunk => chunk.trim())
          .filter(chunk => chunk.length > 0);
      } else {
        // Nếu không có khối, chia theo TỪNG DÒNG
        initialChunks = replyString
          .split('\n')
          .filter(chunk => chunk.trim().length > 0);
      }
      
      // 5. NÂNG CẤP V6: Xử lý các chunk quá dài
      const finalMessageChunks = [];
      for (const chunk of initialChunks) {
        // Nếu chunk ngắn, thêm vào
        if (chunk.length <= MAX_CHAR_PER_CHUNK) {
          finalMessageChunks.push(chunk);
        } else {
          // Nếu chunk quá dài, dùng hàm chia nhỏ và thêm các phần con vào
          const subChunks = splitChunkSmartly(chunk, MAX_CHAR_PER_CHUNK);
          finalMessageChunks.push(...subChunks);
        }
      }

      // 6. Lặp qua từng phần (đã được chia nhỏ) và gửi chúng
      for (const [index, chunk] of finalMessageChunks.entries()) {
        const botMessage = {
          id: Date.now() + index,
          text: chunk,
          sender: 'bot',
        };
        dispatch({ type: 'ADD_MESSAGE', payload: { agentId, message: botMessage } });
        if (index < finalMessageChunks.length - 1) {
          // Lấy độ trễ từ file của bạn
          await delay(3000); 
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