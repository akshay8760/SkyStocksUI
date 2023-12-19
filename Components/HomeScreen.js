import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardsSection from "./CardsSection";
import HeaderSection from "./HeaderSection";
import SearchSection from "./SearchSection";
import TypesSection from "./TypesSection";
import TitleSection from "./TitleSection";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderSection />
        <TitleSection title={"Your Stocks"} />
        <SearchSection />
        <TypesSection />
        <CardsSection navigation={navigation} />
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
});
