import { View, Text, FlatList, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { SelectBudgetOptions } from '../../constants/Options';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function SelectBudget() {
    const navigation = useNavigation();
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ""
        })
    }, [])

    useEffect(() => {
        selectedOption && setTripData({
            ...tripData,
            budget: selectedOption?.title
        })
    }, [selectedOption])

    useEffect(() => {
        console.log("select-budget", tripData);
    }, [tripData])

    const onBudgetSelection = () => {
        if (!selectedOption) {
            ToastAndroid.show("Please choose your spending habits", ToastAndroid.LONG);
            return
        }

        router.push("/create-trip/review-trip")
    }

    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
            height: "100%"
        }}>
            <Text style={{
                fontFamily: "outfit-bold",
                fontSize: 35,
                marginTop: 25
            }}>Budget</Text>

            <View style={{
                marginTop: 20
            }}>
                <Text style={{
                    fontFamily: "outfit-bold",
                    fontSize: 20
                }}>Choose spending habits for your trip</Text>

                <FlatList
                    data={SelectBudgetOptions}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedOption(item)}
                            style={{
                                marginVertical: 10
                            }}>
                            <OptionCard option={item} selectedOption={selectedOption} />
                        </TouchableOpacity>

                    )}
                />
            </View>

            <TouchableOpacity
                // activeOpacity={selectedOption ? 1 : 0.8}
                onPress={onBudgetSelection}
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