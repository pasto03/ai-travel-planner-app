import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useRouter } from "expo-router"; // Use expo-router instead of useNavigation
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors"; 

const Tab = createMaterialTopTabNavigator();

const vouchers = [
  { id: "1", title: "10% Off on Your Next Flight Booking", valid: "1 Jan 2025", icon: "✈️" },
  { id: "2", title: "Free Airport Lounge Access for Your Trip", valid: "1 Jan 2025", icon: "🏅" },
  { id: "3", title: "Buy 1 Get 1 Free – City Sightseeing Tours", valid: "1 Jan 2025", icon: "🗺️" },
  { id: "4", title: "Exclusive: 20% Off at Top Restaurants", valid: "2 Feb 2025", icon: "🍽️" },
  { id: "5", title: "Enjoy $30 Off Your Next Car Rental", valid: "21 Jan 2025", icon: "🚗" },
];

const VoucherItem = ({ item }) => (
  <View style={styles.voucherCard}>
    <Text style={styles.voucherIcon}>{item.icon}</Text>
    <View style={{ flex: 1 }}>
      <Text style={styles.voucherTitle}>{item.title}</Text>
      <Text style={styles.voucherValid}>Valid until {item.valid}</Text>
    </View>
    <TouchableOpacity>
      <Text style={styles.useButton}>Use</Text>
    </TouchableOpacity>
  </View>
);

const ActiveVouchers = () => {
  const [search, setSearch] = useState("");
  const filteredVouchers = vouchers.filter((v) => v.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.contentContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Vouchers"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList data={filteredVouchers} keyExtractor={(item) => item.id} renderItem={({ item }) => <VoucherItem item={item} />} />
    </View>
  );
};

const PastVouchers = () => (
  <View style={styles.contentContainer}>
    <Text style={styles.emptyText}>No past vouchers available</Text>
  </View>
);

export default function RewardsScreen() {
  const router = useRouter(); // Initialize router for navigation

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Rewards</Text>
        </View>

        {/* Tab Navigator for Vouchers */}
        <Tab.Navigator>
          <Tab.Screen name="Active Vouchers" component={ActiveVouchers} />
          <Tab.Screen name="Past Vouchers" component={PastVouchers} />
        </Tab.Navigator>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/explore')}>
            <Ionicons name="globe-sharp" size={24} color="gray" />
            <Text style={styles.navText}>Explore</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/zouzou')}>
            <Ionicons name="compass" size={24} color="gray" />
            <Text style={styles.navText}>ZouZou</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/mytrip')}>
            <Ionicons name="location-sharp" size={24} color="gray" />
            <Text style={styles.navText}>My Trip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/totem')}>
            <Ionicons name="bookmark" size={24} color="gray" />
            <Text style={styles.navText}>Totem</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
            <Ionicons name="person-circle" size={24} color="gray" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  contentContainer: { flex: 1, paddingHorizontal: 20, backgroundColor: "#f8f9fa" },
  headerText: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  searchBar: { backgroundColor: "#fff", padding: 10, borderRadius: 8, marginBottom: 10 },
  voucherCard: { flexDirection: "row", backgroundColor: "#e3ebf5", padding: 15, borderRadius: 10, alignItems: "center", marginBottom: 10 },
  voucherIcon: { fontSize: 24, marginRight: 10 },
  voucherTitle: { fontSize: 16, fontWeight: "bold" },
  voucherValid: { fontSize: 12, color: "gray" },
  useButton: { color: "#007AFF", fontWeight: "bold" },
  emptyText: { textAlign: "center", marginTop: 20, color: "gray" },
  header: { backgroundColor: "#e8f4fc", flexDirection: "row", alignItems: "center", padding: 15, marginTop: 20 },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 26, fontFamily: "outfit-bold", textAlign: "center", flex: 1 },
  
  // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFF",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "gray" },
});
