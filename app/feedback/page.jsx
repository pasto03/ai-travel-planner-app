import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { Stack, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const user = auth.currentUser;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={32}
            color={i <= rating ? '#FFD700' : '#555'}
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const handleSubmit = async () => {
    // Check if user is authenticated
    if (!user) {
      Alert.alert(
        'Authentication Required',
        'Please sign in to submit feedback.',
        [
          {
            text: 'Sign In',
            onPress: () => router.push('/auth/sign-in'),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
      return;
    }

    if (rating === 0) {
      Alert.alert(
        'Missing Rating',
        'Please provide a star rating before submitting your feedback.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (!feedback.trim()) {
      Alert.alert(
        'Missing Feedback',
        'Please provide some feedback before submitting.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Show confirmation dialog
    Alert.alert(
      'Submit Feedback',
      'Are you sure you want to submit your feedback?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: async () => {
            try {
              // Create a unique document ID using timestamp
              const docId = Date.now().toString();
              
              // Store feedback in Firestore
              await setDoc(doc(db, "Feedback", docId), {
                userEmail: user.email, // No longer need the fallback to 'anonymous'
                rating: rating,
                feedback: feedback.trim(),
                timestamp: new Date().toISOString(),
                docId: docId
              });
              
              // Show success message and navigate back
              Alert.alert(
                'Thank You!',
                'Your feedback has been received. We appreciate your input!',
                [
                  {
                    text: 'OK',
                    onPress: () => router.back(),
                  },
                ]
              );
            } catch (error) {
              console.error('Error submitting feedback:', error);
              
              // More specific error handling
              let errorMessage = 'There was an error submitting your feedback. Please try again.';
              if (error.code === 'permission-denied') {
                errorMessage = 'You do not have permission to submit feedback. Please sign in again.';
              }
              
              Alert.alert(
                'Error',
                errorMessage,
                [{ text: 'OK' }]
              );
            }
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#e6f3ff', '#ffffff']}
      locations={[0.3, 0.7]}
      style={styles.container}
    >
      <Stack.Screen
        options={{
          title: 'Send Feedback',
          headerShown: true,
        }}
      />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.header}>
          Please tell us about your suggestions, or if you had found some bugs
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>How are you feeling?</Text>
          <View style={styles.starsContainer}>
            {renderStars()}
          </View>

          <Text style={styles.inputLabel}>Describe Your Feedback...</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={6}
            value={feedback}
            onChangeText={setFeedback}
            placeholder="Write your feedback here..."
            textAlignVertical="top"
          />

          <TouchableOpacity 
            style={[
              styles.submitButton,
              (!rating || !feedback.trim()) && styles.submitButtonDisabled
            ]} 
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Send Feedback</Text>
          </TouchableOpacity>
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
  header: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  star: {
    marginHorizontal: 4,
  },
  inputLabel: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#99c9ff',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 