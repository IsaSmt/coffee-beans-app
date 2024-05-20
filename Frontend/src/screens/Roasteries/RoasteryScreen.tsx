import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView } from 'react-native';

const roasteries = [
  { id: '1', name: 'The Barn', address: 'Alte Potsdamer Str. 5\n10785 Berlin', logo: 'https://path-to-logo.png' },
  { id: '2', name: 'Five Elephant', address: 'Schwedter Str. 11\n10119 Berlin', logo: 'https://path-to-logo.png' },
  { id: '3', name: 'JB Kaffee', address: 'Mörtlstrasse 5A\n85254 München', logo: 'https://path-to-logo.png' },
  { id: '4', name: 'The Barn', address: 'Alte Potsdamer Str. 5\n10785 Berlin', logo: 'https://path-to-logo.png' },
];

const RoasteriesScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search here" />
        <Image source={require('../../assets/search_icon.png')} style={styles.searchIcon} />
      </View>
      <ScrollView style={styles.roasteriesContainer}>
        {roasteries.map((roastery) => (
          <View key={roastery.id} style={styles.roasteryBox}>
            <Image source={{ uri: roastery.logo }} style={styles.logo} />
            <View style={styles.roasteryInfo}>
              <Text style={styles.roasteryName}>{roastery.name}</Text>
              <Text style={styles.roasteryAddress}>{roastery.address}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
    flex: 1,
    marginBottom: 16,
  },
  roasteryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 16,
    borderRadius: 25,
  },
  roasteryInfo: {
    flex: 1,
  },
  roasteryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roasteryAddress: {
    fontSize: 14,
    color: '#777',
  },
});

export default RoasteriesScreen;
