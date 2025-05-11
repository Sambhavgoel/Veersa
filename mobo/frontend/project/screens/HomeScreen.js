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
  Dimensions,
  Linking
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

  const openWhatsApp = () => {
      const url = `whatsapp://send?phone=${+919205726389}&text=${"Write your problem"}`;
      Linking.openURL(url).catch(() => {
        Alert.alert('Error', 'Make sure WhatsApp is installed');
      });
  }

  return (
    <SafeAreaView style={styles.wholecontainer}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.side}>
            <Image
              source={require("../assets/WhatsApp Image 2025-05-11 at 01.02.08.jpeg")}
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
              onPress={openWhatsApp}
            >
              <Text style={styles.buttonText}>Instant Consultation</Text>
              <Image
                source={require("../assets/WhatsApp Image 2025-05-11 at 17.34.24 (2).jpeg")}
                style={styles.bboximg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonBox}
              onPress={() => navigation.navigate("HospitalsNearme")}
            >
              <Text style={styles.buttonText}>Hospitals Near Me</Text>
              <Image
                source={require("../assets/WhatsApp Image 2025-05-11 at 17.34.23 (1).jpeg")}
                style={styles.bboximg}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.ambulanceButton} onPress={()=>navigation.navigate("AmbulanceHomeScreen")}>
            <Text style={styles.ambulanceText}><Image style={styles.img} source={require("../assets/WhatsApp Image 2025-05-11 at 17.34.25.jpeg")}/> 
            Emergency Ambulance <Image style={styles.img} source={require("../assets/WhatsApp Image 2025-05-11 at 17.34.25.jpeg")}/> </Text>
          </TouchableOpacity>

          <Speciality />
          <Availability />
          <ConnectCards />
          <FAQSection />
          
        </ScrollView>

        <BottomNav navigation={navigation} />


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
                <Text style={styles.menuItem}>Emergency Ambulance</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  closeMenu();
                  navigation.navigate("Reminder");
                }}
              >
                <Text style={styles.menuItem}>My Appointment</Text>
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
                <Text style={styles.menuItem}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  closeMenu();
                  navigation.navigate("DoctorCategoryPage");
                }}
              >
                <Text style={styles.menuItem}>Book a slot</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  closeMenu();
                  navigation.navigate("Contact");
                }}
              >
                <Text style={styles.menuItem}>Contact Us</Text>
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
  container: { flex: 1,backgroundColor: "#fff", },
  logo: { width: 60, height: 60, borderRadius: 15, resizeMode: "cover" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "white",
    marginTop:40,
  },
  side: { width: 80, alignItems: "center", justifyContent: "center" },
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
  img:{
    borderRadius:50,
    width:40,
    height:40,
  },
  buttonText: { fontSize: 16, textAlign: "center" },
  ambulanceButton: {
    backgroundColor: "lightblue",
    paddingHorizontal: 20,
    paddingVertical:50,
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
