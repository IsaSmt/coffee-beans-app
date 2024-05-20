import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './types'; // Importiere die Typdefinitionen
import LoginScreen from './src/screens/Authentication/LoginScreen';
import HomePage from './src/screens/Home/HomeScreen';
import RoasteryScreen from './src/screens/Roasteries/RoasteryScreen'; // Importiere RoasteriesScreen
import CoffeeBeansScreen from './src/screens/CoffeeBeans/CoffeeBeansScreen';
import CoffeeScreen from './src/screens/Coffee/CoffeeScreen';
import CountryOfOriginScreen from './src/screens/CountryOfOrigin/CountryOfOriginScreen';
import SearchScreen from './src/screens/Search/SearchScreen';
import { useNavigation } from '@react-navigation/native'; // Importiere den Hook
import AddCoffeeScreen from './src/screens/AddCoffee/AddCoffeeScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const navigation = useNavigation(); // Hole das Navigationsobjekt mit dem Hook

  const handleNavigationToSearch = () => {
    navigation.navigate('Search'); // Navigiere zum "Search" Bildschirm
  };

  const handleNavigationToHome = () => {
    navigation.navigate('Home'); // Navigiere zum "Home" Bildschirm
  };

  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity style={styles.navItem} onPress={handleNavigationToHome}>
        <Image source={require('./src/assets/home_icon.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={handleNavigationToSearch}>
        <Image source={require('./src/assets/filter_icon.svg')} style={styles.navIcon} />
      </TouchableOpacity>
      {/* Neues Icon hinzugefügt */}
      <TouchableOpacity style={styles.navItem}>
        <Image source={require('./src/assets/cart_icon.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Image source={require('./src/assets/heart_icon.svg')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Image source={require('./src/assets/profile_icon.svg')} style={styles.navIcon} />
      </TouchableOpacity>
    </View>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={() => <BottomNavigation />}>
      <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
      <Tab.Screen name="Roastery" component={RoasteryScreen} options={{ headerShown: false }} />
      <Tab.Screen name="CoffeeBean" component={CoffeeBeansScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Coffee" component={CoffeeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="CountryOfOrigin" component={CountryOfOriginScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="AddCoffee" component={AddCoffeeScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingBottom: 30
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
});

export default App;
