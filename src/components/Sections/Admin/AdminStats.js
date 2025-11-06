// src/components/Sections/Admin/AdminStats.js
import React, { useState, useEffect, useMemo } from 'react';
import authService from '../../../services/authService'; // Dịch vụ Axios đã có
import styles from './AdminStats.module.css'; // Sẽ tạo ở bước 2
import sectionStyles from '../Sections.module.css'; // Dùng chung style title
import { FaUsers, FaSignInAlt, FaClock } from 'react-icons/fa';

// Hàm helper để format ngày
const formatDateTime = (isoString) => {
  if (!isoString) return 'Chưa đăng nhập';
  try {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(isoString));
  } catch (e) {
    return 'Ngày không hợp lệ';
  }
};

const AdminStats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch dữ liệu khi component được tải
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await authService.get('/admin/stats');
        setStats(response.data);
        setError(null);
      } catch (err) {
        console.error('Lỗi khi tải thống kê:', err);
        setError('Không thể tải dữ liệu. Bạn có quyền Admin không?');
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  // 2. Tính toán các thẻ tóm tắt
  const summary = useMemo(() => {
    const totalLogins = stats.reduce((sum, user) => sum + user.login_count, 0);
    const totalApiHits = stats.reduce((sum, user) => sum + user.api_hits, 0);
    
    const latestUser = stats.reduce((latest, user) => {
      if (!user.last_login) return latest;
      if (!latest.last_login || new Date(user.last_login) > new Date(latest.last_login)) {
        return user;
      }
      return latest;
    }, { last_login: null, name: 'N/A' });

    return {
      totalUsers: stats.length,
      totalLogins,
      totalApiHits,
      latestUser: latestUser.name,
      latestLoginTime: formatDateTime(latestUser.last_login),
    };
  }, [stats]);

  if (loading) {
    return <div className={styles.wrapper}><h2>Đang tải thống kê...</h2></div>;
  }

  if (error) {
    return <div className={`${styles.wrapper} ${styles.error}`}>{error}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={sectionStyles.title}>Thống kê Sử dụng Hệ thống</h1>

      {/* 3. Phần Thẻ Tóm tắt */}
      <div className={styles.statCards}>
        <div className={styles.card}>
          <FaUsers className={styles.icon} />
          <div className={styles.cardInfo}>
            <span className={styles.value}>{summary.totalUsers}</span>
            <span className={styles.label}>Tổng số User</span>
          </div>
        </div>
        <div className={styles.card}>
          <FaSignInAlt className={styles.icon} />
          <div className={styles.cardInfo}>
            <span className={styles.value}>{summary.totalLogins}</span>
            <span className={styles.label}>Tổng lượt Đăng nhập</span>
          </div>
        </div>
        {/* <div className={styles.card}>
          <FaMousePointer className={styles.icon} />
          <div className={styles.cardInfo}>
            <span className={styles.value}>{summary.totalApiHits}</span>
            <span className={styles.label}>Tổng lượt Dùng API</span>
          </div>
        </div> */}
        <div className={styles.card}>
          <FaClock className={styles.icon} />
          <div className={styles.cardInfo}>
            <span className={styles.value}>{summary.latestUser}</span>
            <span className={styles.label}>Hoạt động gần nhất ({summary.latestLoginTime})</span>
          </div>
        </div>
      </div>

      {/* 4. Bảng Chi tiết */}
      <h2 className={sectionStyles.word}>Chi tiết từng User</h2>
      <div className={styles.tableContainer}>
        <table className={styles.statsTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tài khoản (Username)</th>
              <th>Tên</th>
              <th>Lượt Đăng nhập</th>
              {/* <th>Lượt Dùng API</th> */}
              <th>Đăng nhập Lần cuối</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.login_count}</td>
                {/* <td>{user.api_hits}</td> */}
                <td>{formatDateTime(user.last_login)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStats;