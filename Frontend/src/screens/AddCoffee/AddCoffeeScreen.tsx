import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native'; // Button importiert

interface Coffee {
  id: string;
  name: string;
  address: string;
  logoUrl: string;
}

const AddCoffeeScreen: React.FC<{ coffee: Coffee[] }> = ({ coffee }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <View style={styles.container}>
      {/* Button hinzugefügt */}
      <Button
        title="AddCoffeeScreen"
        onPress={() => console.log('Button geklickt')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
});

export default AddCoffeeScreen;
