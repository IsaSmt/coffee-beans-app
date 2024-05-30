import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, ScrollView, Modal, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AddCoffeeBeanScreen = () => {
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [flavorProfile, setFlavorProfile] = useState('');
  const [aroma, setAroma] = useState('');
  const [acidity, setAcidity] = useState('');
  const [caffeineContent, setCaffeineContent] = useState('');
  const [altitude, setAltitude] = useState('');
  const [roastLevel, setRoastLevel] = useState('');
  const [beanSize, setBeanSize] = useState('');
  const [processingMethod, setProcessingMethod] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const [originModalVisible, setOriginModalVisible] = useState(false);
  const [flavorProfileModalVisible, setFlavorProfileModalVisible] = useState(false);
  const [aromaModalVisible, setAromaModalVisible] = useState(false);
  const [acidityModalVisible, setAcidityModalVisible] = useState(false);
  const [caffeineContentModalVisible, setCaffeineContentModalVisible] = useState(false);
  const [roastLevelModalVisible, setRoastLevelModalVisible] = useState(false);
  const [beanSizeModalVisible, setBeanSizeModalVisible] = useState(false);
  const [processingMethodModalVisible, setProcessingMethodModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Reset state when the screen comes into focus
      setName('');
      setOrigin('');
      setFlavorProfile('');
      setAroma('');
      setAcidity('');
      setCaffeineContent('');
      setAltitude('');
      setRoastLevel('');
      setBeanSize('');
      setProcessingMethod('');
      setPrice('');
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
      origin,
      flavorProfile,
      aroma,
      acidity,
      caffeineContent,
      altitude,
      roastLevel,
      beanSize,
      processingMethod,
      price,
      description,
      image
    });
    navigation.goBack();
  };

  const renderModalItem = (item, setValue, closeModal) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setValue(item);
        closeModal(false);
      }}
    >
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/back_icon.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Kaffeebohne hinzufügen</Text>
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
            <Text style={styles.label}>Herkunftsland</Text>
            <TouchableOpacity style={styles.input} onPress={() => setOriginModalVisible(true)}>
              <Text style={origin ? styles.selectedText : styles.placeholderText}>{origin || 'Bitte auswählen'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Geschmacksprofil</Text>
            <TouchableOpacity style={styles.input} onPress={() => setFlavorProfileModalVisible(true)}>
              <Text style={flavorProfile ? styles.selectedText : styles.placeholderText}>{flavorProfile || 'Bitte auswählen'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Aroma</Text>
            <TouchableOpacity style={styles.input} onPress={() => setAromaModalVisible(true)}>
              <Text style={aroma ? styles.selectedText : styles.placeholderText}>{aroma || 'Bitte auswählen'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Säuregehalt</Text>
            <TouchableOpacity style={styles.input} onPress={() => setAcidityModalVisible(true)}>
              <Text style={acidity ? styles.selectedText : styles.placeholderText}>{acidity || 'Bitte auswählen'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Koffeingehalt</Text>
            <TouchableOpacity style={styles.input} onPress={() => setCaffeineContentModalVisible(true)}>
              <Text style={caffeineContent ? styles.selectedText : styles.placeholderText}>{caffeineContent || 'Bitte auswählen'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Anbauhöhe (Meter)</Text>
            <TextInput
              style={styles.input}
              placeholder="Anbauhöhe"
              value={altitude}
              onChangeText={setAltitude}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Röstgrad</Text>
            <TouchableOpacity style={styles.input} onPress={() => setRoastLevelModalVisible(true)}>
              <Text style={roastLevel ? styles.selectedText : styles.placeholderText}>{roastLevel || 'Bitte auswählen'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bohnenform und Größe</Text>
            <TextInput
              style={styles.input}
              placeholder="Bohnenform und Größe"
              value={beanSize}
              onChangeText={setBeanSize}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Verarbeitungsmethode</Text>
            <TouchableOpacity style={styles.input} onPress={() => setProcessingMethodModalVisible(true)}>
              <Text style={processingMethod ? styles.selectedText : styles.placeholderText}>{processingMethod || 'Bitte auswählen'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Durchschnittlicher Preis pro kg</Text>
            <TextInput
              style={styles.input}
              placeholder="Preis"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Beschreibung</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
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

        <Modal
          visible={originModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setOriginModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setOriginModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={['Brasilien', 'Kolumbien', 'Äthiopien', 'etc.']}
                  renderItem={({ item }) => renderModalItem(item, setOrigin, setOriginModalVisible)}
                  keyExtractor={(item) => item}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          visible={flavorProfileModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setFlavorProfileModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setFlavorProfileModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={['Fruchtig', 'nussig', 'schokoladig', 'blumig']}
                  renderItem={({ item }) => renderModalItem(item, setFlavorProfile, setFlavorProfileModalVisible)}
                  keyExtractor={(item) => item}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          visible={aromaModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setAromaModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setAromaModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={['Intensiv', 'Mild', 'Floral']}
                  renderItem={({ item }) => renderModalItem(item, setAroma, setAromaModalVisible)}
                  keyExtractor={(item) => item}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          visible={acidityModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setAcidityModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setAcidityModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={['Hoch', 'Mittel', 'Niedrig']}
                  renderItem={({ item }) => renderModalItem(item, setAcidity, setAcidityModalVisible)}
                  keyExtractor={(item) => item}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          visible={caffeineContentModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setCaffeineContentModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setCaffeineContentModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={['Hoch', 'Mittel', 'Niedrig']}
                  renderItem={({ item }) => renderModalItem(item, setCaffeineContent, setCaffeineContentModalVisible)}
                  keyExtractor={(item) => item}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          visible={roastLevelModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setRoastLevelModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setRoastLevelModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={['Hell', 'Mittel', 'Dunkel']}
                  renderItem={({ item }) => renderModalItem(item, setRoastLevel, setRoastLevelModalVisible)}
                  keyExtractor={(item) => item}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          visible={processingMethodModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setProcessingMethodModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setProcessingMethodModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={['Nass', 'Trocken', 'Honey']}
                  renderItem={({ item }) => renderModalItem(item, setProcessingMethod, setProcessingMethodModalVisible)}
                  keyExtractor={(item) => item}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

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
    width: 20, // Adjusted size to match original design
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
  placeholderText: {
    color: '#9EA0A4',
  },
  selectedText: {
    color: 'black',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default AddCoffeeBeanScreen;
