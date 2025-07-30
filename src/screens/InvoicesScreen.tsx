import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import InvoicesTable from '../components/invoices/InvoicesTable';

const mockInvoices = [
  {
    id: '1',
    amount: '$2,000',
    date: '2024-01-15',
    status: 'paid' as const,
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
  },
  {
    id: '2',
    amount: '$1,500',
    date: '2024-01-14',
    status: 'pending' as const,
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
  },
  {
    id: '3',
    amount: '$3,000',
    date: '2024-01-13',
    status: 'paid' as const,
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
  },
  {
    id: '4',
    amount: '$4,500',
    date: '2024-01-12',
    status: 'pending' as const,
    name: 'Steven Tey',
    email: 'steven@tey.com',
  },
  {
    id: '5',
    amount: '$1,200',
    date: '2024-01-11',
    status: 'paid' as const,
    name: 'Sofia Davis',
    email: 'sofia@davis.com',
  },
];

export default function InvoicesScreen() {
  const handleInvoicePress = (id: string) => {
    console.log('Invoice pressed:', id);
    // In a real app, this would navigate to invoice details
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Invoices
        </Text>
        
        <InvoicesTable 
          invoices={mockInvoices}
          onInvoicePress={handleInvoicePress}
        />
      </View>
    </ScrollView>
  );
} 