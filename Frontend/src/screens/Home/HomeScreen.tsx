import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
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
  imageUrl: string | number;
}

interface CoffeeBean {
  id: string;
  name: string;
  imageUrl: string | number;
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomePage: React.FC<Props> = ({ navigation }) => {

  const dummyRoasteries = [
    { id: '1', name: 'The Barn', address: 'Alte Potsdamer Str. 5\n10785 Berlin', logoUrl: require('../../assets/blend_roastery_icon.png') },
    { id: '2', name: 'Five Elephant', address: 'Schwedter Str. 11\n10119 Berlin', logoUrl: require('../../assets/five_elephant_icon.png') },
    { id: '3', name: 'JB Kaffee', address: 'Mörtlstrasse 5A\n85254 München', logoUrl: require('../../assets/jb_coffee_icon.png') },
    { id: '4', name: 'The Barn', address: 'Alte Potsdamer Str. 5\n10785 Berlin', logoUrl: require('../../assets/the_barn_icon.png') },
  ];

  const dummyOriginCountries: string[] = [
    'Brazil', 'Colombia', 'Ethiopia'
  ];

  const dummyCoffeeBeans: CoffeeBean[] = [
    { id: '1', name: 'Arabica', imageUrl: require('../../assets/arabica_bean.png') },
    { id: '2', name: 'Robusta', imageUrl: require('../../assets/robusta_bean.png') },
    { id: '3', name: 'Liberica', imageUrl: require('../../assets/arabica_bean.png') },
    { id: '4', name: 'Excelsa', imageUrl: require('../../assets/robusta_bean.png') },
  ];

  const dummyCoffees: Coffee[] = [
    { id: '1', name: 'Espresso', imageUrl: require('../../assets/hochland_coffee.png') },
    { id: '2', name: 'Latte', imageUrl: require('../../assets/jacobs_coffee.png') },
  ];

  const renderRoastery = ({ item }: { item: Roastery }) => (
    <TouchableOpacity onPress={() => handleClickRoastery(item)}>
      <View style={styles.card}>
        <View style={styles.roasteryInfo}>
          <Text style={styles.roasteryName}>{item.name}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </View>
        <Image source={item.logoUrl} style={styles.logo} />
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

  const renderCoffeeBean = ({ item }: { item: CoffeeBean }) => (
    <TouchableOpacity onPress={() => handleClickCoffeeBean(item)}>
      <View style={styles.beanCard}>
        <ImageBackground source={item.imageUrl} style={styles.beanImageBackground} imageStyle={{ borderRadius: 10 }}>
          <View style={styles.beanContent}>
            <Text style={styles.beanName}>{item.name}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );

  const renderCoffee = ({ item }: { item: Coffee }) => (
    <TouchableOpacity onPress={() => handleClickCoffee(item)}>
      <View style={styles.coffeeCard}>
        <Image source={item.imageUrl} style={styles.coffeeImage} />
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
    navigation.navigate('Filter');
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
            keyExtractor={(item) => item.id}
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
    padding: 10,
    paddingTop: 40,
    backgroundColor: '#FFF',
    paddingLeft: 20,
    marginTop: 20
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
    marginRight: 15
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
    flexDirection: 'row', // Align children horizontally
    alignItems: 'center', // Align children vertically
    paddingHorizontal: 16,
    paddingVertical: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginRight: 10,
    marginBottom: 5,
    },
    logo: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16, // Add spacing between logo and text
      marginLeft: 30
    },
    roasteryInfo: {
      flex: 1, // Take up remaining space
    },
    roasteryName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    address: {
      fontSize: 14,
      color: '#777',
    },
    tag: {
      backgroundColor: '#EFEFEF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      marginRight: 10,
      marginBottom: 10,
      marginTop: 5,
    },
    tagText: {
      color: '#555',
    },
    beanCard: {
      backgroundColor: '#FFF',
      flex: 1,
      margin: 5,
      paddingBottom: 30,
      borderRadius: 10, // Rounded corners
      shadowColor: '#F2F2F2',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      alignItems: 'center',
      overflow: 'hidden', // Ensure the ImageBackground stays within bounds
    },
    beanContent: {
      backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent background for text and heart icon
      padding: 20,
      borderRadius: 10,
      alignItems: 'flex-start', // Align text to the left
      alignSelf: 'flex-end', // Push text to the bottom
    },
    beanName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#F2F2F2',
      marginTop: 10,
      alignSelf: 'flex-start', // Align text to the left
      marginBottom: 10 // Add space at the bottom
    },
    beanImageBackground: {
      width: '100%',
      height: 150, // Set a fixed height
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10, // Rounded corners
    },
    coffeeCard: {
      backgroundColor: '#FFF',
      padding: 20,
      paddingHorizontal: 30,
      paddingTop: 30,
      paddingBottom: 30,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
      alignItems: 'center',
      marginRight: 10,
      marginBottom: 10,
      marginTop: 5,
    },
    coffeeImage: {
      width: 80,
      height: 80,
      marginBottom: 5,
    },
    coffeeName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
    },
    likeButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    likeIcon: {
      width: 20,
      height: 20,
    },
  });
  
  export default HomePage;
  