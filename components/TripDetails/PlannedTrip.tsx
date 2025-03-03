import { View, Text } from 'react-native'
import React from 'react'
import PlaceCard from './PlaceCard';
import { ItineraryProps } from '@/configs/props/interface';

interface PlannedTripParams {
    itinerarys: ItineraryProps[]
}

export default function PlannedTrip({ itinerarys }: PlannedTripParams) {
    return (
        <View style={{
            marginTop: 20
        }}>
            <Text style={{
                fontFamily: "outfit-bold",
                fontSize: 20
            }}>🏕️ Plan Details</Text>

            {itinerarys.map((itinerary) => (
                <View>
                    <Text style={{
                        fontFamily: "outfit-medium",
                        fontSize: 20,
                        marginTop: 20
                    }}>Day {itinerary.day}</Text>
                    {itinerary.plans.map((plan) => (
                        <PlaceCard plan={plan} />
                    ))}
                </View>
            ))}
        </View>
    )
}