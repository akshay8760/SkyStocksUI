import { createContext, useEffect, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [logOut, setLogOut] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("All");
  const [refreshList, setRefreshList] = useState(false);

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
        refreshList,
        setRefreshList,
        logIn,
        setLogIn,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
