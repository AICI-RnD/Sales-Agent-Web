import axios from 'axios';

const agentApiConfig = {
  'ecommerce-bot': { baseURL: process.env.REACT_APP_API_ECOMMERCE_BOT_URL },
  'spa-bot': { baseURL: process.env.REACT_APP_API_SPA_BOT_URL },
  'education-bot': { baseURL: process.env.REACT_APP_API_EDUCATION_BOT_URL },
  'default': { baseURL: process.env.REACT_APP_API_DEFAULT_URL },
};

export const getBotResponse = async (agentId, chatId, userInput) => {
  const config = agentApiConfig[agentId] || agentApiConfig['default'];

  if (!config) {
    console.error(`No API configuration found for agentId: ${agentId}`);
    return "Lỗi cấu hình: Không tìm thấy API cho agent này.";
  }

  try {
    const apiClient = axios.create({
      baseURL: config.baseURL,
      headers: { 
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...config.headers 
      },
      timeout: 40000,
    });

    const payload = {
      chat_id: chatId,         // Trường server yêu cầu
      user_input: userInput,   // Trường server yêu cầu
    }

    const response = await apiClient.post('/chat/invoke', payload);
    console.log(`API Response for agent ${agentId}:`, response.data);
    const data = response.data;

    // 1. Nếu data là string VÀ giống hệt input -> Đây là node --end--
    if (typeof data === 'string' && data === userInput) {
      // Trả về một tín hiệu đặc biệt để ChatContext biết và im lặng
      return '__SILENT_END__';
    }

    // 2. Nếu data là object (như cũ)
    if (typeof data === 'object' && data !== null) {
      if (data.output && typeof data.output === 'string') {
        return data.output;
      }
      if (data.response && typeof data.response === 'string') {
        return data.response;
      }
      return JSON.stringify(data, null, 2); 
    }

    // 3. Nếu data là string (nhưng không phải là "nhái lại")
    if (typeof data === 'string') {
      return data;
    }
    
    return String(data);
    // =================================================================

  } catch (error) {
    // ... (phần catch lỗi giữ nguyên như V4) ...
    console.error(`API Error for agent ${agentId} at ${config.baseURL}/chat/invoke:`, error);
    if (error.response) {
      console.error('Server Response Data:', error.response.data);
      const formattedError = JSON.stringify(error.response.data, null, 2);
      return `Lỗi chi tiết từ server (422):\n${formattedError}`;
    }
    if (error.code === 'ECONNABORTED') {
      return "Xin lỗi, máy chủ phản hồi quá lâu. Vui lòng thử lại.";
    }
    return "Rất tiếc, đã có sự cố kết nối tới trợ lý. Vui lòng thử lại sau.";
  }
};