import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const Contact = ({ navigation }) => {
  const [interest, setInterest] = useState(
    "Creating a free profile on Practo.com"
  );
  const [city, setCity] = useState("Bengaluru");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contact us</Text>
        <Text style={styles.subtitle}>
          Have questions about our products, support services, or anything else?
          Let us know and we’ll get back to you.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact us</Text>
        <Text style={styles.label}>Interested in</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={interest}
            onValueChange={(itemValue) => setInterest(itemValue)}
          >
            <Picker.Item label="Appointment Query" value="Appointment Query" />
            <Picker.Item label="Location Query" value="Location Query" />
            <Picker.Item label="Ambulance Query" value="Ambulance Query" />
            <Picker.Item label="Payment Query" value="Paymnet Query" />
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert(
              "Query Submitted",
              "We will get back to you within 24 hours.",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("HomeScreen"), // 👈 navigate after alert
                },
              ]
            );
          }}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our branches</Text>
        <Text style={styles.label}>City</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue) => setCity(itemValue)}
          >
            <Picker.Item label="Ghaziabad" value="Bengaluru" />
            {/* Add more cities as needed */}
          </Picker>
        </View>

        <Card style={styles.card}>
          <Text style={styles.cityTitle}>Ghaziabad</Text>
          <Text style={styles.link}>Get Directions</Text>
          <Text style={styles.address}>
            Crossings Republik,{"\n"}Ghaziabad,{"\n"}Uttar Pradesh{"\n"}Pin Code
            : 201009
          </Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginVertical: 50,
  },
  header: {
    backgroundColor: "#2C3192",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#00B9F5",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    elevation: 1,
  },
  cityTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#00B9F5",
    fontWeight: "bold",
    marginVertical: 5,
  },
  address: {
    color: "#333",
  },
});

export default Contact;
