import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import { GetPhotoRef } from "@/services/GooglePlaceAPI"
import HotelCard from "./HotelCard"
import { HotelDetailsProps } from '@/configs/props/interface'


interface HotelListParams {
    hotelList: HotelDetailsProps[]
}


export default function HotelList({ hotelList }: HotelListParams) {
    return (
        <View style={{
            marginTop: 20
        }}>
            <Text style={{
                fontFamily: "outfit-bold",
                fontSize: 20
            }}>🏠 Hotel Recommendation</Text>

            <FlatList
                data={hotelList}
                style={{
                    marginTop: 8
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                renderItem={({ item, index }) => (
                    <HotelCard item={item} />
                )}
            />
        </View>
    )
}