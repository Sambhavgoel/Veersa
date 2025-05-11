import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';

const doctors = [
  {
    name: 'Cardiologist',
    Page: 'CardiologistPage',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Orthopedic',
    Page: 'OrthopedicPage',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Pediatrician',
    Page: 'PediatricianPage',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Psychiatrist',
    Page: 'PsychiatristPage',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
  {
    name: 'Dermatologist',
    Page: 'DermatologistPage',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    name: 'Dentist',
    Page: 'DentistPage',
    image: 'https://randomuser.me/api/portraits/men/90.jpg',
  },
];

const DoctorCategoryPage = ({navigation}) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => {
                  navigation.navigate(`${item.Page}`);
                }}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      {/* <Text style={styles.specialty}>{item.specialty}</Text> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header} placeholderTextColor="#444" >Speciality</Text>
      <FlatList
        data={doctors}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  grid: {
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    height:180,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  specialty: {
    fontSize: 12,
    color: '#555',
  },
});

export default DoctorCategoryPage;
