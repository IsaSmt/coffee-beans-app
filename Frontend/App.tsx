import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './screens/Authentication/LoginScreen'; // Importiere den LoginScreen

function App() {
  return (
    <View style={styles.container}>
      {/* Zeige den LoginScreen an */}
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
