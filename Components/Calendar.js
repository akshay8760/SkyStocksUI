import DatePicker from "react-native-modern-datepicker";
import { useContext, useState } from "react";
import DataContext from "../Context/DataContext";

export default Calendar = () => {
  const { setShowCalendar, selectedDate, setSelectedDate } =
    useContext(DataContext);

  const onDateSelected = (date) => {
    setSelectedDate(
      date.substring(0, 4) +
        "-" +
        date.substring(5, 7) +
        "-" +
        date.substring(8, 10)
    );
    setShowCalendar(false);
  };

  return (
    <DatePicker
      onDateChange={(date) => onDateSelected(date)}
      mode="calendar"
      style={{ borderRadius: 10 }}
    />
  );
};
