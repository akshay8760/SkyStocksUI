import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const menuIcon = require("../assets/icons/menu.png");
const faceIcon = require("../assets/icons/face.png");

const HeaderSection = () => {
  const navigation = useNavigation();
  userDashboard = () => {
    navigation.navigate("UserDetails");
  };

  return (
    <View style={styles.headerSection}>
      <Image
        source={menuIcon}
        resizeMode="contain"
        style={styles.menuIconStyle}
      />
      <TouchableOpacity onPress={userDashboard}>
        <Image
          source={faceIcon}
          resizeMode="contain"
          style={styles.faceIconStyle}
        />
      </TouchableOpacity>
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
    height: 40,
  },
  faceIconStyle: {
    width: 40,
    height: 40,
  },
});
