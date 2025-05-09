import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("HomeScreen");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../../../assets/combined_tagline_1.png")}
        style={styles.logo}
      /> */}
      <Text>welcome to mobo !!! </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9A826",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default SplashScreen;
