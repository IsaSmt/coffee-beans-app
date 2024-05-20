import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types'; // Adjust the import according to your project structure

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("Login erfolgreich");
    navigation.navigate('Main'); // Use the navigation prop to navigate
  };

  const handleForgotPassword = () => {
    console.log("Passwort vergessen...");
    // Logik für "Passwort vergessen" hier einfügen
  };

  const screenWidth = Dimensions.get('window').width;

  // Use useLayoutEffect to set navigation options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ImageBackground source={require('../../assets/coffee_beans_1.png')} style={styles.background}>
      <View style={styles.container}>
        <View style={[styles.card, { width: screenWidth * 1.0 }]}>
          <Text style={styles.title}>Anmelden</Text>
          <TextInput
            style={styles.input}
            placeholder="Benutzername"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Passwort"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Passwort vergessen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Anmelden</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '50%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginTop: 450,
    padding: 30,
    paddingBottom: 90,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#663300',
  },
  input: {
    width: '100%',
    height: 65,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 60,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 120
  },
  forgotPasswordText: {
    marginTop: 30,
    color: '#663300',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#663300',
    padding: 20,
    height: 65,
    borderRadius: 60,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
