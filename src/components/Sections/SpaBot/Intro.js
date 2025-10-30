import React from 'react';
import styles from './SpaBotSection.module.css';
import sectionStyles from '../Sections.module.css';

const IntroSpa = () => {
  return (
    <div className={`${styles.homeContainer} ${sectionStyles.section}`}>
                  <div className={styles.heroSection}>
                    <h1 className={sectionStyles.title}>Trải Nghiệm Thông Minh – CS Assistant cho Dịch Vụ SPA</h1>
                    <p className={sectionStyles.paragraph}>
                      🌸 Spa Assistant – Trợ lý AI thông minh dành cho ngành Spa & Beauty. Với khả năng giao tiếp tự nhiên, Spa Assistant đồng hành cùng khách hàng trong suốt hành trình làm đẹp: từ tư vấn dịch vụ, gợi ý liệu trình – hỗ trợ đặt lịch nhanh chóng – đến chăm sóc và theo dõi sau khi trải nghiệm.
                    </p>
                    <h2 className={sectionStyles.subtitle}>🌺 Agent này có thể làm gì?</h2>
                    <p className={sectionStyles.paragraph}>
                      💆 Tư vấn dịch vụ & liệu trình làm đẹp phù hợp với nhu cầu và tình trạng của khách hàng.
                      <br/>
                      📅 Hỗ trợ đặt lịch hẹn nhanh chóng, theo khung giờ khách mong muốn.
                      <br/>
                      🔄 Thay đổi, cập nhật lịch hẹn dễ dàng chỉ trong vài thao tác trò chuyện.
                      <br/>
                      ❓ Giải đáp thắc mắc về dịch vụ, chi phí, ưu đãi và quy trình spa..
                      <br/>
                      💖 Đề xuất sản phẩm chăm sóc cá nhân phù hợp để duy trì hiệu quả sau liệu trình.
                    </p>
                    <h2 className={sectionStyles.subtitle}>🌿 Gợi ý cách dùng thử</h2>
                    <p className={sectionStyles.paragraph}>
                      👉 Hỏi tư vấn về một dịch vụ cụ thể trong bảng “Dịch vụ”.
                      <br/>
                      Chia sẻ nhu cầu/ vấn đề làm đẹp của bạn → Agent sẽ gợi ý dịch vụ phù hợp.
                      <br/>
                      Thử đặt lịch hẹn → Lịch thành công sẽ hiển thị trong tab “Lịch Hẹn”.
                      <br/>
                      Thử thay đổi thời gian đặt lịch → để cảm nhận sự tiện lợi trong thao tác.
                      <br/>
                      Đặt câu hỏi về quy trình, ưu đãi hoặc chăm sóc sau liệu trình để trải nghiệm khả năng hỗ trợ toàn diện.
                    </p>
                    <h2 className={sectionStyles.subtitle}>🎯 Lợi ích sản phẩm</h2>
                    <p className={sectionStyles.paragraph}>
                      ✨ Nâng cao trải nghiệm khách hàng: Mỗi khách hàng được tư vấn cá nhân hóa, chuyên nghiệp như đang nói chuyện với chuyên viên spa thực thụ.
                      <br/>
                      ⏱️ Tiết kiệm thời gian & nhân lực: Hệ thống tự động xử lý đặt lịch, đổi lịch, tư vấn → giảm tải áp lực cho nhân viên lễ tân và CSKH.
                      <br/>
                      💆 Tăng tỷ lệ khách hàng quay lại: Khách được nhắc lịch, chăm sóc sau dịch vụ, tạo cảm giác được quan tâm.
                      <br/>
                      🔄 Hỗ trợ 24/7: Tư vấn và đặt lịch ngay cả ngoài giờ làm việc.
                      <br/>
                      📈 Gia tăng doanh thu & lòng trung thành: Khách hàng hài lòng → gắn bó lâu dài với thương hiệu.
                    </p>
                  </div>
                </div>
  );
};

export default IntroSpa;