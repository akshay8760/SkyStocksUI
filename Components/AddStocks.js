import React from "react";
import { View, Text, StyleSheet } from "react-native";


const AddStocks = () => {
    return (
        <View style={styles.container}>
            <Text>Add Stocks</Text>
        </View>
    )
};

export default AddStocks;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundCOlor: "e7e7e7",
      justifyContent: "center",
      alignItems: "center"
    }
  });


