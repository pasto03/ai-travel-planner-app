import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";  // Import useRouter for navigation

import sunwayImage from '@/assets/images/sunway.jpeg';
import tealiveImage from '@/assets/images/tealive.jpeg';
import bobbiImage from '@/assets/images/bobbi.png';


export default function ZouZou() {
  const router = useRouter(); // Initialize useRouter to enable navigation

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FBFF" }}>
      {/* Header */}
      <View style={{ backgroundColor: "#e8f4fc", paddingVertical: 15, paddingHorizontal: 1, marginTop: 20 }}>
        <Text style={{ fontSize: 26, fontFamily: "outfit-bold", textAlign: "center" }}>
          ZouZou
        </Text>
      </View>

      <Text style={{ textAlign: "center", color: Colors.GRAY, fontFamily: "outfit" }}>
        Convert your steps into points for rewards!
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Wrapper Container */}
        <View style={{ paddingHorizontal: 20 }}>
          {/* Points & Redeem */}
          <View style={[styles.card]}>
            <Text style={[styles.pointsText, { color: '#285188' }]}>
              3,681 <Text style={[styles.pointsLabel, { color: '#285188' }]}>points</Text>
            </Text>
            <Text style={styles.lastUpdated}>Last updated 15 Aug, 16:40</Text>

            <TouchableOpacity style={[styles.redeemButton, { backgroundColor: '#eff5f8' }]}>
              <Text style={[styles.redeemText, {color : '#335a8d'}]}>Redeem now</Text>
            </TouchableOpacity>

            {/* Expiring Points */}
            <View style={styles.expiringPoints}>
              <Ionicons name="warning-outline" size={18} color={Colors.PRIMARY} />
              <Text style={styles.expiringText}>666 points will expire by 05 Sept 2025</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabsContainer}>
            {[
              { name: "Catalogue", icon: "pricetag-outline", route: "/screens/catalogue" },
              { name: "Rewards", icon: "gift-outline", route: "/screens/rewards" },
              { name: "My Steps", icon: "footsteps-outline", route: "/screens/mysteps" },
              { name: "Point History", icon: "time-outline", route: "/screens/pointhistory" }
            ].map((tab, index) => (
              <TouchableOpacity key={index} style={styles.tab} onPress={() => router.push(tab.route)}>
                <Ionicons name={tab.icon} size={24} color="#284c84" />
                <Text style={[styles.tabText, { color: "#284c84" }]}>{tab.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Available Vouchers */}
          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitle}>Available Vouchers</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[
                { name: "Tealive RM5 Off", points: 500, image: tealiveImage, id: 1 },
                { name: "Sunway Lagoon RM30 Off", points: 2500, image: sunwayImage, id: 2 },
                { name: "Bobbi Brown 15%", points: 200, image: bobbiImage, id: 3 }
              ].map((voucher, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.voucherCard}
                  onPress={() => router.push(`/screens/voucherDetails/${voucher.id}`)} // Navigate to voucher details
                >
                 <Image source={voucher.image} style={styles.voucherImage} />
                  <Text style={styles.voucherTitle}>{voucher.name}</Text>
                  <Text style={styles.voucherPoints}>{voucher.points} points</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* How to collect points */}
          <View style={styles.collectPointsCard}>
            <Text style={styles.collectTitle}>How to collect points?</Text>
            <Text style={styles.collectDescription}>10,000 Steps = 1,000 Points</Text>
            <Text style={styles.collectDescription}>Walk to get more Points!</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Styles
const styles = {
  card: {
    backgroundColor: "#c0dcfc",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  pointsText: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    textAlign: "center",
  },
  pointsLabel: {
    fontSize: 16,
    color: Colors.GRAY,
  },
  lastUpdated: {
    fontSize: 12,
    textAlign: "center",
    color: Colors.GRAY,
    marginBottom: 10,
  },
  redeemButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  redeemText: {
    color: "white",
    fontFamily: "outfit-medium",
    fontSize: 16,
  },
  expiringPoints: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF2FF",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  expiringText: {
    fontSize: 12,
    marginLeft: 5,
    color: Colors.GRAY,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  tab: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    fontFamily: "outfit-medium",
    color: Colors.GRAY,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    marginBottom: 10,
  },
  voucherCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  voucherImage: {
    width: 100,
    height: 80,
    borderRadius: 5,
  },
  voucherTitle: {
    fontSize: 14,
    fontFamily: "outfit-medium",
    marginTop: 5,
  },
  voucherPoints: {
    fontSize: 12,
    color: Colors.GRAY,
  },
  collectPointsCard: {
    backgroundColor: "#c0dcfc",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  collectTitle: {
    fontSize: 16,
    fontFamily: "outfit-bold",
    marginBottom: 5,
  },
  collectDescription: {
    fontSize: 14,
    fontFamily: "outfit-bold",
    color: "#284c84",
  },
};
