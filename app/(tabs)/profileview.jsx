// Prerequisites 
// 1. Make sure firestore has a new "users" collection
// 2. Add new section of rule to firestore: 
/*
  match /users/{userId} {
    allow read, update: if request.auth.uid == userId;
    allow create: if request.auth.uid != null;
  }
*/
// 3. Modified a section of code in sign-up index.js and added some imports
// 4. Added a settings icon in assets/images
// 5. The page to edit profile info is is called profileEdit.jsx under /app

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./../../configs/FirebaseConfig";

export default function ProfileView() {
  const [userData, setUserData] = useState({
    fullName: '',
    bio: '',
    accountCreation: '',
    points: 0,
  });

  const router = useRouter();

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
  
          // Extract creation date (Assuming createdAt is stored as a Firestore Timestamp)
          const createdAt = userData.createdAt?.toDate() || user.metadata.creationTime;
  
          const accountCreationDate = new Date(createdAt);
          const month = accountCreationDate.toLocaleString("default", { month: "long" });
          const year = accountCreationDate.getFullYear();
  
          setUserData({
            fullName: userData.fullName || '',
            bio: userData.bio || '',
            accountCreation: `${month} ${year}`, // Store Month and Year
            points: userData.points || 0,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      Alert.alert('Error', "Failed to load profile information.");
    }
  };

  // Sign out

  const handleSignOut = async () => {
      try {
        await auth.signOut();
        Alert.alert('Signed Out', 'You have been signed out.');
        router.replace('/auth/sign-in');
      } catch (error) {
        console.error("Error signing out:", error);
        Alert.alert('Error', error.message);
      }
    };
  

  // Fetch data on page focus (refresh when user navigates back)
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Settings Icon on Top Right */}
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => router.push('/(tabs)/settings')} // Navigate to settings path
      >
        <Image source={require("./../../assets/images/settings-icon.png")} 
          style={{
              width: 50,
              height: 50}} 
        />
      </TouchableOpacity>

      <Text style={styles.title}>Profile</Text>

      {/* Username */}
      <View style={styles.infoContainer}>

        
        <Text style={styles.info}>{userData.fullName}</Text>

        {/* Account Creation Date */}
        <Text style={{
              fontFamily: "outfit",
              fontSize: 16,
              color: Colors.GRAY,
              marginTop: 5,
              }}>Joined at {userData.accountCreation}</Text>

      </View>

      {/* Bio Section with Placeholder */}
      <View style={{
          borderWidth: 1,
          borderColor: Colors.GRAY,
          borderRadius: 12,
          padding: 15,
          marginVertical: 20,
          backgroundColor: Colors.LIGHT_GRAY,
          fontFamily: "outfit",
          fontSize: 18,
          color: Colors.BLACK,
          }}>

          <Text style={{ 
              fontSize: 16,
              color: Colors.GRAY }}>{userData.bio ? userData.bio : "Write a little something about yourself..."}</Text>
            
      </View>


      {/*My rewards*/}      
      <View
          style={{
            borderWidth: 1,
            borderColor: Colors.GRAY,
            borderRadius: 12,
            padding: 15,
            marginVertical: 20,
            backgroundColor: Colors.LIGHT_GRAY,
            fontFamily: "outfit",
            fontSize: 18,
            color: Colors.BLACK,
          }}
      >

          <View style={{
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center' }}>

              {/*Modify later to show collected points*/}
              <Text
                  style={{
                    color: Colors.BLACK,
                    textAlign: "left",
                    fontFamily: "outfit",
                    fontSize: 20,
                  }}>{userData.points} Points Collected</Text>          
            
              <TouchableOpacity
                  onPress={() => router.push("/(tabs)/myrewards")}
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.GRAY,
                    padding: 10,
                    backgroundColor: Colors.WHITE,
                    borderRadius: 15,
                  }}>
              
                  <Text
                      style={{
                        color: Colors.BLACK,
                        textAlign: "center",
                        fontFamily: "outfit",
                        fontSize: 18,
                      }}>My Rewards</Text>
          
              </TouchableOpacity>

          </View>
              
      </View>

      {/* Edit Profile Button */}

      <TouchableOpacity style={styles.button} onPress={() => router.push("/profileEdit")}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/*Sign out button*/}

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 55,
    backgroundColor: Colors.WHITE,
    height: "100%",
  },

  settingsIcon: {
    position: 'absolute',
    top: 55,
    right: 30,
    zIndex: 10,
  },

  title: {
    fontSize: 35,
    fontFamily: "outfit-bold",
    marginBottom: 30,
    textAlign: "left",
  },

  infoContainer: {
    marginBottom: 25,
  },

  label: {
    fontFamily: "outfit",
    fontSize: 18,
    color: Colors.GRAY,
    marginBottom: 5,
  },

  info: {
    fontFamily: "outfit-bold",
    fontSize: 22,
    color: Colors.BLACK,
  },

  button: {
    marginTop: 40,
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
  },

  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 18,
  },
});
