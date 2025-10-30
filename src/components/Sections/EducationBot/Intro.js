import React from 'react';
import styles from './EducationBotSection.module.css';
import sectionStyles from '../Sections.module.css';

const IntroEdu = () => {
  return (
    <div className={`${styles.homeContainer} ${sectionStyles.section}`}>
                  <div className={styles.heroSection}>
                    <h1 className={sectionStyles.title}>Trải Nghiệm Thông Minh – CS Assistant cho Trung Tâm Đào Tạo</h1>
                    <p className={sectionStyles.paragraph}>
                     🎓 Education Assistant – Trợ lý AI thông minh dành cho các trung tâm đào tạo và tổ chức giáo dục. Với khả năng giao tiếp tự nhiên, Agent này hỗ trợ học viên xuyên suốt hành trình học tập: từ tư vấn khóa học, hướng dẫn đăng ký – hỗ trợ thay đổi thông tin – đến giải đáp mọi thắc mắc liên quan đến chương trình học.
                    </p>
                    <h2 className={sectionStyles.subtitle}>📘 Agent này có thể làm gì?</h2>
                    <p className={sectionStyles.paragraph}>
                      📚 Tư vấn & gợi ý khóa học phù hợp với nhu cầu, mục tiêu và trình độ của học viên.
                      <br/>
                      📝 Hỗ trợ đăng ký khóa học nhanh chóng, xử lý trực tiếp trong cuộc trò chuyện.
                      <br/>
                      👤 Cập nhật thông tin học viên (thông tin cá nhân, lớp học, thời gian học).
                      <br/>
                      🔄 Thay đổi hoặc điều chỉnh lịch học theo nhu cầu học viên.
                      <br/>
                      ❓ Giải đáp thắc mắc tức thì về nội dung khóa học, học phí, ưu đãi, lịch khai giảng.
                    </p>
                    <h2 className={sectionStyles.subtitle}>🎯 Gợi ý cách dùng thử</h2>
                    <p className={sectionStyles.paragraph}>
                      👉 Hỏi tư vấn về một khóa học cụ thể trong bảng “Khóa học”.
                      <br/>
                      Nêu nhu cầu học tập hoặc mục tiêu của bạn → Agent sẽ gợi ý khóa học phù hợp.
                      <br/>
                      Thử đăng ký khóa học → Thông tin khóa học sẽ hiển thị trong tab “Phiếu đăng ký”.
                      <br/>
                      Thử thay đổi thông tin cá nhân hoặc lịch học để trải nghiệm sự tiện lợi.
                      <br/>
                      Đặt câu hỏi về học phí, thời gian học, ưu đãi → Agent sẽ phản hồi ngay.
                    </p>
                    <h2 className={sectionStyles.subtitle}>🌟 Lợi ích sản phẩm</h2>
                    <p className={sectionStyles.paragraph}>
                      🚀 Thu hút & giữ chân học viên: Tư vấn cá nhân hóa, gợi ý chương trình học phù hợp từng mục tiêu.
                      <br/>
                      ⏱️ Tiết kiệm thời gian cho nhân viên tư vấn: Hệ thống tự động xử lý đăng ký, đổi lịch, cập nhật thông tin học viên
                      <br/>
                      🤝 Tăng trải nghiệm học viên: Giúp học viên dễ dàng tiếp cận thông tin, cảm thấy được quan tâm.
                      <br/>
                      🔄 Hoạt động 24/7: Học viên có thể hỏi – đăng ký – đổi lịch bất kỳ lúc nào.
                      <br/>
                      📈 Gia tăng doanh thu & uy tín: Chăm sóc tốt hơn → học viên hài lòng, dễ dàng giới thiệu thêm bạn bè/người thân.
                    </p>
                  </div>
                </div>
  );
};

export default IntroEdu;