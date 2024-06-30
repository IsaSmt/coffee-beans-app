import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { IP } from '../../../config';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const cardInitialHeight = screenHeight * 0.6;

const CoffeeProfileScreen = () => {
  const [cardHeight, setCardHeight] = useState(cardInitialHeight);
  const [quantity, setQuantity] = useState(3);
  const [activeTab, setActiveTab] = useState('Beschreibung');
  const [coffeeData, setCoffeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { coffeeId } = route.params;

  const handleBack = () => {
    navigation.navigate('Coffee');
  };
  
  useEffect(() => {
    const fetchCoffeeData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://${IP}:8080/api/coffees/${coffeeId}`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCoffeeData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeData();
  }, [coffeeId]);

  const handleGesture = ({ nativeEvent }) => {
    setCardHeight(Math.max(cardInitialHeight, cardInitialHeight - nativeEvent.translationY));
  };

  const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decreaseQuantity = () => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));

  const calculatePrice = () => {
    const price = quantity * (coffeeData ? coffeeData.coffeePrice : 0);
    return price.toFixed(2);
  };

  const renderTabContent = () => {
    if (loading) {
      return <Text>Lade Kaffeedaten...</Text>;
    }

    if (!coffeeData) {
      return <Text>Keine Kaffeedaten verfügbar</Text>;
    }

    switch (activeTab) {
      case 'Beschreibung':
        return (
          <>
            <Text style={styles.description}>{coffeeData.coffeeDescription}</Text>
            <Text style={styles.infoTitle}>Herkunftsländer</Text>
            <Text style={styles.info}>{coffeeData.origin}</Text>
            <Text style={styles.infoTitle}>Rösterei</Text>
            <Text style={styles.info}>{coffeeData.roastery}</Text>
            <Text style={styles.infoTitle}>Bohnentyp</Text>
            <Text style={styles.info}>{coffeeData.beantype}</Text>
            <Text style={styles.infoTitle}>Verarbeitungsmethode</Text>
            <Text style={styles.info}>{coffeeData.processing}</Text>
            <Text style={styles.infoTitle}>Röstdatum</Text>
            <Text style={styles.info}>{coffeeData.roastdate}</Text>
          </>
        );
      case 'Bewertungen':
        return <Text style={styles.tabContent}>Hier werden Bewertungen angezeigt.</Text>;
      case 'Diskussion':
        return <Text style={styles.tabContent}>Hier wird die Diskussion angezeigt.</Text>;
      default:
        return null;
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image source={require('../../assets/back_icon.png')} style={styles.icon}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Image source={require('../../assets/share_icon.png')} style={styles.icon}></Image>
        </TouchableOpacity>
        <ScrollView horizontal pagingEnabled style={styles.imageContainer}>
          <Image source={require('../../assets/hochland_coffee.png')} style={styles.image} />
          <Image source={require('../../assets/hochland_coffee.png')} style={styles.image} />
        </ScrollView>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <View style={[styles.card, { height: cardHeight }]}>
          <View style={styles.titleContainer}>
              <Text style={styles.title}>{coffeeData ? coffeeData.coffeeName : 'Lade...'}</Text>
              <Text style={styles.coffeeWeight}>{coffeeData ? `${coffeeData.coffeeWeight} g` : ''}</Text>
            </View>
            <View style={styles.priceQuantityContainer}>
              <Text style={styles.price}>€ {coffeeData ? coffeeData.coffeePrice.toFixed(2) : '0.00'}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={24} color="gold" />
              <Text style={styles.rating}>4.5 (128 reviews)</Text>
            </View>
            <View style={styles.tabsContainer}>
              <TouchableOpacity onPress={() => setActiveTab('Beschreibung')} style={[styles.tabButton, activeTab === 'Beschreibung' && styles.activeTab]}>
                <Text style={styles.tabText}>Beschreibung</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('Bewertungen')} style={[styles.tabButton, activeTab === 'Bewertungen' && styles.activeTab]}>
                <Text style={styles.tabText}>Bewertungen</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('Diskussion')} style={[styles.tabButton, activeTab === 'Diskussion' && styles.activeTab]}>
                <Text style={styles.tabText}>Diskussion</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={[styles.scrollview, { paddingBottom: 80 }]}>
              {renderTabContent()}
            </ScrollView>
            <View style={styles.staticButtonsContainer}>
              <TouchableOpacity style={styles.heartButtonContainer}>
                <Icon name="heart" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.cartButtonContainer}>
                <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>IN DEN WARENKORB</Text>
                <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>€ {calculatePrice()} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </PanGestureHandler>
        
        {/* Hier werden die beiden Buttons hinzugefügt */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.heartButton}>
            <Image source={require('../../assets/heart_icon.png')} style={styles.heartImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>ZUM WARENKORB</Text>
            <Text style={styles.cartButtonText}>{calculatePrice()} €</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#fff',
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 30,
    zIndex: 1,
  },
  shareButton: {
    position: 'absolute',
    top: 70,
    right: 30,
    zIndex: 1,
  },
  imageContainer: {
    marginTop: 100,
    height: 200,
    marginVertical: 10,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
    resizeMode: 'contain',
  },
  heartImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  icon: {
    width: 24,
    height: 24,
  },
  scrollview: {
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'absolute',
    top: screenHeight * 0.4,
    left: 0,
    right: 0,
    paddingBottom: 290,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Hinzugefügt, um den Titel und das Gewicht nebeneinander zu platzieren
  },
  coffeeWeight: {

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  quantityButton: {
    padding: 10,
  },
  quantityButtonText: {
    fontSize: 24,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tabButton: {
    padding: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabContent: {
    fontSize: 16,
    marginVertical: 10,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  info: {
    fontSize: 16,
    marginVertical: 10,
  },
  staticButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  heartButtonContainer: {
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 50,
  },
  cartButtonContainer: {
    padding: 10,
    backgroundColor: '#00ff00',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 10,
  },
  // Neue Styles für die Buttons
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  heartButton: {
    backgroundColor: '#D2B48C', // hellbraune Farbe
    borderRadius: 20, // abgerundete Ecken
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartButtonText: {
    fontSize: 16,
    color: '#fff', // weiße Schriftfarbe
  },
  cartButton: {
    backgroundColor: '#D2B48C', // hellbraune Farbe
    borderRadius: 20, // abgerundete Ecken
    paddingVertical: 10,
    paddingHorizontal: 70,
    marginBottom: 2,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButtonText: {
    fontSize: 16,
    color: '#000000', // weiße Schriftfarbe
  },
});

export default CoffeeProfileScreen;
