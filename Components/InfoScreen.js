import React from "react";
import { View, Text, StyleSheet } from "react-native";


const InfoScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Info Screen</Text>
        </View>
    )
};

export default InfoScreen;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundCOlor: "e7e7e7",
      justifyContent: "center",
      alignItems: "center"
    }
  });


