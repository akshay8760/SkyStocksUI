import { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [logOut, setLogOut] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("All");
  const [refreshList, setRefreshList] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <DataContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
        logOut,
        setLogOut,
        showCalendar,
        setShowCalendar,
        selectedDate,
        setSelectedDate,
        refreshList,
        setRefreshList,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
