import React from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const RazorpayWebViewPayment = ({ route, navigation }) => {
  const { doctor, appointmentDate, appointmentSlot } = route.params;

  const amountInPaise = 50000; // ₹500.00, change as needed

  const razorpayOptions = {
    key: 'rzp_test_meSDnGTZeI5qCq', // Replace with your Razorpay API key
    amount: amountInPaise,
    currency: 'INR',
    name: doctor.name,
    description: `Appointment on ${appointmentDate} at ${appointmentSlot}`,
    prefill: {
      email: 'patient@example.com',
      contact: '9876543210',
    },
    theme: {
      color: '#3399cc',
    },
  };

  const htmlContent = `
    <html>
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body>
        <script>
          var options = ${JSON.stringify(razorpayOptions)};
          options.handler = function (response) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ success: true, response }));
          };
          options.modal = {
            ondismiss: function() {
              window.ReactNativeWebView.postMessage(JSON.stringify({ success: false }));
            }
          };
          var rzp = new Razorpay(options);
          rzp.open();
        </script>
      </body>
    </html>
  `;

  const onMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.success) {
        Alert.alert('Payment Successful', `Payment ID: ${data.response.razorpay_payment_id}`);
        navigation.goBack();
      } else {
        Alert.alert('Payment Cancelled', 'User dismissed the Razorpay popup.');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to process payment.');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        onMessage={onMessage}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical:50,
  },
});

export default RazorpayWebViewPayment;
