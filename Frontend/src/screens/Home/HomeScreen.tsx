import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types'; // Adjust the import according to your project structure

interface Roastery {
  id: string;
  name: string;
  address: string;
  logoUrl: string;
}

interface Coffee {
  id: string;
  name: string;
  imageUrl: string;
}

interface HomePageProps {
  roasteries: Roastery[];
  originCountries: string[];
  coffeeBeans: string[];
  coffees: Coffee[];
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomePage: React.FC<Props> = ({ navigation }) => {

  const dummyRoasteries: Roastery[] = [
    { id: '1', name: 'Roastery One', address: '123 Coffee St', logoUrl: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Roastery Two', address: '456 Java Ave', logoUrl: 'https://via.placeholder.com/150' },
  ];

  const dummyOriginCountries: string[] = [
    'Brazil', 'Colombia', 'Ethiopia'
  ];

  const dummyCoffeeBeans: string[] = [
    'https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'
  ];

  const dummyCoffees: Coffee[] = [
    { id: '1', name: 'Espresso', imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Latte', imageUrl: 'https://via.placeholder.com/150' },
  ];

  const renderRoastery = ({ item }: { item: Roastery }) => (
    <TouchableOpacity onPress={() => handleClickRoastery(item)}>
      <View style={styles.card}>
        <Image source={{ uri: item.logoUrl }} style={styles.logo} />
        <Text style={styles.roasteryName}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCountry = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleClickCountryOfOrigin(item)}>
      <View style={styles.tag}>
        <Text style={styles.tagText}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCoffeeBean = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleClickCoffeeBean(item)}>
      <View style={styles.beanCard}>
        <Image source={{ uri: item }} style={styles.beanImage} />
        <Text style={styles.beanName}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCoffee = ({ item }: { item: Coffee }) => (
    <TouchableOpacity onPress={() => handleClickCoffee(item)}>
      <View style={styles.coffeeCard}>
        <Image source={{ uri: item.imageUrl }} style={styles.coffeeImage} />
        <Text style={styles.coffeeName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleClickRoastery = (item: any) => {
    console.log("clicked");
    navigation.navigate('Roastery');
  };

  const handleClickCountryOfOrigin = (item: any) => {
    console.log("clicked");
    navigation.navigate('CountryOfOrigin');
  };

  const handleClickCoffee = (item: any) => {
    console.log("clicked");
    navigation.navigate('Coffee');
  };

  const handleClickCoffeeBean = (item: any) => {
    console.log("clicked");
    navigation.navigate('CoffeeBean');
  };

  const handleClickSearchIcon = () => {
    console.log("clicked");
    navigation.navigate('Search');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Röstereien</Text>
          <TouchableOpacity onPress={handleClickSearchIcon} style={styles.filterButton}>
            <Image source={require('../../assets/filter_icon.svg')} style={styles.filterIcon} />
          </TouchableOpacity>
        </View>
        {/* Hier beginnt der scrollbare Bereich */}
        <FlatList
          horizontal
          data={dummyRoasteries}
          renderItem={renderRoastery}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={true}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Herkunftsländer</Text>
          <FlatList
            horizontal
            data={dummyOriginCountries}
            renderItem={renderCountry}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={true}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kaffeebohnen</Text>
          <FlatList
            horizontal
            data={dummyCoffeeBeans}
            renderItem={renderCoffeeBean}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={true}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kaffees</Text>
          <FlatList
            horizontal
            data={dummyCoffees}
            renderItem={renderCoffee}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={true}
          />
        </View>
        {/* Hier endet der scrollbare Bereich */}
      </ScrollView>
    </View>
  );
};

// STYLES

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#FFF',
    paddingLeft: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  filterButton: {
    padding: 5,
    paddingRight: 10
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  section: {
    marginVertical: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  card: {
    backgroundColor: '#FFF',
    paddingHorizontal: 80,
    paddingVertical: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginRight: 10,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 5
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5
  },
  roasteryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  address: {
    fontSize: 12,
    color: '#777'
  },
  tag: {
    backgroundColor: '#EFEFEF',
    paddingVertical: 40,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 5
  },
  tagText: {
    color: '#555'
  },
  beanCard: {
    backgroundColor: '#FFF',
    paddingHorizontal: 5,
    paddingVertical: 80,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    marginTop: 5
  },
  beanImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5
  },
  beanName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  coffeeCard: {
    backgroundColor: '#FFF',
    padding: 20,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingVertical: 0,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    marginTop: 5
  },
  coffeeImage: {
    width: 80,
    height: 80,
    marginBottom: 5
  },
  coffeeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
});

export default HomePage;
