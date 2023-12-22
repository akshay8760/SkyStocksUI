import { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [logOut, setLogOut] = useState(false);

  return (
    <DataContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
        userDetails,
        setUserDetails,
        logOut,
        setLogOut,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
