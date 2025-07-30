import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import DashboardCards from '../components/dashboard/DashboardCards';
import LatestInvoices from '../components/dashboard/LatestInvoices';

// Mock data - in a real app, this would come from your API
const mockCardData = {
  numberOfCustomers: 1008,
  numberOfInvoices: 2200,
  totalPaidInvoices: '$52,000',
  totalPendingInvoices: '$12,000',
};

const mockLatestInvoices = [
  {
    id: '1',
    amount: '$2,000',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '',
  },
  {
    id: '2',
    amount: '$1,500',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '',
  },
  {
    id: '3',
    amount: '$3,000',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '',
  },
];

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Dashboard
        </Text>
        
        {/* Cards */}
        <View className="mb-6">
          <DashboardCards data={mockCardData} />
        </View>
        
        {/* Latest Invoices */}
        <View>
          <LatestInvoices invoices={mockLatestInvoices} />
        </View>
      </View>
    </ScrollView>
  );
} 