import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '@/constants/Colors'
import { GetPhotoRef } from '@/services/GooglePlaceAPI'
import { ItineraryPlanProps } from '@/configs/props/interface'


interface PlaceCardParams {
    plan: ItineraryPlanProps
}

export default function PlaceCard({ plan }: PlaceCardParams) {
    const [photoRef, setPhotoRef] = useState();

    useEffect(() => {
        GetGooglePhotoRef();
    })
    const GetGooglePhotoRef = async () => {
        const result = await GetPhotoRef(plan.placeName);
        setPhotoRef(result?.results[0]?.photos[0]?.photo_reference);
        // console.log(result?.results[0]?.photos[0]?.photo_reference);
    }

    return (
        <View style={{
            // borderWidth: 1,
            backgroundColor: "#e3f8ff",
            padding: 10,
            borderRadius: 15,
            borderColor: Colors.GRAY,
            marginTop: 20
        }}>
            <Image source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}` }}
                style={{
                    width: "100%",
                    height: 120,
                    borderRadius: 15
                }}
            />
            <View style={{
                marginTop: 5
            }}></View>
            <Text style={{
                fontFamily: "outfit-bold",
                fontSize: 20
            }}>{plan.placeName}</Text>
            <Text style={{
                fontFamily: "outfit",
                fontSize: 17,
            }}>{plan.placeDetails}</Text>
            <Text style={{
                fontFamily: "outfit",
                fontSize: 17,
            }}>🎫 {plan.ticketPricing}</Text>
            <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                {/* Activity Time(and Ticket) */}
                <View>
                    <Text style={{
                        fontFamily: "outfit",
                        fontSize: 17,
                    }}>⏱️ Time:
                        <Text style={{
                            fontFamily: "outfit-bold",
                            fontSize: 17,
                        }}> {plan.timeToTravel}</Text>
                    </Text>
                </View>

                {/* Navigate */}
                <TouchableOpacity style={{
                    backgroundColor: Colors.PRIMARY,
                    padding: 8,
                    borderRadius: 7
                }}>
                    <Ionicons name="navigate" size={20} color="white" />
                </TouchableOpacity>
            </View>

        </View>
    )
}