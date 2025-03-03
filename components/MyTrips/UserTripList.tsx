import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import moment from "moment"
import { Colors } from '@/constants/Colors'
import UserTripCard from "./UserTripCard"
import { UserTripsProps, TripDataProps } from '@/configs/props/interface'

interface UserTripListParams {
  userTrips: UserTripsProps[]
}

export default function UserTripList({ userTrips }: UserTripListParams) {
  const LatestTrip: TripDataProps = JSON.parse(userTrips[0].tripData);
  const router = useRouter();

  return (
    <View>
      <View style={{
        marginTop: 20
      }}>
        <Image
          // source={require("./../../assets/images/image 1.jpeg")}
          source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${LatestTrip.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}` }}
          style={{
            width: "100%",
            height: 240,
            objectFit: "cover",
            borderRadius: 15
          }}
        />
        <View style={{ marginTop: 10 }}>
          <Text style={{
            fontFamily: "outfit-medium",
            fontSize: 24
          }}>
            {/* {userTrips[0]?.tripPlan?.travelPlan?.destination} */}
            {LatestTrip.locationInfo.name}
          </Text>

          <View style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}>
            <Text style={{
              fontFamily: "outfit",
              fontSize: 17,
              color: Colors.GRAY
            }}>{moment(LatestTrip.startDate).format("DD MMM yyyy")}</Text>

            <Text style={{
              fontFamily: "outfit",
              fontSize: 17,
              color: Colors.GRAY
            }}>🚌 {LatestTrip.traveller.title}</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log("userTrip: " + JSON.stringify(userTrips[0]));

              router.push({
                pathname: "/trip-details", params: {
                  trip: JSON.stringify(userTrips[0])
                }
              })
            }
            }
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 15,
              borderRadius: 15,
              marginTop: 10
            }}>
            <Text style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit-medium",
              fontSize: 15
            }}>See your plan</Text>
          </TouchableOpacity>

        </View>

        {userTrips.map((trip, index) =>
          <View>
            <UserTripCard trip={trip} />
          </View>
        )}

      </View>
    </View>
  )
}