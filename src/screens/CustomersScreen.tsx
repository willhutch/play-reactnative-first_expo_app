import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function CustomersScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Customers
        </Text>
        
        <View className="bg-white rounded-xl p-6 shadow-sm">
          <Text className="text-lg text-gray-600 text-center">
            Customer management coming soon...
          </Text>
          <Text className="text-sm text-gray-500 text-center mt-2">
            This will include customer search, details, and management features.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
} 