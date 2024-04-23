// LoginScreen.tsx
import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import LoginCard from '../../components/Authentication/LoginCard';

const LoginScreen = () => {
  return (
    <ImageBackground source={require('../../assets/coffee_beans_1.png')} style={styles.background}>
      <View style={styles.container}>
        <LoginCard />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%', // Die Breite des Hintergrundbildes an den Bildschirm anpassen
    height: '50%', // Die Höhe des Hintergrundbildes an den Bildschirm anpassen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
