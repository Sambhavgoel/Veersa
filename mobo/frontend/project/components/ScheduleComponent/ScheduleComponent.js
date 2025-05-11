import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const ScheduleComponent = ({ route }) => {
  const { doctor } = route.params;
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState({});
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const allSlots = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

  const onChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate && selectedDate >= new Date().setHours(0, 0, 0, 0)) {
      setDate(selectedDate);
      setSelectedSlot(null);
    } else {
      Alert.alert("Invalid Date", "You cannot select a past date.");
    }
  };

  const getFormattedDate = (d) => d.toISOString().split("T")[0];

  const availableSlots = allSlots.filter(
    (slot) => !(bookedSlots[getFormattedDate(date)] || []).includes(slot)
  );

  const handlePayNow = () => {
    if (!selectedSlot) {
      Alert.alert(
        "No Slot Selected",
        "Please select a slot before continuing."
      );
      return;
    }

    navigation.navigate("RazorpayWebViewPayment", {
      doctor,
      appointmentDate: date.toDateString(),
      appointmentSlot: selectedSlot,
      onPaymentSuccess: () => {
        const dateKey = getFormattedDate(date);
        setBookedSlots((prev) => ({
          ...prev,
          [dateKey]: [...(prev[dateKey] || []), selectedSlot],
        }));
        setPaymentSuccessful(true);
      },
    });
  };

  const showBookingConfirmationAlert = () => {
    if (selectedSlot) {
      const dateKey = getFormattedDate(date);
      setBookedSlots((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), selectedSlot],
      }));
      setPaymentSuccessful(true);

      Alert.alert(
        "Booking Successful!",
        `Now slot has been booked successfully\nDoctor Name: ${
          doctor.name
        }\nDate: ${date.toDateString()}\nTime: ${selectedSlot}\nLocation: ${
          doctor.location.longitude || "Not specified"
        } , ${doctor.location.latitude || "Not specified"}`,
        [
          {
            text: "OK",
            onPress: () => {
              setPaymentSuccessful(false);
              setSelectedSlot(null);
            },
          },
        ]
      );
    } else if (paymentSuccessful && !selectedSlot) {
      Alert.alert(
        "Payment Successful!",
        `Your slot has been booked successfully\nDoctor Name: ${
          doctor.name
        }\nDate: ${date.toDateString()}\nTime: Not selected\nLocation: ${
          doctor.location || "Not specified"
        }`,
        [
          {
            text: "OK",
            onPress: () => {
              setPaymentSuccessful(false);
            },
          },
        ]
      );
    } else if (!selectedSlot) {
      Alert.alert("Action Needed", "Please select a slot before payment.", [
        { text: "OK" },
      ]);
    } else if (!paymentSuccessful) {
      Alert.alert(
        "Payment Pending",
        "Please complete the payment to confirm your booking.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* <Image source={{ uri: doctor.image }} style={styles.image} /> */}
        <Image source={doctor.image} style={styles.image} />

        <Text style={styles.name}>{doctor.name}</Text>

        <Text style={styles.label}>Calendar</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
          />
        )}

        <Text style={styles.label}>Slots Available</Text>
        <View style={styles.slotsContainer}>
          {availableSlots.length === 0 ? (
            <Text>No slots available for this date.</Text>
          ) : (
            availableSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.slot,
                  selectedSlot === slot && styles.selectedSlot,
                ]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Text
                  style={[
                    styles.slotText,
                    selectedSlot === slot && styles.selectedSlotText,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
          <Text style={styles.payText}>Pay Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.payButton}
          onPress={showBookingConfirmationAlert}
        >
          <Text style={styles.payText}>Payment Successful</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.payButton}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.payText}>Go to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical:30,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginVertical: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  slotsContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  slot: {
    paddingVertical: 10,
    backgroundColor: "#eee",
    marginVertical: 5,
    borderRadius: 6,
    alignItems: "center",
  },
  selectedSlot: {
    backgroundColor: "#4DA9E9",
  },
  slotText: {
    fontSize: 16,
    color: "#333",
  },
  selectedSlotText: {
    color: "#fff",
    fontWeight: "bold",
  },
  payButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  payText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ScheduleComponent;
