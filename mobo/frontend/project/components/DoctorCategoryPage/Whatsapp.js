import React from 'react';
import { Linking, Button, Image, TouchableOpacity, View, Alert } from 'react-native';

const Whatsapp = ({ phone, message }) => {
  const openWhatsApp = () => {
    const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Make sure WhatsApp is installed');
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={openWhatsApp}>
        <Image 
          source={{ uri: 'https://i.pinimg.com/736x/18/46/74/1846740d0dfe3c5e4bc227bbb36d009d.jpg' }}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
      {/* <Button title="Contact on WhatsApp" onPress={openWhatsApp} /> */}
    </View>
  );
};

export default Whatsapp;
