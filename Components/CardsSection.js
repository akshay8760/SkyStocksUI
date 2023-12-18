import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Stockcard from "./StockCard";
import base64 from "react-native-base64";
import { useContext } from "react";
import DataContext from "../Context/DataContext";
import { useIsFocused } from "@react-navigation/native";

const CardsSection = () => {
  const isFocused = useIsFocused();
  const { searchKeyword } = useContext(DataContext);
  const [allStocks, setAllStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loader, setLoader] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.1.58:3000/stocks", {
        headers: {
          Authorization:
            "Basic " + base64.encode("Sky_Stock" + ":" + "skystock9876"),
        },
      });
      const data = await response.json();
      setAllStocks(data);
      setFilteredStocks(data);
      setLoader(false);
    } catch (error) {
      setLoader(true);
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
    fetchData();
  }, [isFocused]);

  useEffect(() => {
    const results = allStocks.filter((stocks) => {
      return stocks.name.toLowerCase().includes(searchKeyword);
    });

    setFilteredStocks(results);
  }, [searchKeyword]);

  return (
    <View style={styles.listSection}>
      <Text style={styles.headText}>Recommendations</Text>
      <ScrollView style={styles.cardPallete}>
        {loader ? (
          <View style={styles.loader}>
            <ActivityIndicator size={50} color="green" animating={loader} />
            <Text style={styles.loaderText}>Hold On!</Text>
            <Text style={styles.loaderText}>
              We are loading your Stock details...
            </Text>
          </View>
        ) : (
          <Stockcard stockList={filteredStocks} />
        )}
      </ScrollView>
    </View>
  );
};

export default CardsSection;

const styles = StyleSheet.create({
  listSection: {
    marginTop: 25,
  },
  headText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardPallete: {
    marginLeft: -15,
    paddingLeft: 15,
    paddingRight: 20,
    width: "110%",
    height: 450,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    height: 450,
  },
  loaderText: {
    fontWeight: "600",
    color: "gray",
  },
});
