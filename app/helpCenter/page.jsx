import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HelpCenter() {
  return (
    <LinearGradient
      colors={['#e6f3ff', '#ffffff']}
      locations={[0.3, 0.7]}
      style={styles.container}
    >
      <Stack.Screen
        options={{
          title: 'Help Center',
          headerShown: true,
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="help-circle-outline" size={24} color="#555" />
            <Text style={styles.cardTitle}>Help Center</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>FAQs</Text>

            <View style={styles.faqItem}>
              <Text style={styles.question}>1. How does WeJustGo generate travel itineraries?</Text>
              <Text style={styles.answer}>Our AI system analyzes your preferences to suggest customized trip plans.</Text>
            </View>

            <View style={styles.faqItem}>
              <Text style={styles.question}>2. Can I modify my itinerary after planning?</Text>
              <Text style={styles.answer}>Yes, itineraries can be adjusted before finalizing bookings.</Text>
            </View>

            <View style={styles.faqItem}>
              <Text style={styles.question}>3. How do I manage my bookings?</Text>
              <Text style={styles.answer}>Go to Bookings {'>'} Manage My Trips to view, modify, or cancel reservations based on provider policies.</Text>
            </View>

            <View style={styles.faqItem}>
              <Text style={styles.question}>4. How does WeJustGo ensure data security?</Text>
              <Text style={styles.answer}>We implement encryption and cloud security to safeguard user data.</Text>
            </View>

            <View style={styles.faqItem}>
              <Text style={styles.question}>5. What should I do if I experience app issues?</Text>
              <View style={styles.bulletPoints}>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>Ensure the app is updated.</Text>
                </View>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>Restart the app and check the internet connection.</Text>
                </View>
                <View style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>Contact support if the issue persists.</Text>
                </View>
              </View>
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
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 24,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  answer: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  bulletPoints: {
    marginTop: 8,
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
