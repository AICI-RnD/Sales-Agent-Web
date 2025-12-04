import React, { createContext, useReducer, useContext } from 'react';
import chatReducer, { initialState } from './ChatReducer';
import { getBotResponse } from '../services/apiService';

const ChatContext = createContext();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const TYPING_INDICATOR = "...";


// =================================================================
// HẰNG SỐ CẤU HÌNH (V10)
// =================================================================
const MAX_CHAR_PER_CHUNK = 450;
const CHARS_PER_SECOND = 120; // Tốc độ gõ/đọc giả lập: 120 ký tự/giây
const MIN_TYPING_DELAY = 800; // Tối thiểu 0.8s (để user kịp thấy "typing...")
const MAX_TYPING_DELAY = 3500; // Tối đa 3.5s (tránh chờ quá lâu)
// =================================================================

// =================================================================
const splitChunkSmartly = (text, limit) => {
  if (!text) return [];
  text = text.trim();

  // Ưu tiên tách theo đoạn rõ ràng (ngắt bằng \n\n)
  const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const result = [];

  for (let para of paragraphs) {
    const isBulletList = /^[-•\d+.]/m.test(para);

    // 🟢 V11: THAY ĐỔI TẠI ĐÂY
    // Nếu là danh sách bullet → Gộp chung làm 1 tin nhắn, BẤT KỂ độ dài.
    if (isBulletList) {
      result.push(para); // Đẩy cả đoạn bullet list vào, không cắt
      continue; // Bỏ qua các bước kiểm tra limit bên dưới
    }
    // HẾT THAY ĐỔI V11

    // 🟢 Nếu KHÔNG phải bullet list (Logic như cũ):
    if (para.length <= limit) {
      result.push(para);
      continue;
    }

    // Nếu đoạn dài → chia thông minh (Logic như cũ)
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

  // ✅ Gộp đoạn ngắn với đoạn sau nếu <100 ký tự (Logic như cũ)
  const merged = [];
  for (let i = 0; i < result.length; i++) {
    const current = result[i];
    const next = result[i + 1];
    
    // Cập nhật V11: Không gộp nếu ĐOẠN HIỆN TẠI là bullet
    const isCurrentBullet = /^[-•\d+.]/m.test(current);
    // Không gộp nếu đoạn sau là bullet
    const isNextBullet = next && (/^[-•\d+.]/m.test(next));

    if (current.length < 100 && next && !isCurrentBullet && !isNextBullet) {
      merged.push(current + ' ' + next);
      i++;
    } else {
      merged.push(current);
    }
  }

  return merged.filter(Boolean);
};
// =================================================================

const mediaRegex = /(https?:\/\/[^\s]+?\.(?:jpg|jpeg|png|mp4|gif))/gi;

/**
 * Tách chuỗi phản hồi thành các phần text và media.
 * @param {string} text - Chuỗi phản hồi thô từ bot.
 * @returns {Array<{type: 'text' | 'image' | 'video', content: string}>}
 */
const processBotResponse = (text) => {
  if (!text) return [];
  text = text.trim();

  const parts = [];
  let lastIndex = 0;
  let match;

  // Lặp qua tất cả các URL media tìm thấy
  while ((match = mediaRegex.exec(text)) !== null) {
    // 1. Lấy phần text đứng TRƯỚC URL media
    const precedingText = text.substring(lastIndex, match.index).trim();
    if (precedingText) {
      // Dùng hàm split cũ để chia nhỏ text
      parts.push(...splitChunkSmartly(precedingText, MAX_CHAR_PER_CHUNK).map(chunk => ({
        type: 'text',
        content: chunk
      })));
    }

    // 2. Thêm URL media vào
    const url = match[0];
    const extension = url.split('.').pop().toLowerCase();
    
    if (extension === 'mp4') {
      parts.push({ type: 'video', content: url });
    } else {
      // Mặc định là 'image' cho jpg, jpeg, png, gif
      parts.push({ type: 'image', content: url });
    }

    lastIndex = match.index + match[0].length;
  }

  // 3. Lấy phần text còn lại (sau URL media cuối cùng)
  const remainingText = text.substring(lastIndex).trim();
  if (remainingText) {
    parts.push(...splitChunkSmartly(remainingText, MAX_CHAR_PER_CHUNK).map(chunk => ({
      type: 'text',
      content: chunk
    })));
  }

  return parts;
};

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
    dispatch({ type: 'SET_TYPING_TEXT', payload: { agentId, text: TYPING_INDICATOR } });
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
      const finalMessageParts = processBotResponse(replyString);
      
      // =================================================================
      // 7. NÂNG CẤP V10: Vòng lặp gửi tin nhắn với DELAY ĐỘNG
      // =================================================================
      for (const [index, part] of finalMessageParts.entries()) {
        dispatch({ type: 'SET_TYPING_TEXT', payload: { agentId, text: TYPING_INDICATOR } });
        
        // B. TÍNH TOÁN VÀ CHỜ (Delay động)
        // Tính thời gian "gõ" dựa trên độ dài chunk
        const chunkLength = part.type === 'text' ? part.content.length : 100;
        const typingTime = (chunkLength/ CHARS_PER_SECOND) * 1000;
        
        // Đảm bảo thời gian chờ nằm trong khoảng MIN và MAX
        const dynamicDelay = Math.max(MIN_TYPING_DELAY, Math.min(typingTime, MAX_TYPING_DELAY));
        
        await delay(dynamicDelay); 
        
        // C. TẮT typing
        dispatch({ type: 'SET_TYPING_TEXT', payload: { agentId, text: null } });

        // D. GỬI tin nhắn thật
        const botMessage = {
          id: Date.now() + index,
          text: part.content, // Đây là nội dung text hoặc URL
          type: part.type,    // Đây là 'text', 'image', hoặc 'video'
          sender: 'bot',
        };
        dispatch({ type: 'ADD_MESSAGE', payload: { agentId, message: botMessage } });

        // E. Chờ 0.5s trước khi lặp lại (cho tự nhiên)
        if (index < finalMessageParts.length - 1) {
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