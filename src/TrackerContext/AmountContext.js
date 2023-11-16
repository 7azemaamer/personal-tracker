import React, { createContext, useContext, useState } from 'react';

export const AmountContext = createContext();

const AmountContextProvider = ({ children }) => {
    const [storedData, setStoredData] = useState(JSON.parse(localStorage.getItem('allRecords')));

  return (
    <AmountContext.Provider value={{ storedData, setStoredData}}>
      {children}
    </AmountContext.Provider>
  );
};
export default AmountContextProvider;