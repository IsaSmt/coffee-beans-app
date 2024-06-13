import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { IP } from '../../../config';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;
const cardInitialHeight = screenHeight * 0.6;

const RoasteryProfileScreen = () => {
  const [cardHeight, setCardHeight] = useState(cardInitialHeight);
  const [activeTab, setActiveTab] = useState('Beschreibung');
  const [roasteryData, setRoasteryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('Roastery');
  };

  useEffect(() => {
    const fetchRoasteryData = async () => {
      try {
        const response = await fetch(`http://${IP}:8080/api/roasteries/1`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setRoasteryData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoasteryData();
  }, []);

  const handleGesture = ({ nativeEvent }) => {
    setCardHeight(Math.max(cardInitialHeight, cardInitialHeight - nativeEvent.translationY));
  };

  const renderTabContent = () => {
    if (loading) {
      return <Text>Lade Röstereidaten...</Text>;
    }

    if (!roasteryData) {
      return <Text>Keine Röstereidaten verfügbar</Text>;
    }

    switch (activeTab) {
      case 'Beschreibung':
        return (
          <>
            <Text style={styles.description}>{roasteryData.roasteryDescription}</Text>
            <Text style={styles.detailTitle}>Kontaktinformationen</Text>
            <Text style={styles.detail}>{roasteryData.email}</Text>
            <Text style={styles.detail}>{roasteryData.phone}</Text>
            <Text style={styles.detailTitle}>Adresse</Text>
            <Text style={styles.detail}>{roasteryData.street}, {roasteryData.postcode} {roasteryData.ort}</Text>
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
          <Image source={require('../../assets/the_barn_icon.png')} style={styles.image} />
        </ScrollView>
        <PanGestureHandler onGestureEvent={handleGesture}>
          <View style={[styles.card, { height: cardHeight }]}>
            <ScrollView>
              <Text style={styles.title}>{roasteryData ? roasteryData.roasteryName : 'Lade...'}</Text>
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
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detail: {
    fontSize: 16,
    marginVertical: 5,
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
});

export default RoasteryProfileScreen;
