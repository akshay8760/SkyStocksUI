import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PORT } from "@env";
import AwesomeAlert from "react-native-awesome-alerts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const backIcon = require("../assets/icons/left-arrow.png");
const dotIcon = require("../assets/icons/dots.png");
const stockDetailsIcon = require("../assets/icons/stockDetailsIcon.gif");

const InfoScreen = ({ route, navigation }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [bearerToken, setBearerToken] = useState("");

  getUserDetails = async () => {
    try {
      const value = await AsyncStorage.getItem("USER_DETAILS");
      if (value !== null) {
        setBearerToken(JSON.parse(value).token);
      } else {
      }
    } catch (error) {
      // Error retrieving data
      console.log(value);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const deleteStocks = async (id) => {
    try {
      const url = PORT + "/stocks/" + id;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + bearerToken,
        },
      });
      const data = await response;
      return await data.status;
    } catch (error) {
      ToastAndroid.show("Something went wrong !", ToastAndroid.SHORT);
    }
  };

  const handleDelete = async (id) => {
    if ((await deleteStocks(id)) === 200) {
      ToastAndroid.show("Stock deleted successfully !", ToastAndroid.SHORT);
      setShowAlert(false);
      navigation.goBack();
    } else {
      ToastAndroid.show("Please try again !", ToastAndroid.SHORT);
    }
  };

  const alertHide = () => {
    setShowAlert(false);
  };

  const alertShow = () => {
    setShowAlert(true);
  };

  const close = () => {
    setShowDropdown(false);
  };

  convertUTCDateToLocalDate = (date) => {
    var localDate = new Date(date).toLocaleString("en-IN", {
      localeMatcher: "best fit",
      timeZoneName: "short",
    });
    let index;
    if (localDate.indexOf("am") > 0) {
      index = localDate.indexOf("am") + 2;
    } else {
      index = localDate.indexOf("pm") + 2;
    }
    localDate = localDate.substring(0, index);
    return localDate;
  };

  const stockDetails = route.params.stockDetails.item;
  var createdAt = convertUTCDateToLocalDate(new Date(stockDetails.createdAt));
  var updatedAt = convertUTCDateToLocalDate(new Date(stockDetails.updatedAt));

  return (
    <TouchableWithoutFeedback onPress={close}>
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
            <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
              <Image
                source={dotIcon}
                resizeMode="contain"
                style={styles.dotIconStyle}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollMe}>
            <View style={styles.imageSection}>
              <Image
                source={stockDetailsIcon}
                resizeMode="contain"
                style={styles.stockDetailsStyle}
              />
            </View>
            <View style={styles.stockBodyStyle}>
              <View>
                <View style={styles.headSection}>
                  <Text style={styles.stockNameStyle}>
                    {stockDetails.name.toUpperCase()}
                  </Text>
                </View>
                <View style={{ flexDirection: "column" }}>
                  <View style={styles.detailstyle}>
                    <Text style={styles.nameStyle}>Entry Price</Text>
                    <Text style={styles.valueStyle}>
                      {stockDetails.entryPrice}
                    </Text>
                  </View>
                </View>
                <View style={styles.border} />
                <View style={{ flexDirection: "column" }}>
                  <View style={styles.detailstyle}>
                    <Text style={styles.nameStyle}>Stoploss</Text>
                    <Text style={styles.valueStyle}>
                      {stockDetails.stopLoss}
                    </Text>
                  </View>
                </View>
                <View style={styles.border} />
                <View style={{ flexDirection: "column" }}>
                  <View style={styles.detailstyle}>
                    <Text style={styles.nameStyle}>Target</Text>
                    <Text style={styles.valueStyle}>{stockDetails.target}</Text>
                  </View>
                </View>
                <View style={styles.border} />
                <View style={{ flexDirection: "column" }}>
                  <View style={styles.detailstyle}>
                    <Text style={styles.nameStyle}>Created At</Text>
                    <Text style={styles.valueStyle}>{createdAt}</Text>
                  </View>
                </View>
                <View style={styles.border} />
                <View style={{ flexDirection: "column" }}>
                  <View style={styles.detailstyle}>
                    <Text style={styles.nameStyle}>Updated At</Text>
                    <Text style={styles.valueStyle}>{updatedAt}</Text>
                  </View>
                </View>
                <View style={styles.border} />
              </View>
              <View>
                <Text style={styles.strategyStyle}>Strategy</Text>
                <Text style={styles.strategyValueStyle}>
                  {stockDetails.strategy}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {showDropdown && (
          <View style={styles.editDelMenu}>
            <TouchableOpacity
              onPress={() =>
                setTimeout(() => {
                  setShowDropdown(false);
                  navigation.navigate("Edit", {
                    stockDetails: { stockDetails },
                  });
                }, 500)
              }
            >
              <Text style={styles.editDeltext}>Edit</Text>
            </TouchableOpacity>
            <View style={styles.borderMenu} />
            <TouchableOpacity
              onPress={() => {
                setShowDropdown(false);
                alertShow();
              }}
            >
              <Text style={styles.editDeltext}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Warning!"
          message="Are you sure you want to delete this item?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#ff5722"
          onCancelPressed={() => {
            alertHide();
          }}
          onConfirmPressed={() => {
            handleDelete(stockDetails._id);
          }}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default InfoScreen;

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
    height: 80,
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
  stockBodyStyle: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f1f4f6",
  },
  headSection: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  detailstyle: {
    flexDirection: "row",
    height: 50,
    //backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  nameStyle: {
    textAlignVertical: "center",
    fontSize: 16,
    fontWeight: "700",
    color: "#455a64",
  },
  valueStyle: {
    textAlignVertical: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#455a64",
  },
  stockNameStyle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#000",
  },
  scrollMe: {
    marginLeft: -15,
    paddingLeft: 15,
    paddingRight: 20,
    width: "110%",
  },
  border: {
    borderBottomColor: "#abb8c3",
    borderBottomWidth: 1,
    marginHorizontal: 14,
  },
  strategyStyle: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
    margin: 10,
  },
  strategyValueStyle: {
    paddingHorizontal: 10,
    color: "#455a64",
    // color: "#607d8b",
    textAlign: "justify",
  },
  borderMenu: {
    borderBottomColor: "#abb8c3",
    borderBottomWidth: 1,
  },
  editDelMenu: {
    position: "absolute",
    top: 90,
    right: 30,
    padding: 6,
    width: 100,
    borderRadius: 10,
    backgroundColor: "#455a64",
  },
  editDeltext: {
    color: "#fff",
    padding: 5,
  },
});
