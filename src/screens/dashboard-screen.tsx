import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { useSession, signOut } from '@/lib/auth-client';
import { useUIStore } from '@/lib/stores/ui-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CardWrapper from '@/components/dashboard/cards';
import LatestInvoices from '@/components/dashboard/latest-invoices';
import RevenueChart from '@/components/dashboard/revenue-chart';
import { cn } from '@/lib/utils';

export default function DashboardScreen() {
  const { data: session } = useSession();
  const { theme, addNotification } = useUIStore();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
      addNotification({
        type: 'success',
        title: 'Refreshed',
        message: 'Dashboard data has been updated',
      });
    }, 1000);
  }, [addNotification]);

  const handleSignOut = async () => {
    try {
      await signOut();
      addNotification({
        type: 'success',
        title: 'Signed Out',
        message: 'You have been signed out successfully',
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to sign out',
      });
    }
  };

  if (!session) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: '#6b7280' }}>
          Please sign in to view the dashboard
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f9fafb' }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ padding: 20 }}>
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <Text 
            style={{ 
              fontSize: 24, 
              fontWeight: 'bold',
              color: theme === 'dark' ? '#ffffff' : '#111827',
              marginBottom: 8,
            }}
          >
            Dashboard
          </Text>
          <Text 
            style={{ 
              fontSize: 16,
              color: theme === 'dark' ? '#9ca3af' : '#6b7280',
            }}
          >
            Welcome back, {session.user.email}
          </Text>
        </View>

        {/* Sign Out Button */}
        <View style={{ marginBottom: 24 }}>
          <Button 
            variant="outline" 
            onPress={handleSignOut}
            className="w-full"
          >
            <Text style={{ color: '#111827', fontWeight: '600' }}>
              Sign Out
            </Text>
          </Button>
        </View>

        {/* Cards Grid */}
        <View style={{ marginBottom: 24 }}>
          <Text 
            style={{ 
              fontSize: 18, 
              fontWeight: '600',
              color: theme === 'dark' ? '#ffffff' : '#111827',
              marginBottom: 16,
            }}
          >
            Overview
          </Text>
          <View style={{ gap: 16 }}>
            <CardWrapper />
          </View>
        </View>

        {/* Charts and Latest Data */}
        <View style={{ gap: 16 }}>
          <RevenueChart />
          <LatestInvoices />
        </View>
      </View>
    </ScrollView>
  );
} 