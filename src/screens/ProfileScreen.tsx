import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileScreenProps {
  onSignOut: () => void;
  onToggleTheme: () => void;
  theme: 'light' | 'dark';
}

export default function ProfileScreen({ onSignOut, onToggleTheme, theme }: ProfileScreenProps) {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Profile
        </Text>
        
        <View className="space-y-4">
          {/* User Info */}
          <View className="bg-white rounded-xl p-6 shadow-sm">
            <View className="flex flex-row items-center space-x-4">
              <View className="rounded-full bg-blue-500 p-3">
                <Ionicons name="person" size={24} color="white" />
              </View>
              <View>
                <Text className="text-lg font-semibold text-gray-900">
                  Demo User
                </Text>
                <Text className="text-sm text-gray-500">
                  demo@example.com
                </Text>
              </View>
            </View>
          </View>
          
          {/* Settings */}
          <View className="bg-white rounded-xl shadow-sm">
            <TouchableOpacity
              onPress={onToggleTheme}
              className="flex flex-row items-center justify-between p-4 border-b border-gray-100"
            >
              <View className="flex flex-row items-center space-x-3">
                <Ionicons name="moon" size={20} color="#6b7280" />
                <Text className="text-gray-900">Theme</Text>
              </View>
              <View className="flex flex-row items-center space-x-2">
                <Text className="text-sm text-gray-500 capitalize">
                  {theme}
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#6b7280" />
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={onSignOut}
              className="flex flex-row items-center justify-between p-4"
            >
              <View className="flex flex-row items-center space-x-3">
                <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                <Text className="text-red-500">Sign Out</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
} 