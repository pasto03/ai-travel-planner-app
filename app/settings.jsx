import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function Settings() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginRight: 15,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{
          fontFamily: "outfit-bold",
          fontSize: 24,
        }}>Settings</Text>
      </View>
      
      {/* Add your settings options here */}
      <View style={{ gap: 20 }}>
        <Text style={{
          fontFamily: "outfit",
          fontSize: 16,
        }}>Your settings options will appear here</Text>
      </View>
    </View>
  )
} 