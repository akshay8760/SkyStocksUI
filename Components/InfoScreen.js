import React, { useContext, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PORT } from "@env";
import AwesomeAlert from "react-native-awesome-alerts";
import DataContext from "../Context/DataContext";

const backIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/left-arrow.png");
const dotIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/dots.png");
const stockDetailsIcon = require("/Users/arishabh/Desktop/RestAPI/Sky Stocks UI/AwesomeProject/assets/icons/stockDetailsIcon.gif");

const InfoScreen = ({ route, navigation }) => {
  const { userDetails } = useContext(DataContext);
  const [showAlert, setShowAlert] = useState(false);
  const [bearerToken] = useState(userDetails.token);

  const deleteStocks = async (id) => {
    try {
      const url = "http://" + PORT + "/stocks/" + id;
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

  const stockDetails = route.params.stockDetails.item;
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
          <Text style={styles.header}>Detail</Text>
          <Image
            source={dotIcon}
            resizeMode="contain"
            style={styles.dotIconStyle}
          />
        </View>
        <View style={styles.imageSection}>
          <Image
            source={stockDetailsIcon}
            resizeMode="contain"
            style={styles.stockDetailsStyle}
          />
        </View>
        <ScrollView style={styles.scrollMe}>
          <View style={styles.headSection}>
            <View style={styles.topTextArea}>
              <Text style={styles.stockNameStyle}>
                {stockDetails.name.toUpperCase()}
              </Text>
              <Text style={styles.dateTimeStyle}>{stockDetails.dateTime}</Text>
              <Text style={styles.descriptionStyle}>
                {stockDetails.strategy}
              </Text>
              <Text style={styles.recommendationStyle}>
                Price Recommendation
              </Text>
            </View>
          </View>
          <View style={styles.infoPrice}>
            <View style={styles.infoPriceSection}>
              <Text style={styles.stopLossText}>🔴 StopLoss</Text>
              <Text style={styles.priceAmount}>₹ {stockDetails.stopLoss}</Text>
            </View>
            <View>
              <Text style={styles.entryPriceText}>🟢 Entry Price</Text>
              <Text style={styles.priceAmount}>
                ₹ {stockDetails.entryPrice}
              </Text>
            </View>
            <View>
              <Text style={styles.targetText}>🟠 Target</Text>
              <Text style={styles.priceAmount}>₹ {stockDetails.target}</Text>
            </View>
          </View>
          <View style={styles.editDeleteStyle}>
            <TouchableOpacity
              style={styles.deleteButtonStyle}
              onPress={() => alertShow()}
            >
              <Text style={styles.submitDetailstext}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editButtonStyle}
              onPress={() =>
                setTimeout(() => {
                  navigation.navigate("Edit", {
                    stockDetails: { stockDetails },
                  });
                }, 500)
              }
            >
              <Text style={styles.submitDetailstext}>Edit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
  },
  stockDetailsStyle: {
    width: 150,
    height: 150,
  },
  stockNameStyle: {
    fontSize: 36,
    fontWeight: "800",
  },
  dateTimeStyle: {
    fontSize: 13,
    paddingHorizontal: 5,
    fontWeight: "600",
    color: "#696969",
  },
  descriptionStyle: {
    marginTop: 30,
    fontWeight: "400",
    letterSpacing: 0.1,
    paddingHorizontal: 5,
    lineHeight: 18,
    color: "#696969",
    fontSize: 18,
  },
  recommendationStyle: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 5,
  },
  infoPrice: {
    marginTop: 20,
    fontSize: 12,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    color: "#696969",
    fontWeight: "bold",
  },
  stopLossText: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    color: "#f44336",
    marginBottom: 4,
  },
  entryPriceText: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    color: "#4caf50",
    marginBottom: 4,
  },
  targetText: {
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
    color: "#ff9800",
    marginBottom: 4,
  },
  priceAmount: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#696969",
  },
  scrollMe: {
    marginLeft: -15,
    paddingLeft: 15,
    paddingRight: 20,
    width: "110%",
    height: 400,
    marginBottom: 60,
  },
  editDeleteStyle: {
    marginTop: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  submitDetailstext: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  deleteButtonStyle: {
    width: "40%",
    padding: 20,
    marginHorizontal: 10,
    backgroundColor: "#f44336",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#f44336",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  editButtonStyle: {
    width: "40%",
    padding: 20,
    backgroundColor: "#abb8c3",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#abb8c3",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});
