import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("HomeScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <Image
          source={require("../assets/WhatsApp Image 2025-05-11 at 01.02.08.jpeg")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.maintext}>Welcome to Innovitals !!! </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  maintext: {
    fontSize: 25,
    color: "green",
  },
  container: {
    flex: 1,
    // backgroundColor: "#F9A826",
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20 ,
  },

  logo: {
    width: 90,
    height: 90,
    borderRadius: 20, // half of width/height to make it round
    resizeMode: "cover", // better for circular images
  },
});

export default SplashScreen;
