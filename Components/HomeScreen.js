import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardsSection from "./CardsSection";
import HeaderSection from "./HeaderSection";
import SearchSection from "./SearchSection";
import TypesSection from "./TypesSection";
import TitleSection from "./TitleSection";
import AwesomeAlert from "react-native-awesome-alerts";
import DataContext from "../Context/DataContext";

const HomeScreen = ({ navigation }) => {
  const { logOut } = useContext(DataContext);

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!logOut) {
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        setShowAlert(true);
      });
      if (logOut) {
        const unsubscribe = navigation.addListener("beforeRemove", (e) => {
          return true;
        });
      }
      return unsubscribe;
    }
  }, [navigation, logOut]);

  closeApp = () => {
    setShowAlert(false);
    setTimeout(() => {
      BackHandler.exitApp();
    }, 1000);
  };

  const alertHide = () => {
    setShowAlert(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderSection />
        <TitleSection title={"Your Stocks"} />
        <SearchSection />
        <TypesSection />
        <CardsSection navigation={navigation} />
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Warning!"
        message="Do you really want to Exit the Application?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, close it"
        confirmButtonColor="#4caf50"
        onCancelPressed={() => {
          alertHide();
        }}
        onConfirmPressed={() => {
          closeApp();
        }}
      />
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
