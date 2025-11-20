// src/components/Sections/OrderStatusTracker.js
import React, { useState, useEffect } from 'react';
import styles from './OrderStatusTracker.module.css';
import { FaClipboardList, FaMoneyBillWave, FaCheckCircle, FaBoxOpen } from 'react-icons/fa';

// Định nghĩa các bước trong cây trạng thái
const steps = [
    { name: "Hệ thống vừa ghi nhận đơn", icon: <FaClipboardList /> },
    { name: "Đã thanh toán", icon: <FaMoneyBillWave /> },
    { name: "Xác nhận tạo đơn thành công", icon: <FaCheckCircle /> },
    { name: "Ready to Ship / Chờ giao", icon: <FaBoxOpen /> }
];

const STEP_DURATION = 5000; // 5 giây

const OrderStatusTracker = ({ order, onAnimationComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const orderId = order?.order_id || order?.ID;

    useEffect(() => {
        setCurrentStep(0);
        if (order) {
            const timer = setInterval(() => {
                setCurrentStep(prevStep => {
                    if (prevStep < steps.length - 1) {
                        return prevStep + 1;
                    } else {
                        clearInterval(timer);
                        if (onAnimationComplete) {
                            setTimeout(onAnimationComplete, 4000);
                        }
                        return prevStep;
                    }
                });
            }, STEP_DURATION);
            return () => clearInterval(timer);
        }
    }, [orderId, onAnimationComplete]);

    if (!order) return null;

    return (
        <div className={styles.trackerWrapper}>
            <h4>Trạng thái xử lý đơn</h4>
            <div className={styles.stepContainer}>
                {steps.map((step, index) => (
                    <div key={index} className={styles.stepItem}>
                        {/* === NODE TRÒN === */}
                        <div 
                            className={`
                                ${styles.stepNode} 
                                ${index === currentStep ? styles.active : ''}
                                ${index < currentStep ? styles.completed : ''}
                            `}
                        >
                            {index < currentStep ? <FaCheckCircle /> : step.icon}
                        </div>

                        {/* === TÊN BƯỚC === */}
                        <p className={styles.stepName}>{step.name}</p>

                        {/* === THANH NỐI (Đã chuyển vào bên trong stepItem) === */}
                        {/* Chỉ hiện thanh nối nếu không phải là bước cuối cùng */}
                        {index < steps.length - 1 && (
                            <div className={`
                                ${styles.stepConnector}
                                ${index < currentStep ? styles.completed : ''}
                            `}></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderStatusTracker;