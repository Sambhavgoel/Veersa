import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const specialities = [
  {
    id: "1",
    name: "Cardiologist",
    image: require("../../assets/adaptive-icon.png"),
    navigationTarget: "CardiologistPage",
  },
  {
    id: "2",
    name: "Dentist",
    image: require("../../assets/favicon.png"),
    navigationTarget: "DentistPage",
  },
  {
    id: "3",
    name: "Pediatrician",
    image: require("../../assets/icon.png"),
    navigationTarget: "PediatricianPage",
  },
  {
    id: "4",
    name: "Dermatologist",
    image: require("../../assets/sachin-khadka-84xJL3twcUk-unsplash.jpg"),
    navigationTarget: "DermatologistPage",
  },
  {
    id: "5",
    name: "Psychiatrist",
    image: require("../../assets/splash-icon.png"),
    navigationTarget: "PsychiatristPage",
  },
  {
    id: "6",
    name: "Orthopedic",
    image: require("../../assets/favicon.png"),
    navigationTarget: "OrthopedicPage",
  },
];

const SpecialityCarousel = () => {
  const listRef = useRef(null);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % specialities.length;
      setIndex(nextIndex);
      listRef.current.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(item.navigationTarget)}>
        <Text style={styles.button}>Consult now ➤</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      ref={listRef}
      data={specialities}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      style={styles.whole}
    />
  );
};

export default SpecialityCarousel;

const styles = StyleSheet.create({
  whole: {
    marginVertical: 10,
    backgroundColor: "lightblue",
    borderRadius: 10,
    padding: 5,
    marginBottom:10,
  },
  card: {
    backgroundColor: "#fff",
    width: width * 0.38,
    marginHorizontal: 10,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    elevation: 4,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: "contain",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 5,
  },
  button: {
    color: "#007BFF",
    fontWeight: "500",
    fontSize: 14,
  },
});
