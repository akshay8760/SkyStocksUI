import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import Home from "./Home";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { PORT } from "@env";

const chartIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/chartIcon.gif");

export default function Register({ navigation }) {
  const [userName, setUsername] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});
  const [spinner, setSpinner] = useState(false);

  const registerUser = async () => {
    try {
      const url = "http://" + PORT + "/users/signUp";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          phoneNo: phoneNo,
          email: emailId,
          password: password,
        }),
      });

      const data = await response;
      return await data.status;
    } catch (error) {
      ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!userName) errors.userName = "Username is required";
    if (!phoneNo) errors.phoneNo = "Phone No Price is required";
    if (!emailId) errors.emailId = "Email Id is required";
    if (!password) errors.password = "Password is required";
    if (!password2) errors.password2 = "password is required";

    if (Object.keys(errors).length) {
      ToastAndroid.show("Please fill all details !", ToastAndroid.SHORT);
    } else if (password != password2) {
      ToastAndroid.show("Password do not match!", ToastAndroid.SHORT);
      errors.passwordMatch = "Passwords do not match";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  handleRegister = async () => {
    if (validateForm()) {
      setSpinner(true);
      const status = await registerUser();
      if (status === 201) {
        ToastAndroid.show(
          "User Registered, Please Login to continue!",
          ToastAndroid.SHORT
        );
        setTimeout(() => {
          navigation.navigate("Login");
          setUsername("");
          setPhoneNo("");
          setEmailId("");
          setPassword("");
          setPassword2("");
          setErrors({});
        }, 500);
        setTimeout(() => {
          navigation.navigate("Login");
        }, 500);
      } else if (status === 400) {
        ToastAndroid.show(
          "User Already Registered, Please LogIn to continue!",
          ToastAndroid.SHORT
        );
        setTimeout(() => {
          navigation.navigate("Login");
        }, 500);
      } else {
        ToastAndroid.show("Please try again!", ToastAndroid.SHORT);
      }
      setSpinner(false);
    }
  };

  toSignIn = () => {
    setTimeout(() => {
      navigation.navigate("Login");
    }, 500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <ScrollView style={styles.scrollMe}>
          <View style={styles.header}>
            <Text style={styles.appName}>Sky Stocks</Text>
            <Text style={styles.loginText}>Register Account</Text>
          </View>
          <View style={styles.logincard}>
            <View style={styles.loginInput}>
              <TextInput
                inputMode="text"
                style={styles.addDetails}
                placeholder="Name"
                value={userName}
                onChangeText={(text) => setUsername(text)}
              />
              <TextInput
                inputMode="numeric"
                style={styles.addDetails}
                placeholder="Phone number"
                value={phoneNo}
                onChangeText={(text) => setPhoneNo(text)}
              />
              <TextInput
                style={styles.addDetails}
                placeholder="Email Id"
                value={emailId}
                inputMode="email"
                onChangeText={(text) => setEmailId(text)}
              />
              <TextInput
                style={styles.addDetails}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                inputMode="text"
                onChangeText={(text) => setPassword(text)}
              />
              <TextInput
                style={styles.addDetails}
                placeholder="Re-Enter Password"
                secureTextEntry={true}
                value={password2}
                inputMode="text"
                onChangeText={(text) => setPassword2(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handleRegister()}
            >
              {!spinner && (
                <Text style={styles.submitDetailstext}>Register</Text>
              )}
              {spinner && <ActivityIndicator size="small" color="white" />}
            </TouchableOpacity>
            <View style={styles.noAccount}>
              <Text style={styles.donttext}>Already have an account?</Text>
              <TouchableOpacity onPress={() => toSignIn()}>
                <Text style={styles.signUp}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    paddingVertical: 60,
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
