import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CountryOfOrigin {
  id: string;
  name: string;
  address: string;
  logoUrl: string;
}

const dummyCountriesOfOrigin: CountryOfOrigin[] = [
  { id: '1', name: 'Brazil', address: 'Sao Paulo', logoUrl: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Colombia', address: 'Bogota', logoUrl: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Ethiopia', address: 'Addis Ababa', logoUrl: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Vietnam', address: 'Hanoi', logoUrl: 'https://via.placeholder.com/150' },
];

const CountryOfOriginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectCountry = (countryName: string) => {
    navigation.navigate('AddCoffee', { selectedCountry: countryName });
  };

  const filteredCountries = dummyCountriesOfOrigin.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCountry = ({ item }: { item: CountryOfOrigin }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSelectCountry(item.name)}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIconContainer} onPress={handleBack}>
        <Image source={require('../../assets/back_icon.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Herkunftsländer</Text>
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
        data={filteredCountries}
        renderItem={renderCountry}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.countriesContainer}
      />
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
  countriesContainer: {
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#F2F2F2',
    flex: 1,
    margin: 5,
    paddingBottom: 35,
    paddingTop: 35,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  address: {
    fontSize: 12,
    color: '#777',
  },
});

export default CountryOfOriginScreen;
