import { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import DataContext from "../Context/DataContext";
const calendarIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/calendar.png");

const TypesSection = () => {
  const { showCalendar, setShowCalendar, setSelectedDate } =
    useContext(DataContext);

  return (
    <View style={styles.typeSection}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => setSelectedDate("All")}>
          <Text style={styles.typetextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedDate("Today")}>
          <Text style={styles.typetextActive}>Today</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            setShowCalendar(!showCalendar);
          }}
        >
          <Image
            source={calendarIcon}
            resizeMode="contain"
            style={styles.calendarIconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TypesSection;

const styles = StyleSheet.create({
  typeSection: {
    marginTop: 15,
    marginHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typetextActive: {
    fontSize: 15,
    marginRight: 10,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 10,
  },
  typetext: {
    fontSize: 15,
    marginRight: 10,
    fontWeight: "500",
    color: "#696969",
  },
  calendarIconStyle: {
    height: 20,
    width: 20,
  },
});
