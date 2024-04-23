import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface LoginCardProps {}

const LoginCard: React.FC<LoginCardProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logik für die Anmeldung hier einfügen
  };

  return (
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
      <Button title="Anmelden" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D2B48C', // Erdton
    padding: 20,
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
});

export default LoginCard;
