import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { IP } from '../../../config';

type RootStackParamList = {
    BeanProfile: { beanId: string };
};

const screenHeight = Dimensions.get('window').height;
const cardInitialHeight = screenHeight * 0.6;

const BeanProfileScreen: React.FC = () => {
    const [cardHeight, setCardHeight] = useState(cardInitialHeight);
    const [activeTab, setActiveTab] = useState('Beschreibung');
    const [coffeeBean, setCoffeeBean] = useState<any>(null);
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const route = useRoute<RouteProp<RootStackParamList, 'BeanProfile'>>();
    const { beanId } = route.params;

    useEffect(() => {
        const fetchCoffeeBean = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://${IP}:8080/api/beantypes/${beanId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Coffee Bean Data:', data);
                setCoffeeBean(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchCoffeeBean();

    }, [beanId]);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleGesture = ({ nativeEvent }: any) => {
        setCardHeight(Math.max(cardInitialHeight, cardInitialHeight - nativeEvent.translationY));
    };

    const renderTabContent = () => {
        if (!coffeeBean) {
            return <Text>Keine Kaffeebohnendaten verfügbar</Text>;
        }

        switch (activeTab) {
            case 'Beschreibung':
                return (
                    <>
                        <Text style={styles.detail}>{coffeeBean.typeExplanation}</Text>
                        <Text style={styles.detailTitle}>Koffeinmenge</Text>
                        <Text style={styles.detail}>{coffeeBean.caffeineAmount}</Text>
                        <Text style={styles.detailTitle}>Bohnengröße</Text>
                        <Text style={styles.detail}>{coffeeBean.beanFormSize}</Text>
                        <Text style={styles.detailTitle}>Geschmackstyp</Text>
                        <Text style={styles.detail}>{coffeeBean.tasteType}</Text>
                        <Text style={styles.detailTitle}>Aromatyp</Text>
                        <Text style={styles.detail}>{coffeeBean.aromaType}</Text>
                        <Text style={styles.detailTitle}>Durchschnittspreis (kg)</Text>
                        <Text style={styles.detail}>{coffeeBean.avgPrice}</Text>
                        {/* Platzhalter am Ende des ScrollView */}
                        <View style={{ height: 200 }}></View>
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
                    <Image source={require('../../assets/back_icon.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton}>
                    <Image source={require('../../assets/share_icon.png')} style={styles.icon} />
                </TouchableOpacity>
                <ScrollView horizontal pagingEnabled style={styles.imageContainer}>
                    <Image source={require('../../assets/arabica_bean.png')} style={styles.image} />
                </ScrollView>
                <PanGestureHandler onGestureEvent={handleGesture}>
                    <View style={[styles.card, { height: cardHeight }]}>
                        <Text style={styles.title}>{coffeeBean ? coffeeBean.typeDefinition : 'Lade...'}</Text>
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
                        <ScrollView>
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

export default BeanProfileScreen;
