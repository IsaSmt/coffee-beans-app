import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, ScrollView, Platform, Modal, FlatList, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useFocusEffect, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../../../config';
import DateTimePicker from '@react-native-community/datetimepicker';

type RootStackParamList = {
  Coffee: undefined;
  AddCoffee: undefined;
};

const AddCoffeeScreen = () => {
  const [name, setName] = useState('');
  const [beantype, setBeanType] = useState('');
  const [manufacturingPlace, setManufacturingPlace] = useState('');
  const [description, setDescription] = useState('');
  const [roastdegree, setRoastDegree] = useState('');
  const [roastdate, setRoastDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState('');
  const [origin, setOrigin] = useState('');
  const [roastery, setRoastery] = useState('');
  const [beanTypeModalVisible, setBeanTypeModalVisible] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [roastDegreeModalVisible, setRoastDegreeModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();


  useFocusEffect(
    useCallback(() => {
      setName('');
      setBeanType('');
      setManufacturingPlace('');
      setDescription('');
      setRoastDegree('');
      setRoastDate(new Date());
      setPrice(0);
      setWeight(0);
      setImage(null);
    }, [])
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // ImagePickerResult has 'canceled' (US spelling) and 'assets' array
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleBack = () => {
    navigation.navigate('Coffee');
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/api/coffees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coffeeName: name,
          coffeeDescription: description,
          origin: manufacturingPlace,
          roastery: roastery,
          beantype: beantype,
          coffeePrice: price,
          coffeeWeight: weight,
          roastdate: roastdate.toISOString(),
          processing: processing
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      navigation.goBack();
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Failed to add coffee. Please try again later.');
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onChange = (_event: any, selectedDate?: Date | undefined) => {
    const currentDate = selectedDate || roastdate;
    setShowDatePicker(Platform.OS === 'ios');
    setRoastDate(currentDate);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const renderModalItem = (
    item: string,
    setValue: (val: string) => void,
    closeModal: (val: boolean) => void
  ) => (
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
          <TouchableOpacity style={styles.backIconContainer} onPress={handleBack}>
            <Image source={require('../../assets/back_icon.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Kaffee</Text>
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
            <Text style={styles.label}>Bohnenart</Text>
            <TouchableOpacity style={styles.input} onPress={() => setBeanTypeModalVisible(true)}>
              <Text style={beantype ? styles.selectedText : styles.placeholderText}>{beantype || 'Bitte auswählen'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Herstellungsort</Text>
            <TouchableOpacity style={styles.input} onPress={() => setCountryModalVisible(true)}>
              <Text style={manufacturingPlace ? styles.selectedText : styles.placeholderText}>{manufacturingPlace || 'Bitte auswählen'}</Text>
            </TouchableOpacity>
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
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Röstgrad</Text>
            <TouchableOpacity style={styles.input} onPress={() => setRoastDegreeModalVisible(true)}>
              <Text style={roastdegree ? styles.selectedText : styles.placeholderText}>{roastdegree || 'Bitte auswählen'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Röstdatum</Text>
            <TouchableOpacity onPress={showDatepicker} style={styles.dateInput}>
              <Text>{formatDate(roastdate)}</Text>
              <Ionicons name="calendar" size={20} color="black" />
           
              </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={roastdate}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.row}>
        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.label}>Preis</Text>
          <View style={styles.inputWithSymbol}>
            <TextInput
              style={styles.inputWithSymbolField}
              placeholder="..."
              value={price.toString()}
              onChangeText={text => setPrice(Number(text))}
              keyboardType="numeric"
            />
            <Text style={styles.symbol}>€</Text>
          </View>
        </View>
        <View style={[styles.inputGroup, styles.halfInput]}>
          <Text style={styles.label}>Gewicht</Text>
          <View style={styles.inputWithSymbol}>
            <TextInput
              style={styles.inputWithSymbolField}
              placeholder="..."
              value={weight.toString()}
              onChangeText={text => setWeight(Number(text))}
              keyboardType="numeric"
            />
            <Text style={styles.symbol}>g</Text>
          </View>
        </View>
      </View>
      <View>
      <View style={styles.inputGroup}>
            <Text style={styles.label}>Rösterei</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="..."
              value={roastery}
              onChangeText={setRoastery}
              multiline
            />
        </View>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Processing</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="..."
              value={processing}
              onChangeText={setProcessing}
              multiline
            />
          </View>
    </View>
    </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>SPEICHERN</Text>
      </TouchableOpacity>
      

    <Modal
      visible={beanTypeModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setBeanTypeModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setBeanTypeModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={['Arabica', 'Robusta', 'Liberica', 'Excelsa']}
              renderItem={({ item }) => renderModalItem(item, setBeanType, setBeanTypeModalVisible)}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

    <Modal
      visible={countryModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setCountryModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setCountryModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={['Brazil', 'Colombia', 'Ethiopia', 'Vietnam']}
              renderItem={({ item }) => renderModalItem(item, setManufacturingPlace, setCountryModalVisible)}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

    <Modal
      visible={roastDegreeModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setRoastDegreeModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setRoastDegreeModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={['Light', 'Medium', 'Dark']}
              renderItem={({ item }) => renderModalItem(item, setRoastDegree, setRoastDegreeModalVisible)}
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
inputWithSymbol: {
flexDirection: 'row',
alignItems: 'center',
borderColor: '#ccc',
borderWidth: 1,
borderRadius: 20,
paddingHorizontal: 8,
backgroundColor: 'white',
height: 40,
},
inputWithSymbolField: {
flex: 1,
},
symbol: {
color: '#9EA0A4',
marginLeft: 4,
},
dateInput: {
flexDirection: 'row',
alignItems: 'center',
height: 40,
borderColor: '#ccc',
borderWidth: 1,
borderRadius: 20,
paddingHorizontal: 8,
justifyContent: 'space-between',
backgroundColor: 'white',
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
row: {
flexDirection: 'row',
justifyContent: 'space-between',
},
halfInput: {
width: '48%',
},
pickerContainer: {
borderColor: '#ccc',
borderWidth: 1,
borderRadius: 20,
overflow: 'hidden',
height: 40,
justifyContent: 'center',
backgroundColor: 'white',
},
placeholderText: {
color: '#9EA0A4',
},
selectedText: {
color: 'black',
},
});

export default AddCoffeeScreen;