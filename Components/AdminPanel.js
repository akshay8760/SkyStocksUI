import React from "react";
import { View, Text, StyleSheet } from "react-native";


const AdminPanel = () => {
    return (
        <View style={styles.container}>
            <Text>Admin panel</Text>
        </View>
    )
};

export default AdminPanel;

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundCOlor: "e7e7e7",
      justifyContent: "center",
      alignItems: "center"
    }
  });


