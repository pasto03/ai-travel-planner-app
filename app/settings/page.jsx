import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Settings() {
  const handleNavigation = (route) => {
    router.push(route);
  };

  const renderSettingItem = (icon, label, route = null, hasArrow = true) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={() => route && handleNavigation(route)}
    >
      <View style={styles.settingItemContent}>
        <Ionicons name={icon} size={24} color="#555" />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {hasArrow && <Ionicons name="chevron-forward" size={24} color="#555" />}
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#e6f3ff', '#ffffff']}
      locations={[0.3, 0.7]}
      style={styles.container}
    >
      <Stack.Screen 
        options={{
          title: 'Settings',
          headerShown: true,
        }} 
      />
      <ScrollView style={styles.scrollView}>
        {/* Account Settings Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="person-circle-outline" size={24} color="#555" />
            <Text style={styles.cardTitle}>Account Settings</Text>
          </View>
          {renderSettingItem('person-outline', 'Edit Profile', '/profile')}
          {renderSettingItem('lock-closed-outline', 'Change Password', '/change-password')}
        </View>

        {/* More Settings Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle-outline" size={24} color="#555" />
            <Text style={styles.cardTitle}>More</Text>
          </View>
          {renderSettingItem('paper-plane-outline', 'Send Feedback', '/feedback/page')}
          {renderSettingItem('people-outline', 'About Us', '/about/page')}
          {renderSettingItem('shield-outline', 'Privacy Policy', '/privacyPolicy/page')}
          {renderSettingItem('help-circle-outline', 'Help Centre', '/helpCenter/page')}
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
    padding: 16,
    marginBottom: 16,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
}); 