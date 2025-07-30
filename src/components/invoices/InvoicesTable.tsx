import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Invoice {
  id: string;
  amount: string;
  date: string;
  status: 'pending' | 'paid';
  name: string;
  email: string;
}

interface InvoicesTableProps {
  invoices: Invoice[];
  onInvoicePress?: (id: string) => void;
}

export default function InvoicesTable({ invoices, onInvoicePress }: InvoicesTableProps) {
  const getStatusColor = (status: string) => {
    return status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const getStatusIcon = (status: string) => {
    return status === 'paid' ? 'checkmark-circle' : 'time';
  };

  return (
    <View className="w-full rounded-xl bg-white shadow-sm">
      <ScrollView className="space-y-0">
        {invoices.map((invoice) => (
          <TouchableOpacity
            key={invoice.id}
            onPress={() => onInvoicePress?.(invoice.id)}
            className="flex flex-row items-center justify-between border-b border-gray-200 p-4"
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
            <View className="flex items-end space-y-1">
              <Text className="font-bold text-gray-900">
                {invoice.amount}
              </Text>
              <View className={`flex flex-row items-center space-x-1 rounded-full px-2 py-1 ${getStatusColor(invoice.status)}`}>
                <Ionicons 
                  name={getStatusIcon(invoice.status) as any} 
                  size={12} 
                  color={invoice.status === 'paid' ? '#166534' : '#92400e'} 
                />
                <Text className={`text-xs font-medium ${getStatusColor(invoice.status)}`}>
                  {invoice.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
} 