import { View, Image, StyleSheet, TextInput } from "react-native";
import { useContext } from "react";
import DataContext from "../Context/DataContext";

const magnifyingIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/magnifying-glass.png");

const SearchSection = () => {
  const { setSearchKeyword } = useContext(DataContext);
  searchStocks = (searchtext) => {
    const lowerCaseKeyword = searchtext.toLowerCase();
    setSearchKeyword(lowerCaseKeyword);
  };
  return (
    <View style={styles.searchSection}>
      <View style={styles.searchPallet}>
        <TextInput
          style={styles.searchInut}
          onChangeText={(keyWord) => searchStocks(keyWord)}
        />
        <View style={styles.searchIconarea}>
          <Image
            source={magnifyingIcon}
            resizeMode="contain"
            style={styles.magnifyingIconStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchSection;

const styles = StyleSheet.create({
  searchSection: {
    paddingHorizontal: 25,
    marginTop: 15,
    justifyContent: "center",
  },
  searchPallet: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    flexDirection: "row",
    width: "100%",
    height: 40,
    borderRadius: 8,
  },
  searchInut: {
    width: "86%",
    height: 40,
  },
  searchIconarea: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  magnifyingIconStyle: {
    height: 30,
    width: 30,
    marginRight: -20,
  },
});
