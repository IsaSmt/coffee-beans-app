import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IP } from '../../../config';

interface CoffeeBean {
  id: string;
  typeDefinition: string;
  typeExplanation: string;
  caffeineAmount: string;
  beanFormSize: string;
  tasteType: string | null;
  aromaType: string | null;
  avgPrice: number;
  imageUrl: string | number;
}

const CoffeeBeansScreen: React.FC = () => {
  const navigation = useNavigation();
  const [coffeeBeans, setCoffeeBeans] = useState<CoffeeBean[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchCoffeeBeans = async () => {
      try {
        const response = await fetch(`http://${IP}:8080/api/beantypes`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: CoffeeBean[] = await response.json();
        setCoffeeBeans(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchCoffeeBeans();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddCoffeeBean = () => {
    navigation.navigate('AddCoffeeBean');
  };

  const handleGoToBeanProfile = (id: string) => {
    navigation.navigate('BeanProfile', { beanId: id });
  };

  const handleReloadCoffeeBeans = async () => {
    try {
      const response = await fetch(`http://${IP}:8080/api/beantypes`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: CoffeeBean[] = await response.json();
      console.log(data);
      setCoffeeBeans(data);
    } catch (error) {
      console.error('Reload error:', error);
    }
  };

  const filteredCoffeeBeans = coffeeBeans.filter(bean =>
    bean.typeDefinition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCoffeeBean = ({ item }: { item: CoffeeBean }) => (
    <TouchableOpacity style={styles.beanCard} onPress={() => handleGoToBeanProfile(item.id)}>
      <ImageBackground source={require('../../assets/arabica_bean.png')} style={styles.beanImageBackground}>
        <View style={styles.beanContent}>
          <Text style={styles.beanName}>{item.typeDefinition}</Text>
          <Text style={styles.beanId}>ID: {item.id}</Text>
        </View>
      </ImageBackground>
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
       <TouchableOpacity style={styles.reloadButton} onPress={handleReloadCoffeeBeans}>
        <Image source={require('../../assets/reload_icon.png')} style={styles.reloadIcon} />
      </TouchableOpacity>
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
    paddingRight: 40,
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
    flexDirection: 'column',
  },
  row: {
    justifyContent: 'space-between',
  },
  beanCard: {
    backgroundColor: '#FFF',
    flex: 1,
    margin: 5,
    paddingBottom: 10,
    borderRadius: 10,
    shadowColor: '#F2F2F2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'center',
    overflow: 'hidden',
  },
  beanContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  beanName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F2F2F2',
  },
  beanImageBackground: {
    width: 150,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    overflow: 'hidden',
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
  reloadButton: {
    position: 'absolute',
    top: 42,
    right: 60,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 10,
  },
  reloadIcon: {
    width: 25,
    height: 25,
  },
});

export default CoffeeBeansScreen;
