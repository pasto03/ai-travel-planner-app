import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors"; 
import { useRouter } from "expo-router";

// Import your local images
import sunwayImage from '@/assets/images/sunway.jpeg';
import tealiveImage from '@/assets/images/tealive.jpeg';  
import Chagee from '@/assets/images/chagee.png';
import iphoneLD from '@/assets/images/iphone.png';
import bobbiImage from '@/assets/images/bobbi.png';

export default function Catalogue() {
  const router = useRouter(); // Initialize router for navigation
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Updated vouchers array with image imports
  const vouchers = [
    { id: 1, name: "Tealive RM5 Off", points: "500 points", image: tealiveImage, category: "F&B" },
    { id: 2, name: "Sunway Lagoon Ticket RM30 Off", points: "2,500 points", image: sunwayImage, category: "Lifestyle" },
    { id: 3, name: "Lucky Draw - iPhone", points: "3,000 points", image: iphoneLD, category: "Lucky Draw" },
    { id: 4, name: "Chagee 30% Discount", points: "1,200 points", image: Chagee, category: "F&B" },
    { id: 5, name: "Bobbi Brown 15%", points: "200 points", image: bobbiImage, category: "Lifestyle" }
  ];

  // Navigate to voucher details with query parameters
  const handleVoucherPress = (voucher) => {
    router.push({
      pathname: "/screens/[id]",
      params: {
        id: voucher.id,
        name: voucher.name,
        points: voucher.points,
        image: voucher.image,
      },
    });
  };

  // Handle category change
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  // Filter vouchers based on selected category
  const filteredVouchers = selectedCategory === "All" 
    ? vouchers 
    : vouchers.filter((voucher) => voucher.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Catalogue</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Search Rewards" placeholderTextColor="gray" />
      </View>

      <ScrollView>
        {/* Available Voucher Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Voucher</Text>
        </View>

        {/* Voucher Items */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.voucherContainer}>
          {filteredVouchers.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleVoucherPress(item)} style={styles.voucherCard}>
              <Image source={item.image} style={styles.voucherImage} />
              <Text style={styles.voucherText}>{item.name}</Text>
              <Text style={styles.voucherPoints}>{item.points}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Category Tabs */}
        <View style={styles.categoryContainer}>
          {["All", "F&B", "Lucky Draw", "Lifestyle", "Others"].map((category, index) => (
            <TouchableOpacity key={index} onPress={() => handleCategoryPress(category)}>
              <Text style={[styles.categoryText, selectedCategory === category && styles.activeCategory]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Category Items Grid */}
        <View style={styles.gridContainer}>
          {filteredVouchers.map((item) => (
            <View key={item.id} style={styles.gridItem}>
              <Image source={item.image} style={styles.gridImage} />
              <Text style={styles.gridText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation (Same as _layout.jsx) */}
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FBFF" },

  // Header
  header: {backgroundColor: "#e8f4fc", flexDirection: "row", alignItems: "center", padding: 15, marginTop: 20 },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 26, fontFamily: "outfit-bold", textAlign: "center", flex: 1 },

  // Search Bar
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    borderRadius: 25,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },

  // Section Header
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: { fontSize: 18, fontFamily: "outfit-bold" },

  // Voucher Items
  voucherContainer: { marginLeft: 20, marginTop: 10 },
  voucherCard: { marginRight: 15, backgroundColor: "#FFF", padding: 10, borderRadius: 10 },
  voucherImage: { width: 100, height: 100, borderRadius: 10 },
  voucherText: { fontSize: 14, fontFamily: "outfit-bold", marginTop: 5 },
  voucherPoints: { fontSize: 12, color: Colors.PRIMARY, fontFamily: "outfit-medium" },

  // Category Tabs
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginTop: 20,
  },
  categoryText: { fontSize: 14, fontFamily: "outfit-medium", color: "gray" },
  activeCategory: { color: Colors.PRIMARY, fontFamily: "outfit-bold" },

  // Grid Items
  gridContainer: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 20, marginTop: 10 },
  gridItem: { width: "48%", marginBottom: 15, backgroundColor: "#FFF", padding: 10, borderRadius: 10 },
  gridImage: { width: "100%", height: 100, borderRadius: 10 },
  gridText: { fontSize: 14, fontFamily: "outfit-medium", marginTop: 5 },

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
