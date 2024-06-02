import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Roastery {
  id: string;
  roasteryName: string;
  roasteryDescription: string;
  plz: number;
  email: string;
  phone: string;
  street: string;
  logoUrl: string;
}

const RoasteriesScreen = () => {
  const [roasteries, setRoasteries] = useState<Roastery[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRoasteries = async () => {
      try {
        const response = await fetch('http://10.137.31.117:8080/api/roasteries', {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Roastery[] = await response.json();
        console.log(data);
        setRoasteries(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchRoasteries();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };
  const handleAddRoastery = () => {
    navigation.navigate('AddRoastery'); // Ensure this name matches the registered screen name
  };

  return (
    <View style={styles.container}>
      {/* Back Icon */}
      <TouchableOpacity style={styles.backIconContainer} onPress={handleBack}>
        <Image source={require('../../assets/back_icon.png')} style={styles.backIcon} />
      </TouchableOpacity>
      {/* Überschrift */}
      <Text style={styles.title}>Röstereien</Text>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search here" />
        <Image source={require('../../assets/search_icon.png')} style={styles.searchIcon} />
      </View>
      <ScrollView style={styles.roasteriesContainer}>
        {roasteries.map((roastery) => (
          <View key={roastery.id} style={styles.roasteryBox}>
            <View style={styles.roasteryInfo}>
              <Text style={styles.roasteryName}>{roastery.roasteryName}</Text>
              <Text style={styles.roasteryAddress}>{roastery.street}</Text>
            </View>
            <Image source={require('../../assets/blend_roastery_icon.png')} style={styles.logo} />
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddRoastery}>
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
  searchIcon: {
    position: 'absolute',
    right: 10,
    width: 20,
    height: 20,
    marginRight: 10
  },
  roasteriesContainer: {
    marginBottom: 16,
  },
  roasteryBox: {
    flexDirection: 'row',
    paddingVertical: 16, // Adjust vertical padding here
    paddingHorizontal: 16, // Adjust horizontal padding here
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'space-between', // Align items horizontally
    // alignItems: 'center', // Remove this line
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 25,
  },
  roasteryInfo: {
    // marginLeft: 16, // Remove this line
    flexDirection: 'column', // Add this line
    flex: 1, // Ensure text takes up available space
  },
  roasteryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roasteryAddress: {
    fontSize: 14,
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

export default RoasteriesScreen;
