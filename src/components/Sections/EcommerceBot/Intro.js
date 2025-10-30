import React from 'react';
import styles from './EcommerceBotSection.module.css';
import sectionStyles from '../Sections.module.css';

const Intro = () => {
  return (
    <div className={`${styles.homeContainer} ${sectionStyles.section}`}>
              <div className={styles.heroSection}>
                <h1 className={sectionStyles.title}>Trải nghiệm thử Sale & Customer Service Assistant Agent lĩnh vực E-commerce</h1>
                <p className={sectionStyles.paragraph}>
                  Digital Sale Assistant - một trợ lý AI thông minh được thiết kế như một giải pháp bán lẻ online toàn diện. Với khả năng giao tiếp tự nhiên, Sale Assistant hỗ trợ khách hàng xuyên suốt hành trình mua sắm, từ tìm kiếm, tư vấn sản phẩm – hỗ trợ lên đơn hàng nhanh chóng  – hỗ trợ xử lý đơn hàng sau khi mua sắm.
                </p>
                <h2 className={sectionStyles.subtitle}>✨ Agent này có thể làm gì?</h2>
                <p className={sectionStyles.paragraph}>
                  🛍️ Tư vấn & gợi ý sản phẩm theo nhu cầu thực tế của bạn.
                  <br/>
                  ⚡ Nhận diện ý định mua hàng, chủ động hỗ trợ chốt đơn nhanh chóng.
                  <br/>
                  👤 Hỗ trợ cập nhật thông tin khách hàng nhanh chóng, tiện lợi.
                  <br/>
                  📝 Chỉnh sửa đơn hàng theo yêu cầu ngay trong cuộc trò chuyện.
                  <br/>
                  ❓ Giải đáp tức thì mọi thắc mắc về sản phẩm, giá cả, chính sách.
                </p>
                <h2 className={sectionStyles.subtitle}>📌 Gợi ý cách dùng thử</h2>
                <p className={sectionStyles.paragraph}>
                  👉 Hỏi tư vấn sản phẩm cụ thể có trong bảng “Sản phẩm”.
                  <br/>
                  Nêu vấn đề/nhu cầu của bạn (liên quan đến sản phẩm shop) → Agent sẽ tự đề xuất sản phẩm phù hợp.
                  <br/>
                  Thử đặt hàng → Đơn hàng thành công sẽ hiển thị trong tab “Đơn hàng”.
                  <br/>
                  Thử thay đổi thông tin đơn hàng → để trải nghiệm sự tiện lợi & tốc độ xử lý của Agent.
                  <br/>
                  Bạn thắc mắc cách sử dụng, cách lắp đặt, những khó khăn khi sử dụng sản phẩm → hãy nhờ sự hỗ trợ của Agent.
                </p>
                <h2 className={sectionStyles.subtitle}>🎯 Lợi ích sản phẩm</h2>
                <p className={sectionStyles.paragraph}>
                  🚀 Tăng tỷ lệ chốt đơn: Agent nhận diện ý định mua hàng và chủ động gợi mở giải pháp → giúp khách hàng quyết định nhanh hơn.
                  <br/>
                  ⏱️ Tiết kiệm thời gian & chi phí nhân sự: Hệ thống tự động xử lý từ tư vấn, đặt hàng đến chỉnh sửa đơn, giảm tải cho đội ngũ sale & CSKH.
                  <br/>
                  🤝 Cá nhân hóa trải nghiệm khách hàng: Gợi ý sản phẩm phù hợp từng nhu cầu, tạo sự hài lòng và tăng khả năng quay lại mua hàng.
                  <br/>
                  🔄 Xử lý linh hoạt, 24/7: Tư vấn – hỗ trợ đơn hàng bất kỳ lúc nào, ngay cả ngoài giờ làm việc
                  <br/>
                  📈 Gia tăng doanh thu & lòng trung thành: Khách hàng được phục vụ nhanh chóng, chính xác → tin tưởng thương hiệu và sẵn sàng mua nhiều hơn.
                </p>
              </div>
            </div>
  );
};

export default Intro;