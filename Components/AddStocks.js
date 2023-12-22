import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import HeaderSection from "./HeaderSection";
import TitleSection from "./TitleSection";
import base64 from "react-native-base64";
import { useNavigation } from "@react-navigation/native";
import { PORT, API_USER, API_PASS } from "@env";
import AwesomeAlert from "react-native-awesome-alerts";
import DataContext from "../Context/DataContext";

const AddStocks = () => {
  const navigation = useNavigation();
  const { userDetails } = useContext(DataContext);
  const [name, setName] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [target, setTarget] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [description, setDiscription] = useState("");
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const isFocused = useIsFocused();
  const [bearerToken] = useState(userDetails.token);

  const saveStocksDetails = async () => {
    try {
      const url = "http://" + PORT + "/stocks";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + bearerToken,
        },
        body: JSON.stringify({
          name: name,
          entryPrice: entryPrice,
          stopLoss: stopLoss,
          target: target,
          strategy: description,
        }),
      });

      const data = await response;
      return await data.status;
    } catch (error) {
      ToastAndroid.show("Something went wrong !", ToastAndroid.SHORT);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!name) errors.name = "Name is required";
    if (!entryPrice) errors.entryPrice = "Entry Price is required";
    if (!target) errors.target = "Target is required";
    if (!stopLoss) errors.stopLoss = "Stop Loss is required";
    if (!description) errors.description = "Description is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if ((await saveStocksDetails()) === 200) {
      setName("");
      setEntryPrice("");
      setTarget("");
      setStopLoss("");
      setDiscription("");
      setErrors({});
      ToastAndroid.show("Stock added successfully !", ToastAndroid.SHORT);
      setShowAlert(false);
      setTimeout(() => {
        navigation.navigate("HomeScreen");
      }, 500);
    } else {
      setShowAlert(false);
      ToastAndroid.show("Please try again !", ToastAndroid.SHORT);
    }
  };

  const alertHide = () => {
    setShowAlert(false);
  };

  const alertShow = () => {
    if (validateForm()) {
      setShowAlert(true);
    } else {
      ToastAndroid.show("Please fill all details !", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    setName("");
    setEntryPrice("");
    setTarget("");
    setStopLoss("");
    setDiscription("");
    setErrors({});
  }, [isFocused]);

  return (
    <SafeAreaView style={[styles.safeArea]}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={0}
        style={styles.container}
      >
        <HeaderSection />
        <ScrollView style={styles.scrollMe}>
          <TitleSection title={"Add Stock"} />
          <View style={styles.second}>
            <TextInput
              inputMode="text"
              style={styles.addDetails}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.addDetails}
              placeholder="Entry Price"
              value={entryPrice}
              inputMode="decimal"
              onChangeText={(text) => setEntryPrice(text)}
            />
            <TextInput
              style={styles.addDetails}
              inputMode="decimal"
              placeholder="Target"
              value={target}
              onChangeText={(text) => setTarget(text)}
            />
            <TextInput
              inputMode="decimal"
              style={styles.addDetails}
              placeholder="Stop Loss"
              value={stopLoss}
              onChangeText={(text) => setStopLoss(text)}
            />
            <TextInput
              inputMode="text"
              style={styles.addDetails}
              placeholder="Description (Comments,Startegy,etc.)"
              value={description}
              onChangeText={(text) => setDiscription(text)}
              multiline={true}
            />
            <TouchableOpacity
              style={styles.addDetailsButton}
              onPress={() => alertShow()}
            >
              <Text style={styles.submitDetailstext}>Submit Detials</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Warning!"
          message="Are you sure you want to add this item?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, add it"
          confirmButtonColor="#4caf50"
          onCancelPressed={() => {
            alertHide();
          }}
          onConfirmPressed={() => {
            handleSubmit();
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddStocks;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e7e7e7",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollMe: {
    marginLeft: -15,
    paddingLeft: 15,
    paddingRight: 20,
    width: "110%",
  },
  second: {
    marginTop: 15,
  },
  addDetails: {
    width: "90%",
    fontSize: 14,
    padding: 16,
    marginBottom: 15,
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
  addDetailsButton: {
    padding: 20,
    backgroundColor: "#4caf50",
    marginVertical: 15,
    marginHorizontal: 60,
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
});
