import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { TripDataProps } from '../CreateTrip/tripData';
import { UserTripsProps } from './props';
import moment from 'moment';
import { Colors } from '@/constants/Colors';

interface UserTripCardParams {
    trip: UserTripsProps;
}

export default function UserTripCard({ trip }: UserTripCardParams) {
    const router = useRouter();
    const LatestTrip: TripDataProps = JSON.parse(trip.tripData);

    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: '/trip-details',
                    params: { trip: JSON.stringify(trip) },
                })
            }
            style={{
                marginTop: 20,
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                backgroundColor: "white",
                padding: 10,
                borderRadius: 15,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
            }}
        >
            <Image
                source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${LatestTrip.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`,
                }}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 15,
                }}
            />

            <View>
                <Text style={{ fontFamily: "outfit-medium", fontSize: 18 }}>
                    {LatestTrip?.locationInfo.name}
                </Text>
                <Text style={{ fontFamily: "outfit", fontSize: 14, color: Colors.GRAY }}>
                    {moment(LatestTrip.startDate).format("DD MMM yyyy")}
                </Text>
                <Text style={{ fontFamily: "outfit", fontSize: 14, color: Colors.GRAY }}>
                    Travelling: {LatestTrip.traveller.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
