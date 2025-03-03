import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PointsHistory() {
  const router = useRouter(); // Navigation hook

  // Dummy points history data
  const pointsData = [
    { id: "1", date: "Feb 23, 2025", description: "Completed 10,000 steps", points: "+50" },
    { id: "2", date: "Feb 22, 2025", description: "Redeemed voucher", points: "-30" },
    { id: "3", date: "Feb 21, 2025", description: "Completed weekly challenge", points: "+100" },
    { id: "4", date: "Feb 20, 2025", description: "Purchased premium content", points: "-20" },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Points History</Text>
      </View>

      {/* Points List */}
      <FlatList
        data={pointsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.pointItem}>
            <View style={styles.textContainer}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <Text style={[styles.points, item.points.startsWith("+") ? styles.earned : styles.spent]}>
              {item.points}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No points history available</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 10 },

  header: { 
    backgroundColor: "#e8f4fc", 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 15, 
    marginTop: 20 
  },
  backButton: { marginRight: 10 },
  headerTitle: { 
    fontSize: 26, 
    fontFamily: "outfit-bold", 
    textAlign: "center", 
    flex: 1 
  },

  pointItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  textContainer: { flex: 1 },
  date: { fontSize: 14, color: "gray", marginBottom: 5 },
  description: { fontSize: 16, fontWeight: "bold" },
  points: { fontSize: 16, fontWeight: "bold" },
  earned: { color: "#007AFF" }, // Blue for earned points
  spent: { color: "#FF3B30" },  // Red for spent points

  emptyText: { textAlign: "center", marginTop: 20, color: "gray" },
});

