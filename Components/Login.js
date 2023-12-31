import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useState } from "react";
import { PORT } from "@env";
import DataContext from "../Context/DataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const chartIcon = require("../assets/icons/chartIcon.gif");

export default function Login({ navigation }) {
  const { isLogin, setIsLogin } = useContext(DataContext);
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [spinner, setSpinner] = useState(false);

  const loginUser = async () => {
    try {
      // const url = "http://" + PORT + "/users/signIn";
      const url = PORT + "/users/signIn";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNo: phoneNo,
          password: password,
        }),
      });

      const data = await response;
      const userDetails = await data.json();
      setUserDetails(userDetails);
      return await data.status;
    } catch (error) {
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
    }
  };

  setUserDetails = async (userDetails) => {
    try {
      console.log("userDetails", userDetails);
      await AsyncStorage.setItem("USER_DETAILS", JSON.stringify(userDetails));
    } catch (error) {
      // Error saving data
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!phoneNo) errors.phoneNo = "Phone No Price is required";
    if (!password) errors.password = "Password is required";

    if (Object.keys(errors).length) {
      ToastAndroid.show("Please fill all details !", ToastAndroid.SHORT);
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  handleLogin = async () => {
    if (validateForm()) {
      setSpinner(true);
      const status = await loginUser();
      if (status === 201) {
        ToastAndroid.show("Welcome Back!", ToastAndroid.SHORT);
        setTimeout(() => {
          setLoginStatus();
          navigation.navigate("Home");
          setPhoneNo("");
          setPassword("");
          setErrors({});
        }, 500);
      } else if (status === 400) {
        ToastAndroid.show("Invalid Credentials!", ToastAndroid.SHORT);
      } else if (status === 404) {
        ToastAndroid.show(
          "User not registered, Please SignUp!",
          ToastAndroid.SHORT
        );
        setTimeout(() => {
          navigation.navigate("Register");
        }, 500);
      } else {
        ToastAndroid.show("Please try again!", ToastAndroid.SHORT);
      }
      setSpinner(false);
    }
  };

  useEffect(() => {
    //setLoginStatus();
    getLoginStatus();
  }, []);

  toSignUp = () => {
    setTimeout(() => {
      navigation.navigate("Register");
    }, 500);
  };

  setLoginStatus = async () => {
    try {
      await AsyncStorage.setItem("IS_LOGIN", JSON.stringify(true));
      setIsLogin(true);
    } catch (error) {
      // Error saving data
    }
  };

  getLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem("IS_LOGIN");
      if (value !== null) {
        // We have data!!
        if (JSON.parse(value)) {
          navigation.navigate("Home");
        }
      } else {
      }
    } catch (error) {
      // Error retrieving data
      console.log(value);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        {!isLogin && (
          <ScrollView style={styles.scrollMe}>
            <View style={styles.imageSection}>
              <Image
                source={chartIcon}
                resizeMode="contain"
                style={styles.stockDetailsStyle}
              />
            </View>
            <View style={styles.header}>
              <Text style={styles.appName}>Sky Stocks</Text>
              <Text style={styles.loginText}>Account Login</Text>
            </View>
            <View style={styles.logincard}>
              <View style={styles.loginInput}>
                <TextInput
                  inputMode="numeric"
                  style={styles.addDetails}
                  placeholder="Phone Number"
                  value={phoneNo}
                  onChangeText={(text) => setPhoneNo(text)}
                />
                <TextInput
                  style={styles.addDetails}
                  placeholder="Password"
                  value={password}
                  secureTextEntry={true}
                  inputMode="text"
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => handleLogin()}
              >
                {!spinner && (
                  <Text style={styles.submitDetailstext}>Login</Text>
                )}
                {spinner && <ActivityIndicator size="small" color="white" />}
              </TouchableOpacity>
              <View style={styles.noAccount}>
                <Text style={styles.donttext}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => toSignUp()}>
                  <Text style={styles.signUp}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e7e7e7",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  imageSection: {
    width: "100%",
    height: 220,
    justifyContent: "center",
    alignItems: "center",
  },
  stockDetailsStyle: {
    width: 150,
    height: 150,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  appName: {
    fontSize: 30,
    fontWeight: "900",
    marginLeft: 5,
    color: "#673ab7",
  },
  scrollMe: {
    marginLeft: -15,
    paddingLeft: 15,
    paddingRight: 20,
    width: "110%",
    height: 450,
  },
  loginText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
  },
  logincard: {
    backgroundColor: "#d8e0e4",
    padding: 20,
    borderRadius: 10,
  },
  loginInput: {
    marginTop: 15,
  },
  addDetails: {
    width: "90%",
    fontSize: 14,
    padding: 16,
    marginBottom: 25,
    marginHorizontal: 20,
    backgroundColor: "#f1f4f6",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#f1f4f6",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  loginButton: {
    padding: 20,
    backgroundColor: "#4caf50",
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#4caf50",
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
  noAccount: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUp: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "900",
    color: "#ff5722",
  },
});

// border: {
//   borderBottomColor: "#abb8c3",
//   borderBottomWidth: 2,
//   marginVertical: 10,
//   marginHorizontal: 24,
// },
