import React from 'react';
import { Linking, Button } from 'react-native';

const WhatsAppButton = ({ phone, message }) => {
  const openWhatsApp = () => {
    const url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => alert('Make sure WhatsApp is installed'));
  };

  return <Button title="Contact on WhatsApp" onPress={openWhatsApp} />;
};

export default WhatsAppButton;