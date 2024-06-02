import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const cardInitialHeight = screenHeight * 0.6;

const CoffeeProfileScreen = () => {
  const [cardHeight, setCardHeight] = useState(cardInitialHeight);
  const [quantity, setQuantity] = useState(3);
  const [activeTab, setActiveTab] = useState('Beschreibung');

  const handleGesture = ({ nativeEvent }) => {
    setCardHeight(Math.max(cardInitialHeight, cardInitialHeight - nativeEvent.translationY));
  };

  const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decreaseQuantity = () => setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));

  // Funktion zur Kalkulation des Preises mit zwei Stellen nach dem Komma
  const calculatePrice = () => {
    const price = quantity * 4.9;
    return price.toFixed(2); // auf zwei Stellen nach dem Komma runden
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Beschreibung':
        return (
          <>
            <Text style={styles.description}>
              100 % Röstkaffee. Espresso Rassico von Hochland Kaffee.
              Coffea Arabica & Canephora nussig-würzig. Ein feinwürziger und zugleich kräftiger Charakter mit süßfruchtiger Kopfnote. Im Aroma dominieren intensive Noten von dunkler Bitterschokolade und Mandel, in die sich erfrischende Nuancen von Limette und Grapefruit mischen. Zarte Karamelltöne schwingen im Nachklang des rassig eleganten Genusserlebnisses mit.
            </Text>
            <Text style={styles.originTitle}>Herkunftsländer</Text>
            <Text style={styles.origin}>
              Arabica Kaffee aus Lateinamerika und Canephora Robusta aus Indien
            </Text>
            <Text style={styles.cuppingNotesTitle}>Cupping Notes</Text>
            <Text style={styles.cuppingNotes}>
              Bitterschokolade, Nüsse, Limette und Grapefruit, Karamell
            </Text>
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
        <TouchableOpacity style={styles.backButton}>
         <Image source={require('../../assets/back_icon.png')} style={styles.icon}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Image source={require('../../assets/share_icon.png')} style={styles.icon}></Image>
        </TouchableOpacity>
        <ScrollView horizontal pagingEnabled style={styles.imageContainer}>
          <Image
            source={require('../../assets/hochland_coffee.png')} // Replace with your image URLs
            style={styles.image}
          />
          <Image
            source={require('../../assets/hochland_coffee.png')}
            style={styles.image}
          />
        </ScrollView>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <View style={[styles.card, { height: cardHeight }]}>
            <ScrollView>
              <Text style={styles.title}>Hochland - Espresso</Text>
              <View style={styles.priceQuantityContainer}>
                <Text style={styles.price}>€ 4.90</Text>
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
  icon: {
    width: 24,
    height: 24,
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  priceQuantityContainer:
  {
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
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  originTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  origin: {
    fontSize: 16,
    marginVertical: 10,
  },
  cuppingNotesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cuppingNotes: {
    fontSize: 16,
    marginVertical: 10,
  },
  staticButtonsContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  heartButtonContainer: {
    backgroundColor: '#987456',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 50,
    marginRight: 30,
    marginLeft: 20
  },

  cartButtonContainer: {
    backgroundColor: '#987456',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 50,
    marginRight: 20,
    marginLeft: 10
  }, 
});

export default CoffeeProfileScreen;
