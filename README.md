# Dự án Interface Agents (Giao diện Tương tác Agents)

Đây là dự án Frontend được xây dựng bằng React, đóng vai trò là giao diện người dùng cho một hệ thống chatbot đa agent. Giao diện cho phép người dùng tương tác với nhiều "agents" chuyên biệt (như E-commerce, Spa, Education) trong một ứng dụng duy nhất, với một cửa sổ chat theo ngữ cảnh.

## Tính năng chính

* **Giao diện Đa Agent:** Người dùng có thể chuyển đổi giữa các agent khác nhau thông qua thanh điều hướng (Sidebar).
* **Nội dung Động:** Khu vực nội dung chính (`MainContent`) tự động cập nhật để hiển thị các thành phần (components) dành riêng cho agent đang được chọn.
* **Chatbot theo Ngữ cảnh:** Một cửa sổ chatbot duy nhất (`ChatWindow`) duy trì trạng thái hội thoại riêng biệt cho từng agent. Khi bạn chuyển agent, cửa sổ chat sẽ tự động tải lịch sử trò chuyện của agent đó.
* **Quản lý Trạng thái Tập trung:** Sử dụng React Context API (`ActiveAgentContext`, `ChatContext`) để quản lý trạng thái global.
* **Tích hợp Backend:** Giao tiếp với API backend (qua `apiService.js`) để gửi tin nhắn của người dùng, nhận phản hồi từ AI và quản lý các phiên (session) chat.

## Kiến trúc & Luồng dữ liệu (State Flow)

Dự án sử dụng hai Context chính để quản lý trạng thái:

1.  **`ViewProvider` (`ActiveAgentContext.js`)**:
    * Quản lý một state duy nhất: `activeView` (ví dụ: `home`, `ecommerce-bot`, `spa-bot-products`).
    * `Sidebar.js` chịu trách nhiệm gọi hàm `setActiveView` để thay đổi trạng thái này khi người dùng điều hướng.

2.  **`ChatProvider` (`ChatContext.js`)**:
    * Quản lý một state phức tạp: `conversations`. Đây là một object lưu trữ lịch sử tin nhắn, `chat_id`, và trạng thái `isTyping` cho *từng* agent.
    * Cung cấp các hàm: `sendMessage` (gửi tin nhắn đến backend và cập nhật state) và `resetSession` (xóa lịch sử chat cho một agent).

**Luồng hoạt động khi người dùng tương tác:**

1.  Người dùng click vào một mục trên **`Sidebar`** (ví dụ: "E-commerce").
2.  `Sidebar` gọi `setActiveView('ecommerce-bot')` từ `ViewProvider`.
3.  **`MainContent`**:
    * Lắng nghe thay đổi của `activeView`.
    * Render component tương ứng (ví dụ: `<EcommerceBotSection />`) dựa trên `activeView`.
4.  **`ChatWindow`**:
    * Cũng lắng nghe thay đổi của `activeView` để xác định `agentId` (ví dụ: `ecommerce-bot`).
    * Sử dụng `agentId` này để lấy đúng cuộc hội thoại từ `ChatContext` (ví dụ: `conversations['ecommerce-bot']`).
    * Hiển thị lịch sử tin nhắn của agent đó.
5.  Khi người dùng gửi tin nhắn:
    * `ChatWindow` gọi `sendMessage(agentId, chat_id, userMessage)` từ `ChatContext`.
    * `ChatContext` cập nhật state (thêm tin nhắn người dùng), gọi `apiService` để gửi tin nhắn đến backend, nhận phản hồi của bot, và cập nhật state một lần nữa với tin nhắn của bot.

## Cài đặt và Chạy dự án

1.  **Clone repository:**
    ```bash
    git clone [URL_CUA_BAN]
    cd [TEN_THU_MUC_DU_AN]
    ```

2.  **Cài đặt dependencies:**
    ```bash
    npm install
    ```

3.  **Chạy dự án (Development):**
    ```bash
    npm start
    ```
    Mở [http://localhost:3000](http://localhost:3000) để xem trong trình duyệt.

4.  **Lưu ý:** Dự án này yêu cầu một máy chủ backend đang chạy để API (trong `apiService.js`) có thể hoạt động. Hãy đảm bảo bạn đã cấu hình đúng URL của API và backend đang hoạt động.

## Các scripts có sẵn

* `npm start`: Chạy ứng dụng ở chế độ development.
* `npm test`: Chạy trình test.
* `npm run build`: Build ứng dụng cho production ra thư mục `build/`.
* `npm run eject`: Eject khỏi Create React App (chỉ thực hiện khi bạn biết rõ mình đang làm gì).

## Các thư viện chính

* `react`
* `react-router-dom`
* `react-icons`
* `uuid`