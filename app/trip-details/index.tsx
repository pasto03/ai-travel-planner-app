import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import moment from 'moment'

import { Colors } from '@/constants/Colors'
import FlightInfo from "@/components/TripDetails/FlightInfo";
import HotelList from '@/components/TripDetails/HotelList'
import PlannedTrip from '@/components/TripDetails/PlannedTrip'
import { UserTripsProps, TripDataProps } from '@/configs/props/interface'

type SearchParamsProps = {
    trip: string // UserTripsProps in string
}

export default function TripDetails() {
    const navigation = useNavigation();
    const { trip } = useLocalSearchParams<SearchParamsProps>();

    const [userTrip, setUserTrip] = useState<UserTripsProps>();
    const [tripDetails, setTripDetails] = useState<TripDataProps>();
    // const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ""
        })

        const userTrip: UserTripsProps = JSON.parse(trip);
        setUserTrip(userTrip);

        const _tripDetails: TripDataProps = JSON.parse(userTrip.tripData);
        setTripDetails(_tripDetails);
    }, [])

    return userTrip && tripDetails && (
        <ScrollView>
            <Image
                // source={require("./../../assets/images/image 1.jpeg")}
                source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripDetails?.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}` }}
                style={{
                    width: "100%",
                    height: 330,
                }}
            />

            <View style={{
                padding: 15,
                backgroundColor: Colors.WHITE,
                height: "100%",
                marginTop: -30,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30
            }}>
                <Text style={{
                    fontSize: 25,
                    fontFamily: "outfit-bold"
                }}>{tripDetails.locationInfo.name}</Text>

                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5
                }}>
                    <Text style={{
                        fontFamily: "outfit",
                        fontSize: 18,
                        color: Colors.GRAY
                    }}>{moment(tripDetails.startDate).format("DD MMM yyyy")}</Text>

                    <Text style={{
                        fontFamily: "outfit",
                        fontSize: 18,
                        color: Colors.GRAY
                    }}>- {moment(tripDetails.endDate).format("DD MMM yyyy")}</Text>
                </View>
                <Text style={{
                    fontFamily: "outfit",
                    fontSize: 17,
                    color: Colors.GRAY
                }}>🚌 {tripDetails.traveller.title}</Text>

                {/* Flight Info */}
                <FlightInfo flightData={userTrip.tripPlan.travelPlan.flight} />

                {/* Hotels List */}
                <HotelList hotelList={userTrip?.tripPlan.travelPlan?.hotels} />

                {/* Trip Day Planner Info */}
                <PlannedTrip itinerarys={userTrip?.tripPlan?.travelPlan?.itinerary} />

            </View>

        </ScrollView>
    )
}