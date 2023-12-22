import { View, Text, StyleSheet } from "react-native";

const TitleSection = ({ title }) => {
  return (
    <View style={styles.titleSection}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default TitleSection;

const styles = StyleSheet.create({
  titleSection: {
    marginTop: 10,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#455a64",
  },
});
