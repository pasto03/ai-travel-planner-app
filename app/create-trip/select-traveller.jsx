import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import { SelectTravelsList } from "./../../constants/Options";
import OptionCard from '../../components/CreateTrip/OptionCard';

export default function SelectTraveller() {
    const navigation = useNavigation();
    const router = useRouter();
    const [selectedTraveller, setSelectedTraveller] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ""
        })
    }, [])

    useEffect(() => {
        selectedTraveller && setTripData({
            ...tripData,
            traveller: selectedTraveller
        })
    }, [selectedTraveller])

    useEffect(() => {
        console.log(tripData);
    }, [tripData])

    const onTravellerSelection = () => {
        if (selectedTraveller) router.push("/create-trip/select-dates")
        else ToastAndroid.show("Please choose your travels", ToastAndroid.LONG)
    }

    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
            height: "100%"
        }}>
            <Text style={{
                fontSize: 35,
                fontFamily: "outfit-bold",
                marginTop: 20
            }}>Who's Travelling</Text>

            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: "outfit-bold",
                    fontSize: 23
                }}>Choose your travels</Text>

                <FlatList
                    data={SelectTravelsList}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedTraveller(item)}
                            style={{
                                marginVertical: 10
                            }}>
                            <OptionCard option={item} selectedOption={selectedTraveller} />
                        </TouchableOpacity>

                    )}
                />

            </View>

            <TouchableOpacity
                activeOpacity={selectedTraveller ? 1 : 0.8}
                onPress={onTravellerSelection}
                style={{
                    padding: 15,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 15,
                    marginTop: 20,
                }}>
                <Text style={{
                    textAlign: "center",
                    color: Colors.WHITE,
                    fontFamily: "outfit-medium",
                    fontSize: 20
                }}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}