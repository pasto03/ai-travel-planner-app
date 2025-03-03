import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { FlightProps } from '@/configs/props/interface'


interface FlightInfoParams {
  flightData: FlightProps
}

export default function FlightInfo({ flightData }: FlightInfoParams) {
  // console.log(flightData);

  return (
    <View style={{
      marginTop: 20,
      borderWidth: 1,
      borderColor: Colors.LIGHT_GRAY,
      padding: 10,
      borderRadius: 15
    }}>

      <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <Text style={{
          fontFamily: "outfit-bold",
          fontSize: 20
        }}>✈ Flights</Text>
        <TouchableOpacity style={{
          backgroundColor: Colors.PRIMARY,
          padding: 5,
          width: 100,
          borderRadius: 7
        }}>
          <Text style={{
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit"
          }}>Book Here</Text>
        </TouchableOpacity>
      </View>

      {/* Futue Update: Get Real Airline Details by API */}
      <Text style={{
        fontFamily: "outfit",
        fontSize: 17,
        marginTop: 7
      }}>Airline: Delta</Text>

      <Text style={{
        fontFamily: "outfit",
        fontSize: 17
      }}>Price: {flightData.price}</Text>
    </View>
  )
}