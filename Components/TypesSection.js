import { View, Text, StyleSheet } from "react-native";

const TypesSection = () => {
  return (
    <View style={styles.typeSection}>
      <Text style={styles.typetextActive}>All</Text>
      <Text style={styles.typetext}>Today</Text>
    </View>
  );
};

export default TypesSection;

const styles = StyleSheet.create({
  typeSection: {
    marginTop: 15,
    flexDirection: "row",
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
    marginRight: 33,
    fontWeight: "500",
    color: "#696969",
  },
});
