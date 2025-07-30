import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchRevenue } from '@/lib/data';
import { Revenue } from '@/lib/definitions';

const { width } = Dimensions.get('window');

export default async function RevenueChart() {
  const revenue = await fetchRevenue();
  
  // Simple bar chart implementation for React Native
  const maxRevenue = Math.max(...revenue.map((item) => item.revenue));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <View style={{ height: 200, marginTop: 16 }}>
          <View style={{ flexDirection: 'row', height: 150, alignItems: 'flex-end' }}>
            {revenue.map((item, index) => {
              const height = (item.revenue / maxRevenue) * 120;
              return (
                <View
                  key={item.month}
                  style={{
                    flex: 1,
                    marginHorizontal: 2,
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: height,
                      backgroundColor: '#3b82f6',
                      borderRadius: 4,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#6b7280',
                      marginTop: 8,
                      textAlign: 'center',
                    }}
                  >
                    {item.month}
                  </Text>
                </View>
              );
            })}
          </View>
          
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: 14, color: '#6b7280', textAlign: 'center' }}>
              Total Revenue: ${revenue.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
            </Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
} 