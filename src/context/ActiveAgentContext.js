import React, { createContext, useState, useContext } from 'react';

const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  // activeView sẽ có dạng 'agent-view', ví dụ: 'ecommerce-bot-intro'
  const [activeView, setActiveView] = useState('home-main'); // View mặc định

  const value = { activeView, setActiveView };

  return (
    <ViewContext.Provider value={value}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  return useContext(ViewContext);
};