import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import DoctorCarousel from "../components/DoctorCarousel";
import BottomNav from "../components/BottomNav";
import Speciality from "../components/Speciality";
import Availability from "../components/Availability";
import FAQSection from "../components/Faqsection";
import AppointmentBooking from "../components/AppointmentScreen";
import DoctorDashboard from "../components/DoctorDashboard";

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.side}>
          <Image
            source={require("../assets/sachin-khadka-84xJL3twcUk-unsplash.jpg")}
            style={styles.logo}
          />
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>Innovitals</Text>
        </View>
        <TouchableOpacity
          style={styles.side}
          onPress={() => navigation.navigate("Menu")}
        >
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <DoctorCarousel></DoctorCarousel>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.buttonBox}
            onPress={() => navigation.navigate("Menu")}
          >
            <Text style={styles.buttonText}>Instant Consultation</Text>
            <Image
              source={require("../assets/favicon.png")}
              style={styles.bboximg}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonBox}
            onPress={() => navigation.navigate("Menu")}
          >
            <Text style={styles.buttonText}>Hospitals Near Me</Text>
            <Image
              source={require("../assets/icon.png")}
              style={styles.bboximg}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.ambulanceButton}>
          <Text style={styles.ambulanceText}>🚨 Need Ambulance 🚨</Text>
        </TouchableOpacity>

        <Speciality></Speciality>
        <Availability></Availability>
        <FAQSection></FAQSection>
        <AppointmentBooking></AppointmentBooking>
        <DoctorDashboard></DoctorDashboard>

      </ScrollView>
      <BottomNav></BottomNav>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: { flex: 1, },
  img: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ccc",
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
  },
  header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 12,
  paddingVertical: 25,
  backgroundColor: "#fff",
},
side: {
  width: 40,
  alignItems: "center",
  justifyContent: "center",
},

center: {
  flex: 1,
  alignItems: "center",
},
title: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#333",
},

logo: {
  width: 30,
  height: 30,
  borderRadius: 15,
},

menuIcon: {
  fontSize: 24,
  color: "#333",
},
  scrollContent: { padding: 20 },
  sectionTitle: { fontSize: 20, marginBottom: 10, fontWeight: 80 },
  doctorCard: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    marginBottom: 20,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    backgroundColor: "#bbb",
    borderRadius: 25,
    marginRight: 15,
  },
  doctorInfo: { justifyContent: "center" },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonBox: {
    width: "48%",
    backgroundColor: "lightblue",
    padding: 15,
    borderRadius: 10,
    height: 200,
  },
  buttonText: { fontSize: 16, textAlign: "center" },
  ambulanceButton: {
    backgroundColor: "lightblue",
    padding: 50,
    borderRadius: 10,
  },
  ambulanceText: { fontSize: 18, textAlign: "center", color: "black" },
  bboximg: {
    marginTop: 5,
    borderRadius: 25,
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
});
