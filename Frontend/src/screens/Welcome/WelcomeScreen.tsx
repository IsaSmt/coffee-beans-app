import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types'; // Adjust the import according to your project structure

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;

  // Use useLayoutEffect to set navigation options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleWeiter = () => {
    console.log("Weiter button pressed");
    navigation.navigate('Main'); // Navigate to the main screen
  };

  return (
    <View style={styles.background}>
      <Image source={require('../../assets/welcome_screen.png')} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>Willkommen bei CoffeeCup</Text>
        <Text style={styles.subtitle}>Ihr Begleiter zum Kaffeeexperten</Text>
        <Text style={styles.description}>
          Finden Sie Ihren perfekten Kaffee. Laden Sie neue Kaffeesorten hoch. Stöbern Sie durch unser Sortiment an aromatischen Bohnen und lokalen Kaffeehäusern.
        </Text>
        <TouchableOpacity style={[styles.continueButton, { width: screenWidth * 0.9 }]} onPress={handleWeiter}>
          <Text style={styles.continueButtonText}>WEITER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: '40%',
    resizeMode: 'cover',
    marginTop: 100
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 70, // Adjusted margin to move the content further down
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#D2B48C', // Changed to coffee brown color
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 50, // Adjusted margin to move the button further down
  },
  continueButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
