import React from 'react';
import styles from './MainContent.module.css';
import { useView } from '../../context/ActiveAgentContext';

// Home Section Components
import HomeMain from '../Sections/Home/HomeMain';
import HomeProducts from '../Sections/Home/Products';
import HomeAbout from '../Sections/Home/AboutUs';
import HomeContact from '../Sections/Home/Contact';
// Ecommerce Bot Section Components
import Intro from '../Sections/EcommerceBot/Intro';

import Products from '../Sections/EcommerceBot/Products';
// Spa Bot Section Components
import IntroSpa from '../Sections/SpaBot/Intro';
import ProductsSpa from '../Sections/SpaBot/Products';

// Education Bot Section Components
import IntroEdu from '../Sections/EducationBot/Intro';
import ProductsEdu from '../Sections/EducationBot/Products';

import OrdersDisplay from '../Sections/OrdersDisplay';
// Một mapping đơn giản từ 'view' sang component cho các trang Agent
const viewMap = {
    'ecommerce-bot-intro': <Intro />,
    'ecommerce-bot-products': <Products />,
    'ecommerce-bot-orders': <OrdersDisplay agentId="ecommerce-bot" />,
    'education-bot-main': <IntroEdu />,
    'education-bot-courses': <ProductsEdu />,
    'education-bot-instructors': <OrdersDisplay agentId="education-bot" />,
    'spa-bot-intro': <IntroSpa />,
    'spa-bot-services': <ProductsSpa />,
    'spa-bot-appointments': <OrdersDisplay agentId="spa-bot" />,
};

const MainContent = () => {
  const { activeView } = useView();

  // Nếu là trang Home, render tất cả các mục của Home
  if (activeView.startsWith('home')) {
    return (
      <main className={styles.mainContent}>
        <HomeMain />
        <HomeAbout />
        <HomeProducts />
        <HomeContact />
      </main>
    );
  }

  // Render component tương ứng cho các Agent
  const CurrentView = viewMap[activeView] || <div>Trang không tồn tại</div>;

  return (
    <main className={`${styles.mainContent} ${styles.agentPage}`}>
      {CurrentView}
    </main>
  );
};

export default MainContent;