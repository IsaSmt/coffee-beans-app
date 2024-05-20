import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const BottomNavigation = () => {
  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity style={styles.navItem}>
        <Image source={require('../assets/icon.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Image source={require('../assets/icon.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Image source={require('../assets/icon.png')} style={styles.navIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Image source={require('../assets/icon.png')} style={styles.navIcon} />
      </TouchableOpacity>
    </View>
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
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
});

export default BottomNavigation;
