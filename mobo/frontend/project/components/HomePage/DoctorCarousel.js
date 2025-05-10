import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const { height } = Dimensions.get("window");

const doctors = [
  {
    id: "1",
    name: "Dr. Jane Smith",
    hospital: "City Children's Hospital",
    specialty: "Pediatrician",
    experience: "10 years",
    image: require("../../assets/adaptive-icon.png"),
  },
  {
    id: "2",
    name: "Dr. Mark Lee",
    hospital: "NeuroCare Clinic",
    specialty: "Neurologist",
    experience: "12 years",
    image: require("../../assets/favicon.png"),
  },
  {
    id: "3",
    name: "Dr. Aisha Khan",
    hospital: "DermaGlow Center",
    specialty: "Dermatologist",
    experience: "8 years",
    image: require("../../assets/sachin-khadka-84xJL3twcUk-unsplash.jpg"),
  },
];

const DoctorCarousel = () => {
  const flatListRef = useRef();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % doctors.length;
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [index]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>🏥 {item.hospital}</Text>
        <Text style={styles.desc}>🔬 {item.specialty}</Text>
        <Text style={styles.desc}>📆 {item.experience}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.all}>
        <Text style={styles.sectionTitle}>Available Doctors</Text>
        <FlatList
          ref={flatListRef}
          data={doctors}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={false}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          style={{ height: 180 }}
        />
      </View>
    </>
  );
};

export default DoctorCarousel;

const styles = StyleSheet.create({
    all:{
        backgroundColor: "lightblue",
        padding:5,
        borderRadius:15,
        marginBottom:10,
    },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 80,

  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightblue",
    borderRadius: 15,
    marginVertical: 10,
    padding: 15,
    height: 160,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  desc: {
    fontSize: 14,
    marginBottom: 3,
  },
  button: {
    backgroundColor: "#4285F4",
    paddingVertical: 6,
    borderRadius: 5,
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});
