// src/components/Sections/OrdersDisplay.js
import React, { useState, useEffect, useCallback } from 'react';
import { FaSync, FaStar, FaChevronDown  } from 'react-icons/fa';
import axios from 'axios';
import Papa from 'papaparse';
import styles from './OrdersDisplay.module.css';
import sectionStyles from './Sections.module.css';

import EcommerceOrderDetails from './OrderDetails/EcommerceOrderDetails';
import SpaOrderDetails from './OrderDetails/SpaOrderDetails';
import EducationOrderDetails from './OrderDetails/EducationOrderDetails';

const sheetCsvUrls = {
  'ecommerce-bot': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTKa0C67Wk8-0kLdGLGdSuhoxZEpYNZ835I44_wP7VztU02FA7xzJquY549JK88u1LUXJV3sqDttnUT/pub?gid=349356717&single=true&output=csv',
  'spa-bot': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTKa0C67Wk8-0kLdGLGdSuhoxZEpYNZ835I44_wP7VztU02FA7xzJquY549JK88u1LUXJV3sqDttnUT/pub?gid=0&single=true&output=csv',
  'education-bot': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRCSaFJ2UjPE7dGQXPGVLIMUY9jMkHs6Nf4jLzp49h-91g7YuJnqWBeqZdUtDPDLIunSVbYyxYmMPJ9/pub?gid=2125603946&single=true&output=csv',
};

const sheetEmbedUrls = {
  'ecommerce-bot': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTKa0C67Wk8-0kLdGLGdSuhoxZEpYNZ835I44_wP7VztU02FA7xzJquY549JK88u1LUXJV3sqDttnUT/pubhtml?gid=349356717&single=true&widget=true&headers=false',
  'spa-bot': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTKa0C67Wk8-0kLdGLGdSuhoxZEpYNZ835I44_wP7VztU02FA7xzJquY549JK88u1LUXJV3sqDttnUT/pubhtml?gid=0&single=true&widget=true&headers=false',
  'education-bot': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRCSaFJ2UjPE7dGQXPGVLIMUY9jMkHs6Nf4jLzp49h-91g7YuJnqWBeqZdUtDPDLIunSVbYyxYmMPJ9/pubhtml?gid=2125603946&single=true&widget=true&headers=false',
};

const agentToComponentMap = {
    'ecommerce-bot': EcommerceOrderDetails,
    'spa-bot': SpaOrderDetails,
    'education-bot': EducationOrderDetails,
};

const POLLING_INTERVAL = 30000; // 30 giây

const groupOrderData = (data, agentId) => {
    if (!data || data.length === 0) return [];

    const groupedOrders = [];
    let currentOrder = null;

    // Xác định key ID cho từng agent
    const idKey = agentId === 'ecommerce-bot' ? 'order_id' : 'ID';

    data.forEach(row => {
        // Nếu dòng có ID, đây là một đơn hàng mới
        if (row[idKey]) {
            // Nếu đã có đơn hàng trước đó, đẩy nó vào danh sách
            if (currentOrder) {
                groupedOrders.push(currentOrder);
            }
            // Bắt đầu một đơn hàng mới
            currentOrder = {
                ...row,
                // Tạo một mảng để chứa các sản phẩm/dịch vụ
                products: [row] 
            };
        } else if (currentOrder) {
            // Nếu dòng không có ID, đây là sản phẩm/dịch vụ phụ của đơn hàng hiện tại
            currentOrder.products.push(row);
        }
    });

    // Đẩy đơn hàng cuối cùng vào danh sách
    if (currentOrder) {
        groupedOrders.push(currentOrder);
    }

    return groupedOrders;
};

const OrdersDisplay = ({ agentId }) => {
    const [groupedOrders, setGroupedOrders] = useState([]);
    const [error, setError] = useState(null);
    const [iframeKey, setIframeKey] = useState(Date.now());
    const [isCardExpanded, setIsCardExpanded] = useState(true);
    const fetchAndParseData = useCallback(async () => {
        const csvUrl = sheetCsvUrls[agentId];
        if (!csvUrl || csvUrl.startsWith('URL_CSV')) {
            setError('Chưa cấu hình Google Sheet CSV URL.');
            return;
        }

        try {
            const urlWithCacheBust = `${csvUrl}&cacheBust=${Date.now()}`;
            const response = await axios.get(urlWithCacheBust);
            
            Papa.parse(response.data, {
                header: true,
                skipEmptyLines: true,
                transformHeader: header => header.trim(),
                complete: (results) => {
                    const groupedData = groupOrderData(results.data, agentId);
                    setGroupedOrders(groupedData);
                    setError(null);
                },
                error: () => setError('Lỗi khi đọc dữ liệu CSV.')
            });
        } catch (err) {
            setError('Không thể tải dữ liệu từ Google Sheet.');
        }
    }, [agentId]);

    useEffect(() => {
        fetchAndParseData();
        const intervalId = setInterval(fetchAndParseData, POLLING_INTERVAL);
        return () => clearInterval(intervalId);
    }, [agentId, fetchAndParseData]);

    const handleRefresh = () => {
        setIframeKey(Date.now());
        fetchAndParseData();
    };

    const mostRecentOrder = groupedOrders.length > 0 ? groupedOrders[groupedOrders.length - 1] : null;
    const embedUrl = sheetEmbedUrls[agentId];
    const RecentOrderComponent = agentToComponentMap[agentId];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={sectionStyles.word}>Danh Sách Đơn Hàng</h2>
                <button onClick={handleRefresh} className={styles.refreshButton} title="Làm mới dữ liệu">
                    <FaSync /> Làm mới
                </button>
            </div>
            
            <p className={styles.refreshNote}>
                Dữ liệu có thể cập nhật sau vài phút. <br/>
                Nếu không thấy đơn mới, vui lòng nhấn "Làm mới".
            </p>
            
            {error && <p className={styles.errorText}>{error}</p>}
            
            {mostRecentOrder && RecentOrderComponent && (
                <div className={`${styles.recentOrderCard} ${!isCardExpanded ? styles.collapsed : ''}`}>
                    <div className={styles.recentOrderHeader}>
                        <div className={styles.headerLeft}>
                            <FaStar />
                            <h4>Đơn hàng mới nhất</h4>
                        </div>
                        <button 
                            className={styles.toggleButton} 
                            onClick={() => setIsCardExpanded(!isCardExpanded)}
                            title={isCardExpanded ? "Thu nhỏ" : "Phóng to"}
                        >
                            <FaChevronDown />
                        </button>
                    </div>
                    <RecentOrderComponent order={mostRecentOrder} />
                </div>
            )}

            <h4>Chi tiết đơn hàng 👇</h4>
            <div className={styles.iframeContainer}>
                {embedUrl && !embedUrl.startsWith('URL_NHUNG') ? (
                    <iframe
                        key={iframeKey}
                        src={`${embedUrl}&rm=minimal&cacheBust=${iframeKey}`}
                        title={`Đơn hàng cho ${agentId}`}
                        className={styles.iframe}
                    >
                        Đang tải...
                    </iframe>
                ) : <p>Chưa cấu hình link nhúng cho agent này.</p>}
            </div>
        </div>
    );
};

export default OrdersDisplay;