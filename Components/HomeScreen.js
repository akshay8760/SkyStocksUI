import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Stockcard from "./StockCard";
import CardsSection from "./CardsSection";

const menuIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/menu.png");
const faceIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/face.png");
const magnifyingIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/magnifying-glass.png");

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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

        <View style={styles.titleSection}>
          <Text style={styles.title}>Your Stocks</Text>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchPallet}>
            <TextInput style={styles.searchInut} />
            <View style={styles.searchIconarea}>
              <Image
                source={magnifyingIcon}
                resizeMode="contain"
                style={styles.magnifyingIconStyle}
              />
            </View>
          </View>
        </View>

        <View style={styles.typeSection}>
          <Text style={styles.typetextActive}>All</Text>
          <Text style={styles.typetext}>Today</Text>
        </View>

        <CardsSection></CardsSection>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e7e7e7",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

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

  titleSection: {
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
  },

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

  typeSection: {
    marginTop: 15,
    flexDirection: "row",
  },
  typetextActive: {
    fontSize: 15,
    marginRight: 25,
    fontWeight: "bold",
    color: "black",
  },
  typetext: {
    fontSize: 15,
    marginRight: 33,
    fontWeight: "500",
    color: "#696969",
  },
});
