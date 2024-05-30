import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CoffeeBean { 
  id: string;
  name: string;
  imageUrl: string;
}

const dummyCoffeeBeans: CoffeeBean[] = [
  { id: '1', name: 'Arabica', imageUrl: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Robusta', imageUrl: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Liberica', imageUrl: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Excelsa', imageUrl: 'https://via.placeholder.com/150' },
];

const CoffeeBeansScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddCoffeeBean = () => {
    navigation.navigate('AddCoffeeBean'); // Ensure this name matches the registered screen name
  };

  const filteredCoffeeBeans = dummyCoffeeBeans.filter(bean =>
    bean.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCoffeeBean = ({ item }: { item: CoffeeBean }) => (
    <TouchableOpacity style={styles.beanCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.beanImage} />
      <Text style={styles.beanName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIconContainer} onPress={handleBack}>
        <Image source={require('../../assets/back_icon.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Kaffeebohnen</Text>
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
        data={filteredCoffeeBeans}
        renderItem={renderCoffeeBean}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.coffeeBeansContainer}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddCoffeeBean}>
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
    paddingBottom: 60,
    paddingTop: 60,
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

export default CoffeeBeansScreen;
