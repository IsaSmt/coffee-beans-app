import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AddRoasteryScreen = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [plz, setPlz] = useState('');
  const [stadt, setStadt] = useState('');
  const [land, setLand] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactPersonFirstName, setContactPersonFirstName] = useState('');
  const [contactPersonLastName, setContactPersonLastName] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      // Reset state when the screen comes into focus
      setName('');
      setAddress('');
      setPlz('');
      setStadt('');
      setLand('');
      setEmail('');
      setContactNumber('');
      setContactPersonFirstName('');
      setContactPersonLastName('');
      setRating('');
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

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleSave = () => {
    console.log({
      name,
      address,
      plz,
      stadt,
      land,
      email,
      contactNumber,
      contactPersonFirstName,
      contactPersonLastName,
      rating,
      description,
      image
    });
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
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
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adresse</Text>
            <TextInput
              style={styles.input}
              placeholder="Adresse"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PLZ</Text>
            <TextInput
              style={styles.input}
              placeholder="PLZ"
              value={plz}
              onChangeText={setPlz}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Stadt</Text>
            <TextInput
              style={styles.input}
              placeholder="Stadt"
              value={stadt}
              onChangeText={setStadt}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Land</Text>
            <TextInput
              style={styles.input}
              placeholder="Land"
              value={land}
              onChangeText={setLand}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Adresse</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Adresse"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kontakt Nummer</Text>
            <TextInput
              style={styles.input}
              placeholder="Kontakt Nummer"
              value={contactNumber}
              onChangeText={setContactNumber}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kontaktperson Vorname</Text>
            <TextInput
              style={styles.input}
              placeholder="Kontaktperson Vorname"
              value={contactPersonFirstName}
              onChangeText={setContactPersonFirstName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kontaktperson Nachname</Text>
            <TextInput
              style={styles.input}
              placeholder="Kontaktperson Nachname"
              value={contactPersonLastName}
              onChangeText={setContactPersonLastName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bewertung</Text>
            <View style={styles.ratingInput}>
              <TextInput
                style={styles.ratingTextInput}
                placeholder="   . "
                value={rating}
                onChangeText={setRating}
              />
              <Ionicons name="star" size={24} color="gold" style={styles.starIcon} />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Beschreibung</Text>
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Beschreibung"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>SPEICHERN</Text>
        </TouchableOpacity>
      </View>
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
  ratingInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  starIcon: {
    marginLeft: 'auto',
  },
  ratingTextInput: {
    flex: 1,
    height: 40,
    borderColor: 'transparent',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#D2B48C',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddRoasteryScreen;
