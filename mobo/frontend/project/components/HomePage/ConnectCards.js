import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 60) / 3; // space for padding and margins

const ConnectCards = () => {
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Card 1 */}
      <View style={styles.card}>
        <Text style={styles.text}>hospitals{"\n"}connect{"\n"}with us</Text>
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => handleNavigate('Hospitals')}
        >
          <Text style={styles.exploreText}>Explore more</Text>
          <Icon name="arrow-right" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Card 2 */}
      <View style={styles.card}>
        <Text style={styles.text}>doctors{"\n"}connect{"\n"}with us</Text>
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => handleNavigate('Doctors')}
        >
          <Text style={styles.exploreText}>Explore more</Text>
          <Icon name="arrow-right" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Card 3 */}
      <View style={styles.card}>
        <Text style={styles.text}>people{"\n"}connect{"\n"}with us</Text>
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => handleNavigate('People')}
        >
          <Text style={styles.exploreText}>Explore more</Text>
          <Icon name="arrow-right" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "lightblue",
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 20,
    marginBottom: 10,
    
  },
  card: {
    
    width: cardWidth,
    height: 180,
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
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  exploreText: {
    color: '#007AFF',
    fontSize: 13,
    marginRight: 4,
  },
});

export default ConnectCards;
