import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardsSection from "./CardsSection";
import HeaderSection from "./HeaderSection";
import SearchSection from "./SearchSection";
import TypesSection from "./TypesSection";
import TitleSection from "./TitleSection";
import AwesomeAlert from "react-native-awesome-alerts";
import DataContext from "../Context/DataContext";
import Calendar from "./Calendar";

const closeIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/close.png");

const HomeScreen = ({ navigation }) => {
  const { logOut, showCalendar, setShowCalendar } = useContext(DataContext);
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

  const close = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderSection />

        {showCalendar && (
          <View style={styles.dateContainer}>
            <Calendar />
            <TouchableOpacity onPress={close}>
              <Image
                source={closeIcon}
                resizeMode="contain"
                style={styles.closeIconStyle}
              />
            </TouchableOpacity>
          </View>
        )}
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
  dateContainer: {
    zIndex: 999,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: 800,
    width: 340,
    margin: 20,
  },
  closeIconStyle: {
    marginTop: 10,
    height: 40,
    width: 40,
  },
});
