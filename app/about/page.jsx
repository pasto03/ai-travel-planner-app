import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function AboutUs() {
  return (
    <LinearGradient
      colors={['#e6f3ff', '#ffffff']}
      locations={[0.3, 0.7]}
      style={styles.container}
    >
      <Stack.Screen
        options={{
          title: 'About Us',
          headerShown: true,
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle-outline" size={24} color="#555" />
            <Text style={styles.cardTitle}>About WeJustGo</Text>
          </View>
          
          <Text style={styles.description}>
            The WeJustGo Booking app is designed to revolutionize travel planning by offering an all-in-one platform that seamlessly integrates various services like accommodation, flight, and dining bookings. It aims to tackle the inconvenience travellers face when using multiple platforms to organize trips by centralizing all these features into a single, user-friendly app.
          </Text>

          <Text style={styles.description}>
            WeJustGo leverages AI-powered trip planning to offer customizable itineraries. Users can modify suggested itineraries by adding or removing attractions based on personal preferences. The platform also promotes local culture through a "Totem" feature, helping travellers discover and engage with authentic cultural experiences in their destination.
          </Text>

          <Text style={styles.description}>
            The app offers comprehensive services, including online ticketing for attractions, attraction recommendations, reviews, and real-time travel alerts. It also includes a step calculator for health-conscious travellers and advanced security features to ensure a safe user experience.
          </Text>

          <Text style={styles.description}>
            WeJustGo's target customers are travellers who value convenience, personalization, and security. These include tourists, business professionals, and frequent travellers looking for a hassle-free way to manage their travel plans. The app also benefits local businesses, cultural promoters, and service providers by giving them direct access to a broad customer base.
          </Text>

          <Text style={styles.description}>
            Key benefits include time-saving, personalized recommendations, and an efficient booking process for accommodations, flights, and dining. Additionally, the app fosters a deeper connection with local cultures while offering travellers real-time updates and security alerts, ensuring a smooth and enjoyable trip.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 16,
  },
}); 