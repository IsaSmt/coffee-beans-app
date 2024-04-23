import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginCard from '../../components/Authentication/LoginCard';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <LoginCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // Erdton
  },
});

export default LoginScreen;
