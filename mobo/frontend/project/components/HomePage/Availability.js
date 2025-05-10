import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const categories = [
  {
    id: "1",
    label: "Always Here",
    image: require("../../assets/sachin-khadka-84xJL3twcUk-unsplash.jpg"),
  },
  {
    id: "2",
    label: "Expert Care",
    image: require("../../assets/favicon.png"),
  },
  {
    id: "3",
    label: "Hi-Tech Tools",
    image: require("../../assets/icon.png"),
  },
];

const Availability = () => {
  return (
    <View style={styles.container}>
      {categories.map((item) => (
        <View key={item.id} style={styles.item}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default Availability;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "lightblue",
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 10,
  },
  item: {
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
});
