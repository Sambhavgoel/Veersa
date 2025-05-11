import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 65) / 3; // 3 cards with spacing

const ConnectCards = () => {
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Card 1 */}
      <View style={styles.card}>
        <Text style={{fontWeight:"bold",fontSize:20}}>500K+</Text>
        <Text style={styles.text}>{"\n"}Hospital{"\n"}connect{"\n"}with us</Text>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={() => handleNavigate('Hospitals')}
        >
          {/* <Image
            source={require('../../assets/sachin-khadka-84xJL3twcUk-unsplash.jpg')}
            style={styles.image}
          /> */}
        </TouchableOpacity>
      </View>

      {/* Card 2 */}
      <View style={styles.card}>
        <Text style={{fontWeight:"bold",fontSize:20}}>40K+</Text>
        <Text style={styles.text}>{"\n"}Doctors{"\n"}connect{"\n"}with us</Text>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={() => handleNavigate('Doctors')}
        >
          {/* <Image
            source={require('../../assets/favicon.png')}
            style={styles.image}
          /> */}
        </TouchableOpacity>
      </View>

      {/* Card 3 */}
      <View style={styles.card}>
        <Text style={{fontWeight:"bold",fontSize:20}}>200K+</Text>
        <Text style={styles.text}>{"\n"}People{"\n"}connect{"\n"}with us</Text>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={() => handleNavigate('People')}
        >
          {/* <Image
            source={require('../../assets/sachin-khadka-84xJL3twcUk-unsplash.jpg')}
            style={styles.image}
          /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'lightblue',
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  card: {
    width: cardWidth,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  imageButton: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ConnectCards;
