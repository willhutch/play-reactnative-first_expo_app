import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LatestInvoice {
  id: string;
  amount: string;
  name: string;
  email: string;
  image_url: string;
}

interface LatestInvoicesProps {
  invoices: LatestInvoice[];
}

export default function LatestInvoices({ invoices }: LatestInvoicesProps) {
  return (
    <View className="w-full rounded-xl bg-white p-6 shadow-sm">
      <Text className="text-xl font-bold text-gray-900 mb-4">
        Latest Invoices
      </Text>
      <ScrollView className="space-y-3">
        {invoices.map((invoice) => (
          <View
            key={invoice.id}
            className="flex flex-row items-center justify-between rounded-lg bg-gray-50 p-4"
          >
            <View className="flex flex-row items-center space-x-3">
              <View className="rounded-full bg-gray-300 p-2">
                <Ionicons name="person" size={20} color="#6b7280" />
              </View>
              <View>
                <Text className="font-medium text-gray-900">
                  {invoice.name}
                </Text>
                <Text className="text-sm text-gray-500">
                  {invoice.email}
                </Text>
              </View>
            </View>
            <Text className="font-bold text-gray-900">
              {invoice.amount}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
} 