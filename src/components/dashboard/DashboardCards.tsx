import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CardData {
  numberOfCustomers: number;
  numberOfInvoices: number;
  totalPaidInvoices: string;
  totalPendingInvoices: string;
}

interface DashboardCardsProps {
  data: CardData;
}

export default function DashboardCards({ data }: DashboardCardsProps) {
  const cards = [
    {
      title: 'Total Customers',
      value: data.numberOfCustomers.toString(),
      icon: 'people',
      color: 'bg-blue-500',
    },
    {
      title: 'Total Invoices',
      value: data.numberOfInvoices.toString(),
      icon: 'document-text',
      color: 'bg-green-500',
    },
    {
      title: 'Total Paid',
      value: data.totalPaidInvoices,
      icon: 'checkmark-circle',
      color: 'bg-yellow-500',
    },
    {
      title: 'Total Pending',
      value: data.totalPendingInvoices,
      icon: 'time',
      color: 'bg-red-500',
    },
  ];

  return (
    <View className="grid gap-4 grid-cols-2">
      {cards.map((card) => (
        <View
          key={card.title}
          className="rounded-xl bg-white p-6 shadow-sm"
        >
          <View className="flex flex-row items-center justify-between">
            <Text className="text-sm font-medium text-gray-600">
              {card.title}
            </Text>
            <View className={`rounded-full p-2 ${card.color}`}>
              <Ionicons name={card.icon as any} size={20} color="white" />
            </View>
          </View>
          <Text className="text-2xl font-bold text-gray-900 mt-2">
            {card.value}
          </Text>
        </View>
      ))}
    </View>
  );
} 