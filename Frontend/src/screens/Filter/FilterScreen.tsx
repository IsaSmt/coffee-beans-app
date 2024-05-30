import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal, FlatList, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const FilterScreen = () => {
  const [beanType, setBeanType] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [roastDegree, setRoastDegree] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [roastDate, setRoastDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [beanTypeModalVisible, setBeanTypeModalVisible] = useState(false);
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [roastDegreeModalVisible, setRoastDegreeModalVisible] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setBeanType('');
      setCountryOfOrigin('');
      setRoastDegree('');
      setMinPrice('');
      setMaxPrice('');
      setRoastDate(new Date());
    }, [])
  );

  const handleSearch = () => {
    console.log({
      beanType,
      countryOfOrigin,
      roastDegree,
      minPrice,
      maxPrice,
      roastDate,
    });
    navigation.navigate('LoadingScreen'); // Navigate to the loading screen
  };

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
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
          <TouchableOpacity style={styles.backIconContainer} onPress={handleBack}>
            <Image source={require('../../assets/back_icon.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filterkriterien</Text>
        </View>
        <View style={styles.content}>
          <ScrollView style={styles.scrollableContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bohnenart</Text>
              <TouchableOpacity style={styles.input} onPress={() => setBeanTypeModalVisible(true)}>
                <Text style={beanType ? styles.selectedText : styles.placeholderText}>{beanType || 'Bitte auswählen'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Herkunftsland</Text>
              <TouchableOpacity style={styles.input} onPress={() => setCountryModalVisible(true)}>
                <Text style={countryOfOrigin ? styles.selectedText : styles.placeholderText}>{countryOfOrigin || 'Bitte auswählen'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Röstgrad</Text>
              <TouchableOpacity style={styles.input} onPress={() => setRoastDegreeModalVisible(true)}>
                <Text style={roastDegree ? styles.selectedText : styles.placeholderText}>{roastDegree || 'Bitte auswählen'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputGroupRow}>
              <View style={styles.inputGroupHalf}>
                <Text style={styles.label}>Preis von</Text>
                <View style={styles.priceInputContainer}>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="..."
                    value={minPrice}
                    onChangeText={setMinPrice}
                    keyboardType="numeric"
                  />
                  <Text style={styles.symbol}>€</Text>
                </View>
              </View>
              <View style={styles.inputGroupHalf}>
                <Text style={styles.label}>Preis bis</Text>
                <View style={styles.priceInputContainer}>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="..."
                    value={maxPrice}
                    onChangeText={setMaxPrice}
                    keyboardType="numeric"
                  />
                  <Text style={styles.symbol}>€</Text>
                </View>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Röstdatum</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
                <Text>{formatDate(roastDate)}</Text>
                <Ionicons name="calendar" size={20} color="black" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={roastDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || roastDate;
                    setShowDatePicker(false);
                    setRoastDate(currentDate);
                  }}
                />
              )}
            </View>
          </ScrollView>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#D2B48C', borderRadius: 30 }]} onPress={handleSearch}>
            <Text style={styles.buttonText}>Suchen</Text>
          </TouchableOpacity>
        </View>
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
                  renderItem={({ item }) => renderModalItem(item, setCountryOfOrigin, setCountryModalVisible)}
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
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    position: 'relative',
    paddingTop: 70
  },
  backIconContainer: {
    position: 'relative',
    left: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginRight: 30, // Adjust this value to shift the title slightly to the left
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scrollableContent: {
    flex: 1,
    marginTop: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputGroupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  inputGroupHalf: {
    flex: 1,
    marginRight: 8,
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
    justifyContent: 'center',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  priceInput: {
    flex: 1,
    height: 41,
    color: '#333',
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
    padding: 16,
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
    borderRadius: 8,
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
  placeholderText: {
    color: '#9EA0A4',
  },
  selectedText: {
    color: 'black',
  },
});

export default FilterScreen;
