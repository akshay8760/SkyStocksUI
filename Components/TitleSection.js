import { View, Text, StyleSheet } from "react-native";

const TitleSection = () => {
  return (
    <View style={styles.titleSection}>
      <Text style={styles.title}>Your Stocks</Text>
    </View>
  );
};

export default TitleSection;

const styles = StyleSheet.create({
  titleSection: {
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },
});
