import React from "react";
import styles from "./Contact.module.css";
import { FaEnvelope, FaUser, FaPaperPlane, FaPhone, FaLinkedin } from "react-icons/fa";
import { AiFillYoutube, AiOutlineGlobal } from "react-icons/ai";

const Contact = () => {
  return (
    <section id="contact" className={styles.contactSection}>
      {/* === Title Section === */}
      <div className={styles.innerWrapper}>
    {/* === Title Section === */}
    <div className={styles.titleWrapper}>
      <h1 className={styles.title}>Kết Nối Với Chúng Tôi</h1>
      <p className={styles.subtitle}>
        AICI luôn sẵn sàng lắng nghe. Dù bạn có câu hỏi, ý tưởng, hay muốn hợp tác, đừng ngần ngại liên hệ!
      </p>
    </div>

      {/* === Main Content === */}
      <div className={styles.container}>
        {/* Left: Contact Form */}
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Liên hệ với chúng tôi</h2>
          <form
            className={styles.contactForm}
            onSubmit={(e) => {
              e.preventDefault();
              e.target.reset();
            }}
          >
            <div className={styles.inputGroup}>
              <FaUser className={styles.inputIcon} />
              <input type="text" placeholder="Họ và tên" required />
            </div>

            <div className={styles.inputGroup}>
              <FaEnvelope className={styles.inputIcon} />
              <input type="email" placeholder="Email" required />
            </div>

            <div className={styles.inputGroup}>
              <FaPhone className={styles.inputIcon} />
              <input type="text" placeholder="Số điện thoại (nếu có)" />
            </div>

            <div className={styles.inputGroup}>
              <FaPaperPlane className={styles.inputIconTop} />
              <textarea placeholder="Nội dung tin nhắn..." rows="5" required />
            </div>

            <button type="submit" className={styles.submitButton}>
              Gửi tin nhắn
            </button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className={styles.infoContainer}>
          <div className={styles.infoCard}>
            <FaEnvelope className={styles.infoIcon} />
            <h3>Email</h3>
            <a href="info@aiciglobal.com" className={styles.cardLink}>info@aiciglobal.com</a>
          </div>

          <div className={styles.infoCard}>
            <AiFillYoutube className={styles.infoIcon} />
            <h3>YouTube</h3>
            <a href="https://www.youtube.com/@AICIGlobalcom" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>AICI Global</a>
          </div>

          <div className={styles.infoCard}>
            <FaLinkedin className={styles.infoIcon} />
            <h3>LinkedIn</h3>
            <a href="https://www.linkedin.com/company/aici-global/" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>AICI Global</a>
          </div>

          <div className={styles.infoCard}>
            <AiOutlineGlobal className={styles.infoIcon} />
            <h3>Website</h3>
            <a href="https://www.aiciglobal.com/" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>AICI Global</a>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Contact;
