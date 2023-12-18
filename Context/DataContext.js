import { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <DataContext.Provider value={{ searchKeyword, setSearchKeyword }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
