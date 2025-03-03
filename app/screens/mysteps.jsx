import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ProgressBar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function MySteps() {
  const router = useRouter(); // Initialize router

  const stepGoal = 10000; // Daily step goal
  const currentSteps = 6500; // Steps taken today
  const progress = currentSteps / stepGoal; // Progress calculation

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>My Steps</Text>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Step Count Display */}
        <View style={styles.stepContainer}>
          <MaterialCommunityIcons name="run" size={50} color="#007AFF" />
          <Text style={styles.stepCount}>{currentSteps}</Text>
          <Text style={styles.goalText}>of {stepGoal} steps</Text>
        </View>

        {/* Progress Bar */}
        <ProgressBar progress={progress} color="#007AFF" style={styles.progressBar} />

        {/* Step History */}
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Step History</Text>
          <View style={styles.historyRow}>
            <Text style={styles.historyText}>Yesterday</Text>
            <Text style={styles.historyValue}>8,200 steps</Text>
          </View>
          <View style={styles.historyRow}>
            <Text style={styles.historyText}>2 Days Ago</Text>
            <Text style={styles.historyValue}>7,400 steps</Text>
          </View>
        </View>

        {/* Navigation Button */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push("/zouzou")} // Navigate to zouzou.jsx
        >
          <Text style={styles.buttonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: "#e8f4fc",
    flexDirection: "row",
    alignItems: "center", 
    padding: 20,
    marginTop: 20
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  stepCount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#007AFF",
  },
  goalText: {
    fontSize: 16,
    color: "#555",
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  historyContainer: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  historyText: {
    fontSize: 16,
    color: "#555",
  },
  historyValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#284c84",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
