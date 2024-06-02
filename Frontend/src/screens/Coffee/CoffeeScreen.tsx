import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Coffee {
  id: number;
  coffeeName: string;
  coffeeDescription: string;
  origin: number;
  roastery: number;
  beantype: number;
  roastdate: string | null;
  processing: string;
}

const CoffeeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const response = await fetch('http://10.137.31.117:8080/api/coffees', {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Coffee[] = await response.json();
        setCoffees(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchCoffees();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddCoffee = () => {
    navigation.navigate('AddCoffee');
  };

  const handleClickOnCoffee = () => {
    navigation.navigate('CoffeeProfileScreen');
  };

  const handleClickSearchIcon = () => {
    console.log("clicked");
    navigation.navigate('Filter');
  };

  const filteredCoffees = coffees.filter(coffee =>
    coffee.coffeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCoffee = ({ item }: { item: Coffee }) => (
    <TouchableOpacity style={styles.beanCard} onPress={handleClickOnCoffee}>
      {/* Hier können Sie das Image und die Details des Kaffees rendern */}
      <Image source={require('../../assets/jacobs_coffee.png')} style={styles.beanImage} />
      <Text style={styles.beanName}>{item.coffeeName}</Text>
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
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.coffeeBeansContainer}
      />
     <TouchableOpacity style={[styles.addButton, { right: 70 }]} onPress={handleClickSearchIcon}>
  <Image source={require('../../assets/filter_icon.png')} style={styles.filterIcon} />
</TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleAddCoffee}>
        <Image source={require('../../assets/plus_icon.png')} style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );
};

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
  filterIcon: {
    top: 4,
    width: 24,
    height: 24,
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
