import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from "./../../constants/Colors"
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import UserTripList from '../../components/MyTrips/UserTripList';
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "./../../configs/FirebaseConfig";
import { useRouter } from 'expo-router';


export default function MyTrip() {
  const router = useRouter();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    user && GetMyTrips();
  }, [user])

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(collection(db, "UserTrips"), where("userEmail", "==", user?.email));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prev => [...prev, doc.data()])
    });
    setLoading(false);
  }

  return (
    <ScrollView style={{
      padding: 25,
      paddingTop: 55,
      backgroundColor: Colors.WHITE,
      height: "100%"
    }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between"
        }}>
        <Text style={{
          fontFamily: "outfit-bold",
          fontSize: 35
        }}>My Trips</Text>
        <TouchableOpacity
          onPress={() => router.push("/create-trip/search-place")}
        >
          <Ionicons name="add-circle" size={50} color="black" />
        </TouchableOpacity>

      </View>

      {loading && <ActivityIndicator size={"large"} color={Colors.PRIMARY} />}
      {userTrips?.length == 0 ?
        <StartNewTripCard />
        :
        <UserTripList userTrips={userTrips.reverse()} />
      }
    </ScrollView>
  )
}