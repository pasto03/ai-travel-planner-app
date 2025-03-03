import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../configs/FirebaseConfig";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

export default function ProfileManagement() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [bio, setBio] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setEmail(user.email);

          // Fetch the user's profile from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setFullName(userDoc.data().fullName || '');
            setBio(userDoc.data().bio || '');
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Re-authenticate the user (for sensitive operations like updating email/password)
  const reAuthenticateUser = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User is not authenticated");

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      console.log("Re-authentication successful!");

    } catch (error) {
      console.error("Re-authentication failed:", error);
      Alert.alert("Error", "Re-authentication failed. Please check your password.");
      throw error;
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User is not authenticated");

      // Re-authenticate if updating email or password
      if (newPassword) {
        await reAuthenticateUser();
      }

      // Update password if provided
      if (newPassword) {
        await updatePassword(user, newPassword);
        console.log("Password updated successfully!");
      }

      // Update Firestore user info (Full Name and Bio)
      await updateDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        bio: bio,
      });

      Alert.alert('Profile Updated', 'Your profile information has been updated successfully!');

      // Clear the input fields after saving
      setNewPassword('');
      setCurrentPassword('');

      // Redirect to ProfileView after saving changes
      router.replace('/(tabs)/profileview');

    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert('Error', error.message);
    }
  };


  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      {/* Username */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          placeholder="Enter your username"
        />
      </View>

      {/* Current Email (Read-Only) */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Current Email:</Text>
        <TextInput
          value={email}
          style={[styles.input, { backgroundColor: Colors.LIGHT_GRAY }]}
          editable={false}
        />
      </View>

      {/* New Password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password (optional):</Text>
        <TextInput
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          style={styles.input}
          placeholder="Enter new password"
        />
      </View>

      {/* Current Password (for re-authentication) */}
      {(newPassword) && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Password (required to update email/password):</Text>
          <TextInput
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            style={styles.input}
            placeholder="Enter current password"
          />
        </View>
      )}

      {/* Bio */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bio:</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={4}
          style={styles.input}
          placeholder="Write a short bio"
        />
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Corrected typo (flexGrow instead of flexgrow)
    padding: 25,
    paddingTop: 55,
    backgroundColor: Colors.WHITE,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 35,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "outfit",
    fontSize: 18,
    color: Colors.GRAY,
    marginBottom: 5,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
  },
  button: {
    marginTop: 16,
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontFamily: "outfit",
    fontSize: 17,
  },
});
