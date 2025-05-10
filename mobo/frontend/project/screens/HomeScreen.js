import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  Animated,
  Dimensions
} from "react-native";

import DoctorCarousel from "../components/HomePage/DoctorCarousel";
import BottomNav from "../components/HomePage/BottomNav";
import Speciality from "../components/HomePage/Speciality";
import Availability from "../components/HomePage/Availability";
import FAQSection from "../components/HomePage/Faqsection";
import ConnectCards from "../components/HomePage/ConnectCards";

const screenWidth = Dimensions.get("window").width;

const HomePage = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  return (
    <SafeAreaView style={styles.wholecontainer}>
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
          <TouchableOpacity style={styles.side} onPress={openMenu}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* Scrollable content */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <DoctorCarousel />
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

          <Speciality />
          <Availability />
          <ConnectCards />
          <FAQSection />
          
        </ScrollView>

        <BottomNav />

        {/* Slide-in Hamburger Menu */}
        {menuVisible && (
          <Animated.View style={[styles.menuOverlay, { transform: [{ translateX: slideAnim }] }]}>
            <View style={styles.menuContent}>
              <TouchableOpacity onPress={closeMenu}>
                <Text style={styles.closeText}>✕ Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  closeMenu();
                  navigation.navigate("AmbulanceHomeScreen");
                }}
              >
                <Text style={styles.menuItem}>Ambulance</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  closeMenu();
                  navigation.navigate("Appointment");
                }}
              >
                <Text style={styles.menuItem}>Appointment</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => {
                  closeMenu();
                  navigation.navigate("Emergency");
                }}
              >
                <Text style={styles.menuItem}>Emergency</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  closeMenu();
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.menuItem}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  closeMenu();
                  navigation.navigate("DoctorCategoryPage");
                }}
              >
                <Text style={styles.menuItem}>Doctors</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  wholecontainer: { flex: 1, paddingBottom: 40 },
  container: { flex: 1 },
  logo: { width: 30, height: 30, borderRadius: 15, resizeMode: "cover" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 25,
    backgroundColor: "#fff",
  },
  side: { width: 40, alignItems: "center", justifyContent: "center" },
  center: { flex: 1, alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", color: "#333" },
  menuIcon: { fontSize: 24, color: "#333" },
  scrollContent: { padding: 20 },
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

  // Hamburger styles
  menuOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#fff",
    zIndex: 100,
    elevation: 5,
  },
  menuContent: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 15,
    fontWeight: "500",
    color: "#333",
  },
  closeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "flex-end",
  },
});
