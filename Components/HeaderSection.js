import { View, Image, StyleSheet } from "react-native";

const menuIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/menu.png");
const faceIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/face.png");

const HeaderSection = () => {
  return (
    <View style={styles.headerSection}>
      <Image
        source={menuIcon}
        resizeMode="contain"
        style={styles.menuIconStyle}
      />
      <Image
        source={faceIcon}
        resizeMode="contain"
        style={styles.faceIconStyle}
      />
    </View>
  );
};

export default HeaderSection;

const styles = StyleSheet.create({
  headerSection: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIconStyle: {
    width: 40,
  },
  faceIconStyle: {
    width: 40,
  },
});
