import { useContext, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DataContext from "../Context/DataContext";
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";

const backIcon = require("../assets/icons/left-arrow.png");
const faceIcon = require("../assets/icons/face.png");
const emailIcon = require("../assets/icons/email.png");
const phoneIcon = require("../assets/icons/phone-call.png");

const UserDetails = () => {
  const navigation = useNavigation();
  const { userDetails } = useContext(DataContext);
  const [spinner, setSpinner] = useState(false);
  const { setUserDetails, setLogOut, setLogIn } = useContext(DataContext);
  const [showAlert, setShowAlert] = useState(false);

  //console.log("user", userDetails.user[0].phoneNo);

  alertshow = () => {
    setShowAlert(true);
  };

  handleLogout = () => {
    setLogOut(true);
    setLogIn(false);
    setShowAlert(false);
    ToastAndroid.show("Logged out successfully!", ToastAndroid.SHORT);
    setTimeout(() => {
      navigation.navigate("Login");
      setUserDetails({});
      setLogOut(false);
    }, 1000);
  };

  const alertHide = () => {
    setShowAlert(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerSection}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={backIcon}
              resizeMode="contain"
              style={styles.backIconStyle}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.imageSection}>
            <Image
              source={faceIcon}
              resizeMode="contain"
              style={styles.stockDetailsStyle}
            />
            <Text style={styles.userName}>{userDetails.user[0].userName}</Text>
          </View>
          <View style={styles.card}>
            <View style={{ flexDirection: "column" }}>
              <View style={styles.details}>
                <Image
                  source={emailIcon}
                  resizeMode="contain"
                  style={styles.emailIconStyle}
                />
                <Text style={styles.emailTextStyle}>
                  {userDetails.user[0].email}{" "}
                </Text>
              </View>
              <View style={styles.details}>
                <Image
                  source={phoneIcon}
                  resizeMode="contain"
                  style={styles.emailIconStyle}
                />
                <Text style={styles.emailTextStyle}>
                  +91 {userDetails.user[0].phoneNo}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => alertshow()}
          >
            {!spinner && <Text style={styles.submitDetailstext}>Logout</Text>}
            {spinner && <ActivityIndicator size="small" color="white" />}
          </TouchableOpacity>
        </ScrollView>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Warning!"
        message="Do you want to logout of the Application?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancel"
        confirmText="Yes, LogOut"
        confirmButtonColor="#4caf50"
        onCancelPressed={() => {
          alertHide();
        }}
        onConfirmPressed={() => {
          handleLogout();
        }}
      />
    </SafeAreaView>
  );
};

export default UserDetails;

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
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backIconStyle: {
    width: 25,
  },
  header: {
    fontSize: 30,
    fontWeight: "600",
    marginLeft: 5,
  },
  dotIconStyle: {
    width: 30,
  },
  imageSection: {
    marginTop: 40,
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  stockDetailsStyle: {
    width: 150,
    height: 150,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 5,
  },
  card: {
    marginTop: 40,
    height: 230,
    padding: 13,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f1f4f6",
    flexDirection: "row",
    marginBottom: 13,
  },
  details: {
    flexDirection: "row",
    padding: 10,
  },
  emailIconStyle: {
    width: 30,
    height: 30,
    marginRight: 14,
  },
  emailTextStyle: {
    fontSize: 16,
    height: 30,
    width: "100%",
    fontWeight: "500",
    textAlignVertical: "center",
    color: "#696969",
  },
  logoutButton: {
    padding: 20,
    backgroundColor: "#ff9800",
    marginVertical: 30,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#ff9800",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  submitDetailstext: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
