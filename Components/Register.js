import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Home from "./Home";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const chartIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/chartIcon.gif");

export default function Register() {
  const [userName, setUsername] = useState("");
  const [emailId, setEmailId] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");

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
          <View style={styles.loginInput}>
            <TextInput
              inputMode="text"
              style={styles.addDetails}
              placeholder="Name"
              value={userName}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={styles.addDetails}
              placeholder="Email Id"
              value={emailId}
              inputMode="email"
              onChangeText={(text) => setEmailId(text)}
            />
            <TextInput
              inputMode="text"
              style={styles.addDetails}
              placeholder="01/01/2001"
              value={birthDate}
              onChangeText={(text) => setBirthDate(text)}
            />
            <TextInput
              style={styles.addDetails}
              placeholder="Password"
              value={password}
              inputMode="text"
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              style={styles.addDetails}
              placeholder="Password"
              value={password}
              inputMode="text"
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => alertShow()}
          >
            <Text style={styles.submitDetailstext}>Login</Text>
          </TouchableOpacity>
          <View style={styles.noAccount}>
            <Text style={styles.donttext}>Already have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.signUp}>Sign in</Text>
            </TouchableOpacity>
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
  loginInput: {
    marginTop: 15,
  },
  addDetails: {
    width: "90%",
    fontSize: 14,
    padding: 16,
    marginBottom: 25,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#fff",
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
