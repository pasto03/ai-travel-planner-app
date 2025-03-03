import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router"; // Use the router and localSearchParams hooks
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import sunwayImage from '@/assets/images/sunway.jpeg';
import tealiveImage from '@/assets/images/tealive.jpeg';
import bobbiImage from '@/assets/images/bobbi.png';

export default function VoucherDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get the voucher ID from the route params

  const [voucher, setVoucher] = useState(null);

  useEffect(() => {
    // Here, simulate fetching voucher details based on the `id`
    const vouchers = [
      { id: "1", name: "Tealive RM5 Off", points: 500, image: tealiveImage, description: "Enjoy a RM5 discount at Tealive." },
      { id: "2", name: "Sunway Lagoon RM30 Off", points: 2500, image: sunwayImage, description: "Get RM30 off your Sunway Lagoon ticket." },
      { id: "3", name: "Bobbi Brown 15%", points: 200, image: bobbiImage, description: "Save 15% on Bobbi Brown products." },
    ];

    const foundVoucher = vouchers.find((voucher) => voucher.id === id);
    setVoucher(foundVoucher);
  }, [id]);

  if (!voucher) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voucher Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Voucher Image */}
        <Image source={voucher.image} style={styles.voucherImage} />

        {/* Voucher Name */}
        <Text style={styles.voucherName}>{voucher.name}</Text>
        <Text style={styles.voucherPoints}>{voucher.points} points required</Text>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{voucher.description}</Text>

        {/* Terms & Conditions */}
        <Text style={styles.sectionTitle}>Terms & Conditions</Text>
        <Text style={styles.terms}>"Valid for one-time use only.",
      "Cannot be combined with other promotions.",
      "Expires on 30th June 2025.",
      "Redeemable via the app only.".</Text>
      </ScrollView>

      {/* Redeem Button */}
      <TouchableOpacity style={styles.redeemButton}>
        <Text style={styles.redeemText}>Redeem Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FBFF" },
  header: {backgroundColor: "#e8f4fc", flexDirection: "row", alignItems: "center", padding: 15, marginTop: 20 },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 26, fontFamily: "outfit-bold", textAlign: "center", flex: 1 },
  content: { paddingHorizontal: 20, alignItems: "center", paddingBottom: 20 },
  voucherImage: { width: "100%", height: 200, borderRadius: 10, marginBottom: 15 },
  voucherName: { fontSize: 22, fontFamily: "outfit-bold", textAlign: "center" },
  voucherPoints: { fontSize: 16, color: "blue", fontFamily: "outfit-medium", textAlign: "center", marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontFamily: "outfit-bold", marginTop: 20, alignSelf: "flex-start" },
  description: { fontSize: 14, fontFamily: "outfit-medium", color: "gray", marginTop: 5, textAlign: "left" },
  terms: { fontSize: 14, fontFamily: "outfit-medium", color: "gray", marginTop: 5, textAlign: "left" },
  redeemButton: { backgroundColor: "#284c84", padding: 15, borderRadius: 10, margin: 20, alignItems: "center" },
  redeemText: { color: "#FFF", fontSize: 18, fontFamily: "outfit-bold" },
});
