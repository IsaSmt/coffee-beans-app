import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { IP } from '../../../config';

const AddRoasteryScreen = () => {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [housenumber, setHousenumber] = useState('');
  const [plz, setPlz] = useState('');
  const [stadt, setStadt] = useState('');
  const [land, setLand] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactPersonFirstName, setContactPersonFirstName] = useState('');
  const [contactPersonLastName, setContactPersonLastName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setName('');
      setStreet('');
      setHousenumber('');
      setPlz('');
      setStadt('');
      setLand('');
      setEmail('');
      setContactNumber('');
      setContactPersonFirstName('');
      setContactPersonLastName('');
      setDescription('');
      setImage(null);
    }, [])
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://${IP}:8080/api/roasteries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roasteryName: name,
          roasteryDescription: description,
          email: email,
          phone: contactNumber,
          street: street,
          postcode: plz,
          ort: stadt
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data); // You can do something with the response data if needed
      Alert.alert('Erfolg', 'Die Rösterei wurde erfolgreich hinzugefügt.');
      navigation.navigate('Roastery', { reload: true }); // Navigation zur RoasteriesScreen und Reload-Flag setzen
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Failed to add roastery. Please try again later.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/back_icon.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Rösterei hinzufügen</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Ionicons name="camera" size={50} color="gray" />
            )}
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Musterrösterei"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Straße <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Musterstraße"
              value={street}
              onChangeText={setStreet}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hausnummer <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder=".."
              value={housenumber}
              onChangeText={setHousenumber}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PLZ <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="0000"
              value={plz}
              onChangeText={setPlz}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Stadt <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Musterstadt"
              value={stadt}
              onChangeText={setStadt}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Land <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Musterland"
              value={land}
              onChangeText={setLand}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-Mail <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="E-Mail"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Telefonnummer</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. '+49...'"
              value={contactNumber}
              onChangeText={setContactNumber}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kontaktperson (Vorname)</Text>
            <TextInput
              style={styles.input}
              placeholder="Max"
              value={contactPersonFirstName}
              onChangeText={setContactPersonFirstName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kontaktperson (Nachname)</Text>
            <TextInput
              style={styles.input}
              placeholder="Mustermann"
              value={contactPersonLastName}
              onChangeText={setContactPersonLastName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Beschreibung <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Die Rösterei.."
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>SPEICHERN</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
    position: 'relative',
  },
  backIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 16,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  imageContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#D2B48C',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddRoasteryScreen;
