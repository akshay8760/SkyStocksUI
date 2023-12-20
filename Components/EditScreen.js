import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import TitleSection from "./TitleSection";
import base64 from "react-native-base64";
import { useNavigation } from "@react-navigation/native";
import { PORT, API_USER, API_PASS } from "@env";
import AwesomeAlert from "react-native-awesome-alerts";

const backIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/left-arrow.png");
const dotIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/dots.png");

const EditScreen = ({ route, navigation }) => {
  const stockDetails = route.params.stockDetails.stockDetails;

  const [name, setName] = useState(stockDetails.name);
  const [entryPrice, setEntryPrice] = useState(
    stockDetails.entryPrice.toLocaleString()
  );
  const [target, setTarget] = useState(stockDetails.target.toLocaleString());
  const [stopLoss, setStopLoss] = useState(
    stockDetails.stopLoss.toLocaleString()
  );
  const [description, setDiscription] = useState(stockDetails.strategy);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const isFocused = useIsFocused();

  const editStocksDetails = async (id) => {
    const date = new Date();
    try {
      const url = "http://" + PORT + "/stocks/" + id;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + base64.encode(API_USER + ":" + API_PASS),
        },
        body: JSON.stringify({
          name: name,
          entryPrice: entryPrice,
          stopLoss: stopLoss,
          target: target,
          strategy: description,
          dateTime: date.toLocaleString(),
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

  const handleSubmit = async (id) => {
    const date = new Date();
    if ((await editStocksDetails(id)) === 200) {
      setName("");
      setEntryPrice("");
      setTarget("");
      setStopLoss("");
      setDiscription("");
      setErrors({});
      ToastAndroid.show("Details saved successfully !", ToastAndroid.SHORT);
      setShowAlert(false);
      setTimeout(() => {
        navigation.pop(2);
      }, 1000);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={0}
        style={styles.container}
      >
        <View style={styles.headerSection}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={backIcon}
              resizeMode="contain"
              style={styles.backIconStyle}
            />
          </TouchableOpacity>
        </View>
        <TitleSection title={"Edit Stock"} />
        <ScrollView style={styles.scrollMe}>
          <View style={styles.second}>
            <TextInput
              inputMode="text"
              style={styles.addDetails}
              placeholder="Name"
              value={name}
              editable={false}
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
          message="Are you sure you want to edit this item?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, add it"
          confirmButtonColor="#4caf50"
          onCancelPressed={() => {
            alertHide(stockDetails._id);
          }}
          onConfirmPressed={() => {
            handleSubmit(stockDetails._id);
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditScreen;

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