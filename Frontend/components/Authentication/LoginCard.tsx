import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

interface LoginCardProps {}

const LoginCard: React.FC<LoginCardProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logik für die Anmeldung hier einfügen
  };

  const handleForgotPassword = () => {
    // Logik für "Passwort vergessen" hier einfügen
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
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
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Anmeldefenster nach unten verschieben
    alignItems: 'center',
  },
  card: {
    width: screenWidth * 1.0, // 100% der Bildschirmbreite
    backgroundColor: '#FFFFFF', // weiß
    padding: 30,
    paddingBottom: 80,
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
    color: '#663300', // Dunkelbraun
  },
  input: {
    width: '100%', // Breite des TextInput-Feldes auf 100% setzen
    height: 65,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 60, // Runde Ecken für TextInput-Felder
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end', // An den rechten Rand ausrichten
    marginBottom: 10,
    marginRight: 120
  },
  forgotPasswordText: {
    marginTop: 30,
    color: '#663300', // Dunkelbraun für den Text
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#663300', // Dunkelbraun für Button-Hintergrund
    padding: 20,
    height: 65,
    borderRadius: 60, // Runde Ecken für Button
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF', // Weiß für Button-Text
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginCard;