import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const BottomNav = ({ navigation }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => navigation.navigate("AmbulanceHomeScreen")}>
        <Text style={styles.emojiIcon}>🚑</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Reminder")}>
        <Image
          style={styles.img}
          source={require("../../assets/WhatsApp Image 2025-05-11 at 17.34.24 (3).jpeg")}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Image
          style={styles.img}
          source={require("../../assets/WhatsApp Image 2025-05-11 at 17.34.26 (2).jpeg")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "teal",
  },
  emojiIcon: {
    fontSize: 25,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 50,
    textAlign: "center",
    color: "white",
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
