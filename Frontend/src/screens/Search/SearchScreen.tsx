import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchScreen = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <View style={styles.container}>
      {/* Button to toggle dropdown */}
      <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
        <Text style={styles.buttonText}>Filter auswählen</Text>
      </TouchableOpacity>

      {/* Dropdown */}
      {showDropdown && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text>Dropdown Item 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text>Dropdown Item 2</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  dropdownItem: {
    paddingVertical: 5,
  },
});

export default SearchScreen;
