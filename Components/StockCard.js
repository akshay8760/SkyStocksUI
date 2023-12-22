import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Stockcard = ({ stockList, stockLength, navigation }) => {
  return stockLength ? (
    <View>
      {stockList.map((item) => {
        return (
          <TouchableOpacity
            style={styles.card}
            key={item._id}
            activeOpacity={0.5}
            onPress={() =>
              setTimeout(() => {
                navigation.navigate("Info", { stockDetails: { item } });
              }, 500)
            }
          >
            <View style={styles.infoArea}>
              <Text style={styles.infoTitle}>{item.name.toUpperCase()}</Text>
              <Text style={styles.infoSub}>{item.dateTime}</Text>
              <View style={styles.infoPrice}>
                <View style={styles.infoPriceSection}>
                  <Text style={styles.stopLossText}>🔴 StopLoss</Text>
                  <Text style={styles.priceAmount}>₹ {item.stopLoss}</Text>
                </View>
                <View>
                  <Text style={styles.entryPriceText}>🟢 Entry Price</Text>
                  <Text style={styles.priceAmount}>₹ {item.entryPrice}</Text>
                </View>
                <View>
                  <Text style={styles.targetText}>🟠 Target</Text>
                  <Text style={styles.priceAmount}>₹ {item.target}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  ) : (
    <View style={styles.nothingFound}>
      <Text style={styles.nothingFoundText}>Oops...</Text>
      <Text style={styles.nothingFoundText}>Nothing found here !</Text>
    </View>
  );
};

export default Stockcard;

const styles = StyleSheet.create({
  card: {
    height: 130,
    padding: 13,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: "#f1f4f6",
    flexDirection: "row",
    marginBottom: 13,
  },
  infoArea: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoSub: {
    fontSize: 12,
    fontWeight: "600",
    color: "#696969",
  },
  infoPrice: {
    position: "absolute",
    bottom: 0,
    fontSize: 12,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    color: "#696969",
    fontWeight: "bold",
  },
  infoPriceSection: {
    textAlign: "center",
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
  nothingFound: {
    alignItems: "center",
  },
  nothingFoundText: {
    fontWeight: "600",
    color: "gray",
  },
});
