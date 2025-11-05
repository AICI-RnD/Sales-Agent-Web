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

// =================================================================
// HẰNG SỐ CẤU HÌNH (V10)
// =================================================================
const MAX_CHAR_PER_CHUNK = 450;

// V10 - Hằng số cho delay động (Tính toán thời gian gõ)
const CHARS_PER_SECOND = 120; // Tốc độ gõ/đọc giả lập: 120 ký tự/giây
const MIN_TYPING_DELAY = 800; // Tối thiểu 0.8s (để user kịp thấy "typing...")
const MAX_TYPING_DELAY = 3500; // Tối đa 3.5s (tránh chờ quá lâu)
// =================================================================


// ==========================================
// V8.2 - Smart Split (Giữ nguyên, logic này đã tốt)
// ==========================================
const splitChunkSmartly = (text, limit) => {
  if (!text) return [];
  text = text.trim();

  // Ưu tiên tách theo đoạn rõ ràng (ngắt bằng \n\n)
  const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const result = [];

  for (let para of paragraphs) {
    // Sửa lỗi ESLint: Bỏ dấu \ không cần thiết trước dấu .
    const isBulletList = /^[-•\d+.]/m.test(para); 

    // 🟢 Nếu là danh sách bullet (vd: - Cài đặt, 1. Giới thiệu)
    if (isBulletList) {
      const bullets = para.split(/\n+/).map(line => line.trim()).filter(Boolean);
      const combinedLength = bullets.join(' ').length;

      // ✅ Nếu danh sách tổng < limit → gộp nguyên block
      if (combinedLength <= limit) {
        result.push(bullets.join('\n'));
      } else {
        // 🔥 Nếu danh sách dài → cắt theo từng bullet
        for (let bullet of bullets) {
          if (bullet.length <= limit) {
            result.push(bullet);
          } else {
            // Nếu 1 bullet quá dài → cắt nhỏ theo dấu chấm câu
            let remaining = bullet;
            while (remaining.length > 0) {
              if (remaining.length <= limit) {
                result.push(remaining.trim());
                break;
              }

              let breakPos =
                remaining.lastIndexOf('. ', limit) ||
                remaining.lastIndexOf(', ', limit) ||
                remaining.lastIndexOf(' ', limit);

              if (breakPos === -1 || breakPos < limit * 0.5) breakPos = limit;

              let chunk = remaining.substring(0, breakPos).trim();
              remaining = remaining.substring(breakPos).trimStart();
              remaining = remaining.replace(/^[-.,!?;:]+/, '').trimStart();
              result.push(chunk);
            }
          }
        }
      }
      continue;
    }

    // 🟢 Nếu KHÔNG phải bullet list:
    if (para.length <= limit) {
      result.push(para);
      continue;
    }

    // Nếu đoạn dài → chia thông minh
    let remaining = para;
    while (remaining.length > 0) {
      if (remaining.length <= limit) {
        result.push(remaining.trim());
        break;
      }

      let breakPos =
        remaining.lastIndexOf('. ', limit) ||
        remaining.lastIndexOf('! ', limit) ||
        remaining.lastIndexOf('? ', limit);

      if (breakPos < limit * 0.5) breakPos = remaining.lastIndexOf(', ', limit);
      if (breakPos < limit * 0.5) breakPos = remaining.lastIndexOf('\n', limit);
      if (breakPos === -1 || breakPos < limit * 0.5) breakPos = limit;

      let chunk = remaining.substring(0, breakPos).trim();
      remaining = remaining.substring(breakPos).trimStart();
      remaining = remaining.replace(/^[-.,!?;:]+/, '').trimStart();

      result.push(chunk);
    }
  }

  // ✅ Gộp đoạn ngắn với đoạn sau nếu <100 ký tự
  const merged = [];
  for (let i = 0; i < result.length; i++) {
    const current = result[i];
    const next = result[i + 1];
    // Không gộp nếu đoạn sau là bullet
    if (current.length < 100 && next && !next.startsWith('-') && !next.startsWith('•') && !/^\d+\./.test(next)) {
      merged.push(current + ' ' + next);
      i++;
    } else {
      merged.push(current);
    }
  }

  return merged.filter(Boolean);
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
    
    // 2. Bật typing "chuẩn" trong khi chờ API
    dispatch({ type: 'SET_TYPING_TEXT', payload: { agentId, text: "Anh/Chị pha miếng trà, ăn miếng bánh. Đợi em xí nhé🤓" } });
    const botReplyText = await getBotResponse(agentId, chatId, userMessage.text);

    // 3. Tắt typing "chuẩn"
    dispatch({ type: 'SET_TYPING_TEXT', payload: { agentId, text: null } });

    // 4. Xử lý node --end--
    if (botReplyText === '__SILENT_END__') {
      return; 
    }

    try {
      // 5. Xử lý lỗi Falsy
      if (!botReplyText || botReplyText.trim() === '') {
        sendHardcodedError(agentId); 
        return; 
      }

      // 6. Chia tin nhắn thông minh (Giữ nguyên V8.2)
      const replyString = String(botReplyText);
      const finalMessageChunks = splitChunkSmartly(replyString, MAX_CHAR_PER_CHUNK);
      
      // =================================================================
      // 7. NÂNG CẤP V10: Vòng lặp gửi tin nhắn với DELAY ĐỘNG
      // =================================================================
      for (const [index, chunk] of finalMessageChunks.entries()) {
        
        // A. BẬT typing ngẫu nhiên
        const randomText = getRandomTypingText();
        dispatch({ type: 'SET_TYPING_TEXT', payload: { agentId, text: randomText } });
        
        // B. TÍNH TOÁN VÀ CHỜ (Delay động)
        // Tính thời gian "gõ" dựa trên độ dài chunk
        const typingTime = (chunk.length / CHARS_PER_SECOND) * 1000;
        
        // Đảm bảo thời gian chờ nằm trong khoảng MIN và MAX
        const dynamicDelay = Math.max(MIN_TYPING_DELAY, Math.min(typingTime, MAX_TYPING_DELAY));
        
        await delay(dynamicDelay); 
        
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