import { v4 as uuidv4 } from 'uuid';

export const initialChatState  = {
  'ecommerce-bot': {
    chat_id: uuidv4(),
    messages: [{ id: 1, text: 'Xin chào anh/chị, em là Assistant Agent. Anh/Chị có nhu cầu tư vấn sản phẩm nào tại cửa hàng không ạ?😍😍 ', sender: 'bot' }],
    isTyping: false
  },
  'spa-bot': {
    chat_id: uuidv4(),
    messages: [{ id: 1, text: 'Chào mừng đến với AnVie Spa. Bạn muốn đặt lịch hay xem dịch vụ vậy ạ?😎', sender: 'bot' }],
    isTyping: false
  },
  'education-bot': {
    chat_id: uuidv4(),
    messages: [{ id: 1, text: 'Chào anh/chị đến với Trung tâm đào tạo AICI . Anh/Chị cần tư vấn khóa học nào ạ?🤩', sender: 'bot' }],
    isTyping: false
  },
  'default': {
    chat_id: uuidv4(),
    messages: [{id: 1, text: 'Xin chào! Tôi là trợ lý ảo chung. Tôi có thể giúp gì cho bạn?', sender: 'bot'}],
    isTyping: false
  }
};

export const initialState = JSON.parse(JSON.stringify(initialChatState));

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const { agentId, message } = action.payload;
      if (!agentId || !state[agentId]) return state;

      const newState = { ...state };
      newState[agentId] = {
        ...newState[agentId],
        messages: [...newState[agentId].messages, message],
      };
      return newState;
    }
    case 'SET_TYPING': {
      const { agentId, isTyping } = action.payload;
      if (!agentId || !state[agentId]) return state;

      const newState = { ...state };
      newState[agentId] = {
        ...newState[agentId],
        isTyping: isTyping,
      };
      return newState;
    }
    case 'RESET_SESSION': {
      const { agentId } = action.payload;
      if (!agentId || !state[agentId]) return state;

      const newState = { ...state };
      // Reset cuộc trò chuyện của agent về trạng thái ban đầu và tạo chat_id mới
      newState[agentId] = {
        ...initialChatState[agentId],
        chat_id: uuidv4(), 
      };
      return newState;
    }
    

    default:
      return state;
  }
  
};

export default chatReducer;