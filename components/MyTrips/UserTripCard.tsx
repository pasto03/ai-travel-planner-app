import { View, Text, Image } from 'react-native'
import React from 'react'
import { TripDataProps } from '../CreateTrip/tripData'
import { UserTripsProps } from './props';
import moment from 'moment';
import { Colors } from '@/constants/Colors';

interface UserTripCardParams {
    trip: UserTripsProps
}

export default function UserTripCard({ trip }: UserTripCardParams) {
    const LatestTrip: TripDataProps = JSON.parse(trip.tripData);
    return (
        <View style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center"
        }}>
            <Image
                // source={require("./../../assets/images/image 1.jpeg")}
                source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${LatestTrip.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}` }}
                style={{
                    width: 100,
                    height: 100,
                    // objectFit: "cover",
                    borderRadius: 15
                }}
            />

            <View>
                <Text style={{
                    fontFamily: "outfit-medium",
                    fontSize: 18,
                }}>{LatestTrip?.locationInfo.name}</Text>
                <Text style={{
                    fontFamily: "outfit",
                    fontSize: 14,
                    color: Colors.GRAY
                }}>{moment(LatestTrip.startDate).format("DD MMM yyyy")}</Text>
                <Text style={{
                    fontFamily: "outfit",
                    fontSize: 14,
                    color: Colors.GRAY
                }}>Travelling: {LatestTrip.traveller.title}</Text>
            </View>
        </View>
    )
}