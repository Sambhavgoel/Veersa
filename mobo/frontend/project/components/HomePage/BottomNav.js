import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, navigation } from "react-native";

const BottomNav = ({ navigation }) => {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => navigation.navigate("Emergency")}>
        <Text style={styles.navIcon}>🚑</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Reminder')}>
        <Text style={styles.navIcon}>⏰</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Appointment")}>
        <Text style={styles.navIcon}>📅</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.navIcon}>👤</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "lightblue",
    padding:10,
    margin:5,
  },
  navIcon: {
    fontSize: 28,
    borderRadius:20,
    backgroundColor:"blue",
    padding:5,
  },
});
