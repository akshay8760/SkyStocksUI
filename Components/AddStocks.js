import React, { useState } from "react";
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
import HeaderSection from "./HeaderSection";
import TitleSection from "./TitleSection";
import base64 from "react-native-base64";

const AddStocks = () => {
  const [name, setName] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [target, setTarget] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [description, setDiscription] = useState("");
  const [errors, setErrors] = useState({});

  const saveStocksDetails = async () => {
    const date = new Date();
    try {
      const response = await fetch("http://192.168.1.58:3000/stocks", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Basic " + base64.encode("Sky_Stock" + ":" + "skystock9876"),
        },
        body: JSON.stringify({
          name: name,
          entryPrice: entryPrice,
          stopLoss: stopLoss,
          target: target,
          strategy: description,
          dateTime: date.toLocaleDateString(),
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
    const date = new Date();
    if (validateForm()) {
      if ((await saveStocksDetails()) === 200) {
        setName("");
        setEntryPrice("");
        setTarget("");
        setStopLoss("");
        setDiscription("");
        setErrors({});
        ToastAndroid.show("Stock added successfully !", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Please try again !", ToastAndroid.SHORT);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={0}
        style={styles.container}
      >
        <HeaderSection />
        <TitleSection title={"Add Stock"} />
        <ScrollView style={styles.scrollMe}>
          <View style={styles.second}>
            <View style={styles.textAndError}>
              <TextInput
                inputMode="text"
                style={styles.addDetails}
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
              {errors?.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
              ) : null}
            </View>
            <View style={styles.textAndError}>
              <TextInput
                style={styles.addDetails}
                placeholder="Entry Price"
                value={entryPrice}
                inputMode="decimal"
                onChangeText={(text) => setEntryPrice(text)}
              />
              {errors?.entryPrice ? (
                <Text style={styles.errorText}>{errors.entryPrice}</Text>
              ) : null}
            </View>
            <View style={styles.textAndError}>
              <TextInput
                style={styles.addDetails}
                inputMode="decimal"
                placeholder="Target"
                value={target}
                onChangeText={(text) => setTarget(text)}
              />
              {errors?.target ? (
                <Text style={styles.errorText}>{errors.target}</Text>
              ) : null}
            </View>
            <View style={styles.textAndError}>
              <TextInput
                inputMode="decimal"
                style={styles.addDetails}
                placeholder="Stop Loss"
                value={stopLoss}
                onChangeText={(text) => setStopLoss(text)}
              />
              {errors?.stopLoss ? (
                <Text style={styles.errorText}>{errors.stopLoss}</Text>
              ) : null}
            </View>
            <View style={styles.textAndError}>
              <TextInput
                inputMode="text"
                style={styles.addDetails}
                placeholder="Description (Comments,Startegy,etc.)"
                value={description}
                onChangeText={(text) => setDiscription(text)}
                multiline={true}
              />
              {errors?.description ? (
                <Text style={styles.errorText}>{errors.description}</Text>
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.addDetailsButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitDetailstext}>Submit Detials</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    height: 450,
  },
  second: {
    marginTop: 15,
  },
  addDetails: {
    width: "90%",
    fontSize: 14,
    padding: 16,
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
  errorText: {
    color: "red",
    marginHorizontal: 20,
  },
  textAndError: {
    marginBottom: 15,
  },
  addDetailsButton: {
    padding: 20,
    backgroundColor: "#1F41BB",
    marginVertical: 15,
    marginHorizontal: 60,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#1F41BB",
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
