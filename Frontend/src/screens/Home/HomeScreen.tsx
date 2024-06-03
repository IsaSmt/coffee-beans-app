import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';
import React, { useState, useEffect } from 'react';
import { IP } from '../../../config';

interface Roastery {
  id: string;
  roasteryName: string;
  roasteryDescription: string;
  plz: number;
  email: string;
  phone: string;
  street: string;
}

interface Coffee {
  id: string;
  coffeeName: string;
  coffeeDescription: string;
  origin: number;
  roastery: number;
  beantype: number;
  roastdate: string | null;
  processing: string;
}

interface CoffeeBean {
  id: string;
  typeDefintion: string;
  typeExplaination: string;
  imageUrl: string | number;
}

interface Origin {
  id: string;
  originCountry: string;
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomePage: React.FC<Props> = ({ navigation }) => {
  const [roasteries, setRoasteries] = useState<Roastery[]>([]);
  const [coffeeBeans, setCoffeeBeans] = useState<CoffeeBean[]>([]);
  const [origins, setOrigins] = useState<string[]>([]);
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoasteries = async () => {
      try {
        const response = await fetch(`http://${IP}:8080/api/roasteries`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setRoasteries(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCoffeeBeans = async () => {
      try {
        const response = await fetch(`http://${IP}:8080/api/beantypes`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        const combinedData = data.map((bean: CoffeeBean, index: number) => {
          const dummyImages = [
            require('../../assets/arabica_bean.png'),
            require('../../assets/robusta_bean.png'),
          ];

          return {
            ...bean,
            imageUrl: dummyImages[index % dummyImages.length]
          };
        });

        setCoffeeBeans(combinedData);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    const fetchOrigins = async () => {
      try {
        const response = await fetch(`http://${IP}:8080/api/origins`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Origin[] = await response.json();
        console.log(data);
        setOrigins(data.map(origin => origin.originCountry));
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    const fetchCoffees = async () => {
      try {
        const response = await fetch(`http://${IP}:8080/api/coffees`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Coffee[] = await response.json();
        console.log(data);
        setCoffees(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchRoasteries();
    fetchCoffeeBeans();
    fetchOrigins();
    fetchCoffees();
  }, []);

  const renderRoastery = ({ item }: { item: Roastery }) => (
    <TouchableOpacity onPress={() => handleClickRoastery(item)}>
      <View style={styles.card}>
        <View style={styles.roasteryInfo}>
          <Text style={styles.roasteryName}>{item.roasteryName}</Text>
            <Text style={styles.address}>{item.street}</Text>
        </View>
        <Image source={require('../../assets/blend_roastery_icon.png')} style={styles.logo} />
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
            <Text style={styles.beanName}>{item.typeDefintion}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );

  const renderCoffee = ({ item }: { item: Coffee }) => (
    <TouchableOpacity onPress={() => handleClickCoffee(item)}>
      <View style={styles.coffeeCard}>
        <Image source={require('../../assets/jacobs_coffee.png')} style={styles.coffeeImage} />
        <Text style={styles.coffeeName}>{item.coffeeName}</Text>
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

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Röstereien</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.filterButton}>
            <Image source={require('../../assets/heart_icon.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Image source={require('../../assets/bell_icon.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Image source={require('../../assets/profile_icon.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
        {/* Hier beginnt der scrollbare Bereich */}
        <FlatList
          horizontal
          data={roasteries}
          renderItem={renderRoastery}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={true}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Herkunftsländer</Text>
          <FlatList
            horizontal
            data={origins}
            renderItem={renderCountry}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={true}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kaffeebohnen</Text>
          <FlatList
            horizontal
            data={coffeeBeans}
            renderItem={renderCoffeeBean}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={true}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kaffees</Text>
          <FlatList
            horizontal
            data={coffees}
            renderItem={renderCoffee}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={true}
          />
        </View>
        {/* Hier endet der scrollbare Bereich */}
      </ScrollView>
    </View>
  );
};

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
  icon: {
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
    flexDirection: 'row',
    alignItems: 'center',
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
      marginRight: 16,
      marginLeft: 30
    },
    roasteryInfo: {
      flex: 1,
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
      overflow: 'hidden',
    },
    beanContent: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      padding: 20,
      borderRadius: 10,
      alignItems: 'flex-start',
      alignSelf: 'flex-end',
    },
    beanName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#F2F2F2',
      marginTop: 10,
      alignSelf: 'flex-start',
      marginBottom: 10
    },
    beanImageBackground: {
      width: '100%',
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
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
