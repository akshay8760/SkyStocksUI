import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Stockcard from "./StockCard";
import { useContext } from "react";
import DataContext from "../Context/DataContext";
import { useIsFocused } from "@react-navigation/native";
import { PORT } from "@env";

const CardsSection = ({ navigation }) => {
  const isFocused = useIsFocused();
  const {
    searchKeyword,
    userDetails,
    selectedDate,
    showCalendar,
    refreshList,
  } = useContext(DataContext);
  const [allStocks, setAllStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [loader, setLoader] = useState(true);
  const [stockLength, setStockLength] = useState();
  const [bearerToken] = useState(userDetails.token);

  const fetchData = async () => {
    try {
      const url = PORT + "/stocks";
      const response = await fetch(url, {
        headers: {
          Authorization: "Bearer " + bearerToken,
        },
      });
      const data = await response.json();
      setAllStocks(data);
      setFilteredStocks(data);
      setStockLength(data.length);
      setLoader(false);
      // ToastAndroid.show(data.length + " stocks", ToastAndroid.SHORT);
    } catch (error) {
      setLoader(true);
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
    fetchData();
  }, [refreshList]); // [isFocused]

  useEffect(() => {
    const results = allStocks.filter((stocks) => {
      return stocks.name.toLowerCase().includes(searchKeyword);
    });

    setFilteredStocks(results);
    setStockLength(results.length);
  }, [searchKeyword]);

  useEffect(() => {
    let results;
    if (selectedDate === "All") {
      results = allStocks;
    } else if (selectedDate === "Today") {
      var today = new Date();
      let date = today.toISOString().substring(0, 10);
      results = allStocks.filter((stocks) => {
        return stocks?.updatedAt?.includes(date);
      });
    } else if (selectedDate) {
      results = allStocks.filter((stocks) => {
        return stocks?.updatedAt?.includes(selectedDate);
      });
    }

    setFilteredStocks(results);
    setStockLength(results?.length);
  }, [selectedDate]);

  return (
    <View style={showCalendar ? styles.listSectionBlur : styles.listSection}>
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
          <Stockcard
            stockList={filteredStocks}
            stockLength={stockLength}
            navigation={navigation}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default CardsSection;

const styles = StyleSheet.create({
  listSection: {
    marginTop: 25,
    marginBottom: 280,
  },
  listSectionBlur: {
    marginTop: 25,
    marginBottom: 280,
    opacity: 0.5,
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
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    fontWeight: "600",
    color: "gray",
  },
});
