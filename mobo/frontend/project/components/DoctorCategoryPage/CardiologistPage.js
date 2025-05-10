import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const doctors = [
  {
    name: "Dr. Anjali Mehta",
    experience: 10,
    distance: 0.5,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    location: {
      longitude: 77.1025,
      latitude: 28.7041,
    },
  },
  {
    name: "Dr. Rajiv Sharma",
    experience: 8,
    distance: 2,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    location: {
      longitude: 77.1025,
      latitude: 28.7041,
    },
  },
  {
    name: "Dr. Sneha Kapoor",
    experience: 12,
    distance: 5,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    location: {
      longitude: 77.1025,
      latitude: 28.7041,
    },
  },
];

const CardiologistPage = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.searchBar}>Cardiologist</Text>
      <Text style={styles.locationText}>Near your location</Text>

      {doctors.map((doc, index) => (
        <View key={index} style={styles.card}>
          <Image source={{ uri: doc.image }} style={styles.avatar} />
          <View style={styles.details}>
            <Text style={styles.name}>{doc.name}</Text>
            <Text style={styles.info}>
              {doc.experience} years of experience
            </Text>
            <Text style={styles.info}>{doc.distance} km away</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("ScheduleComponent", { doctor: doc })
              }
            >
              <Text style={styles.buttonText}>Book My Slot</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 15,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginVertical: 2,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#4DA9E9",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default CardiologistPage;
