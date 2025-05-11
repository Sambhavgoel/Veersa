import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you are using React Navigation

const FAQHeading = ({ title, subItems, onPress }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.faqHeadingContainer}>
      <TouchableOpacity style={styles.heading} onPress={toggleOpen}>
        <Text style={styles.headingText}>{title}</Text>
        <Text style={styles.arrow}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.subItemsContainer}>
          {subItems.map((subItem, index) => (
            <TouchableOpacity
              key={index}
              style={styles.subItem}
              onPress={() => onPress(subItem.navigateTo)}
            >
              <Text style={styles.subItemText}>{subItem.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const FAQSection = () => {
  const navigation = useNavigation();

  const faqData = [
    {
      title: 'How do I book an appointment with a doctor ?',
      subItems: [
        { label: 'You can search for a doctor by speciality, location, availability and book a slot instantly' },
        
      ],
    },
    {
      title: 'Can I consult doctors online ?',
      subItems: [
        { label: 'Yes you can connect with doctors via chat consultations with the app' },
      ],
    },
    {
      title: 'How can I request an ambulance ?',
      subItems: [
        { label: 'Tap the emergency ambulance button to automatically locate and connect with the nearest ambulance services' },
      ],
    },
    {
      title: 'How can I contact support ?',
      subItems: [
        // { label: 'About Innovitals', navigateTo: 'InnovitalsAbout' },
        { label: 'Go to the contact us section in the app and fill out the form- we will get back to you within 24 hours.', navigateTo: 'InnovitalsContact' },
      ],
    },

  ];

  const handleNavigation = (navigateTo) => {
    if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      {faqData.map((item, index) => (
        <FAQHeading
          key={index}
          title={item.title}
          subItems={item.subItems}
          onPress={handleNavigation}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  faqHeadingContainer: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 12,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  headingText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  arrow: {
    fontSize: 16,
    marginLeft: 10,
  },
  subItemsContainer: {
    marginTop: 8,
    paddingLeft: 16,
  },
  subItem: {
    paddingVertical: 8,
  },
  subItemText: {
    fontSize: 14,
    color: '#555',
  },
});

export default FAQSection;