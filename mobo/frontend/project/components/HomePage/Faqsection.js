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
    // {
    //   title: 'Corporate Benefits',
    //   subItems: [
    //     { label: 'Applicability to Families', navigateTo: 'CorporateBenefitsFamilies' },
    //     // Add more sub-items related to Corporate Benefits
    //   ],
    // },
    // {
    //   title: 'Practo Doctors',
    //   subItems: [
    //     { label: 'Qualification for Online Consultations', navigateTo: 'PractoQualification' },
    //     // Add more sub-items related to Practo Doctors
    //   ],
    // },
    // {
    //   title: 'Doctor Consultation',
    //   subItems: [
    //     { label: 'Choice of Doctor', navigateTo: 'DoctorChoice' },
    //     { label: 'Types of Consultations', navigateTo: 'ConsultationTypes' },
    //     { label: 'How Online Consultations Work', navigateTo: 'HowItWorks' },
    //     { label: 'In-Person Visits', navigateTo: 'InPersonVisits' },
    //   ],
    // },
    // {
    //   title: 'Innovitals',
    //   subItems: [
    //     { label: 'About Innovitals', navigateTo: 'InnovitalsAbout' },
    //     { label: 'Contact Us', navigateTo: 'InnovitalsContact' },
    //   ],
    // },
    {
      title: 'For Professionals',
      subItems: [
        { label: 'For Doctors', navigateTo: 'ForDoctors' },
        // Add more sub-items for professionals
      ],
    },
    {
      title: 'For Patients',
      subItems: [
        { label: 'Patient Services', navigateTo: 'ForPatients' },
        // Add more sub-items for patients
      ],
    },
    {
      title: 'Contact us',
      subItems: [
        { label: 'About Innovitals', navigateTo: 'InnovitalsAbout' },
        { label: 'Contact Us', navigateTo: 'InnovitalsContact' },
      ],
    },
    // Add more main FAQ headings here
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