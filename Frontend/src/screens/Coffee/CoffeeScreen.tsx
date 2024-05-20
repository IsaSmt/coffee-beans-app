import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importiere den Hook

interface Coffee {
  id: string;
  name: string;
  address: string;
  logoUrl: string;
}

const CoffeeScreen: React.FC<{ coffee: Coffee[] }> = ({ coffee }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigation = useNavigation(); // Hole das Navigationsobjekt mit dem Hook

  const handleAddCoffee = () => {
    navigation.navigate('AddCoffee'); // Navigiere zum "AddCoffee" Bildschirm
  };

  return (
    <View style={styles.container}>
      {/* Plus-Symbol oben rechts */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddCoffee}>
        <Image source={require('../../assets/plus_icon.png')} style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  addButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 10,
    paddingTop: 40
  },
  plusIcon: {
    width: 24,
    height: 24,
  },
});

export default CoffeeScreen;
