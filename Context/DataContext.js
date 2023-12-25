import { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [logOut, setLogOut] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("All");

  return (
    <DataContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
        userDetails,
        setUserDetails,
        logOut,
        setLogOut,
        showCalendar,
        setShowCalendar,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
