import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyPolicy() {
  return (
    <LinearGradient
      colors={['#e6f3ff', '#ffffff']}
      locations={[0.3, 0.7]}
      style={styles.container}
    >
      <Stack.Screen
        options={{
          title: 'Privacy Policy',
          headerShown: true,
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="shield-outline" size={24} color="#555" />
            <Text style={styles.cardTitle}>Privacy Policy</Text>
          </View>
          
          <Text style={styles.lastUpdated}>Last updated: 07/03/2025</Text>

          <Text style={styles.description}>
            At WeJustGo, we prioritize user privacy and data security. This policy outlines how we handle your information.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Information We Collect</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Personal Data: Name, email, and booking details (stored securely in Firebase).</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Travel Preferences: Itinerary choices and selected destinations.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Device & Usage Data: IP address, app interactions, and performance analytics.</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How We Use Your Information</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>To generate AI-powered travel itineraries.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>To facilitate bookings for flights, hotels, and attractions.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>To provide real-time travel alerts and personalized recommendations.</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Security</Text>
            <Text style={styles.description}>
              We use Firebase authentication, Firestore, and cloud storage with encryption to secure user data. Personal data is not shared with third parties for advertising.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Choices</Text>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Modify or delete account information at any time.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Opt-out of notifications and location tracking.</Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Request access to or deletion of personal data by contacting support.</Text>
            </View>
          </View>
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
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#555',
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});
