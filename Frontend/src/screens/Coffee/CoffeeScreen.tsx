import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Coffee {
  id: string;
  name: string;
  address: string;
  logoUrl: string;
}

const dummyCoffees: Coffee[] = [
  { id: '1', name: 'Espresso', address: 'Cafe 1', logoUrl: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Latte', address: 'Cafe 2', logoUrl: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Cappuccino', address: 'Cafe 3', logoUrl: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Americano', address: 'Cafe 4', logoUrl: 'https://via.placeholder.com/150' },
];

const CoffeeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddCoffee = () => {
    navigation.navigate('AddCoffee');
  };

  const filteredCoffees = dummyCoffees.filter(coffee =>
    coffee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCoffee = ({ item }: { item: Coffee }) => (
    <TouchableOpacity style={styles.beanCard}>
      <Image source={{ uri: item.logoUrl }} style={styles.beanImage} />
      <Text style={styles.beanName}>{item.name}</Text>
      <Text style={styles.beanAddress}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIconContainer} onPress={handleBack}>
        <Image source={require('../../assets/back_icon.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Kaffees</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Image source={require('../../assets/search_icon.png')} style={styles.searchIcon} />
      </View>
      <FlatList
        data={filteredCoffees}
        renderItem={renderCoffee}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.coffeeBeansContainer}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddCoffee}>
        <Image source={require('../../assets/plus_icon.png')} style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );
};

// STYLES

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  backIconContainer: {
    position: 'absolute',
    top: 55,
    left: 30,
    zIndex: 1,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 40, // Padding for the search icon
    backgroundColor: '#F2F2F2',
    borderColor: '#F2F2F2',
    color: '#663300',
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
    width: 20,
    height: 20,
    marginRight: 10
  },
  coffeeBeansContainer: {
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  beanCard: {
    backgroundColor: '#FFF',
    flex: 1,
    margin: 5,
    padding: 20,
    paddingBottom: 30,
    paddingTop: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  beanImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  beanName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  beanAddress: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 10,
  },
  plusIcon: {
    width: 30,
    height: 30,
  },
});

export default CoffeeScreen;
