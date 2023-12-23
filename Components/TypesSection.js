import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
const calendarIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/calendar.png");

const TypesSection = () => {
  return (
    <View style={styles.typeSection}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <Text style={styles.typetextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.typetext}>Today</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
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
    borderRadius: 12,
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
