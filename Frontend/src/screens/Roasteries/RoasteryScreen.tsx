import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp, useNavigation, useIsFocused } from '@react-navigation/native';
import { API_URL } from '../../../config';
import { RootStackParamList } from '../../navigation/types';

interface Roastery {
    id: string;
    roasteryName: string;
    roasteryDescription: string;
    Postcode: number;
    email: string;
    phone: string;
    street: string;
    ort: string;
    country: string;
    logoUrl: string;
    contactPersonFirstName: string;
    contactPersonLastName: string;
    housenumber: string;
}

const RoasteriesScreen = () => {
    const [roasteries, setRoasteries] = useState < Roastery[] > ([]);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const isFocused = useIsFocused(); // Hook to check if the screen is focused

    const fetchRoasteries = async () => {
        try {
            const response = await fetch(`${API_URL}/api/roasteries`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: Roastery[] = await response.json();
            console.log(data);
            setRoasteries(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            fetchRoasteries();
        }
    }, [isFocused]); // Re-fetch the data when the screen is focused

    const handleBack = () => {
        navigation.goBack();
    };

    const handleGoToRoasteryProfile = (id: string) => {
        navigation.navigate('RoasteryProfile', { roasteryId: id });
    };

    const handleAddRoastery = () => {
        navigation.navigate('AddRoastery');
    };

    const handleDeleteRoastery = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}/api/roasteries/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            Alert.alert('Erfolg', 'Die Rösterei wurde erfolgreich gelöscht.');
            fetchRoasteries(); // Refresh the list
        } catch (error) {
            console.error('Delete error:', error);
            Alert.alert('Error', 'Failed to delete roastery. Please try again later.');
        }
    };

    const confirmDeleteRoastery = (id: string) => {
        Alert.alert(
            'Bestätigung',
            'Möchten Sie diese Rösterei wirklich löschen?',
            [
                {
                    text: 'Abbrechen',
                    style: 'cancel',
                },
                {
                    text: 'Ja',
                    onPress: () => handleDeleteRoastery(id),
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            {/* Back Icon */}
            <TouchableOpacity style={styles.backIconContainer} onPress={handleBack}>
                <Image source={require('../../assets/back_icon.png')} style={styles.backIcon} />
            </TouchableOpacity>
            {/* Überschrift */}
            <Text style={styles.title}>Röstereien</Text>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search here" />
                <Image source={require('../../assets/search_icon.png')} style={styles.searchIcon} />
            </View>
            <ScrollView style={styles.roasteriesContainer}>
                {roasteries.map((roastery) => (
                    <TouchableOpacity
                        key={roastery.id}
                        onPress={() => handleGoToRoasteryProfile(roastery.id)}
                        onLongPress={() => confirmDeleteRoastery(roastery.id)} // Add long press handler
                    >
                        <View style={styles.roasteryBox}>
                            <View style={styles.roasteryInfo}>
                                <Text style={styles.roasteryName}>{roastery.roasteryName}</Text>
                                <Text style={styles.roasteryAddress}>{roastery.street}{roastery.housenumber}</Text>
                                <Text style={styles.roasteryAddress}>{roastery.Postcode}{roastery.ort}</Text>
                            </View>
                            <Image source={roastery.logoUrl ? { uri: roastery.logoUrl } : require('../../assets/blend_roastery_icon.png')} style={styles.logo} />
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={handleAddRoastery}>
                <Image source={require('../../assets/plus_icon.png')} style={styles.plusIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
        paddingTop: 50,
    },
    backIconContainer: {
        position: 'absolute',
        top: 55,
        left: 30,
        zIndex: 1,
    },
    backIcon: {
        width: 20,
        height: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        height: 50,
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 20,
        paddingRight: 40,
        backgroundColor: '#F2F2F2',
        borderColor: '#F2F2F2',
        color: '#663300',
    },
    searchIcon: {
        position: 'absolute',
        right: 10,
        width: 20,
        height: 20,
        marginRight: 10
    },
    roasteriesContainer: {
        marginBottom: 16,
    },
    roasteryBox: {
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        borderRadius: 8,
        marginBottom: 12,
        justifyContent: 'space-between',
    },
    logo: {
        width: 70,
        height: 70,
        borderRadius: 25,
    },
    roasteryInfo: {
        flexDirection: 'column',
        flex: 1,
    },
    roasteryName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    roasteryAddress: {
        fontSize: 14,
        color: '#777',
    },
    addButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'transparent',
        borderRadius: 20,
        padding: 10,
    },
    plusIcon: {
        width: 30,
        height: 30,
    },
});

export default RoasteriesScreen;