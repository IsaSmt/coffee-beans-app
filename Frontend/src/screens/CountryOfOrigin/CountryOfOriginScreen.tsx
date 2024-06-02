import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CountryOfOrigin {
  id: string;
  originCountry: string;
}

const CountryOfOriginScreen: React.FC = () => {
  const [countries, setCountries] = useState<CountryOfOrigin[]>([]);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://10.137.31.117:8080/api/origins', {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: CountryOfOrigin[] = await response.json();
        console.log(data);
        setCountries(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectCountry = (countryName: string) => {
   
  };

  const filteredCountries = countries.filter(country =>
    country.originCountry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCountry = ({ item }: { item: CountryOfOrigin }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSelectCountry(item.originCountry)}>
      <Text style={styles.name}>{item.originCountry}</Text>
    </TouchableOpacity>
  );

  const handleAddCountry = () => {
    navigation.navigate('AddCountry'); // Ensure this name matches the registered screen name
  };

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
      <TouchableOpacity style={styles.addButton} onPress={handleAddCountry}>
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

export default CountryOfOriginScreen;
