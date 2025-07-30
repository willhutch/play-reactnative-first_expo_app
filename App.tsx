import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';
import InvoicesScreen from './src/screens/InvoicesScreen';
import CustomersScreen from './src/screens/CustomersScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  // Show dashboard if authenticated
  if (isAuthenticated) {
    return (
      <NavigationContainer>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === 'Dashboard') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Invoices') {
                iconName = focused ? 'document-text' : 'document-text-outline';
              } else if (route.name === 'Customers') {
                iconName = focused ? 'people' : 'people-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              } else {
                iconName = 'help-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#3b82f6',
            tabBarInactiveTintColor: '#6b7280',
            tabBarStyle: {
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              borderTopColor: theme === 'dark' ? '#374151' : '#e5e7eb',
            },
            headerStyle: {
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            },
            headerTintColor: theme === 'dark' ? '#ffffff' : '#000000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen 
            name="Dashboard" 
            component={DashboardScreen}
            options={{ title: 'Dashboard' }}
          />
          <Tab.Screen 
            name="Invoices" 
            component={InvoicesScreen}
            options={{ title: 'Invoices' }}
          />
          <Tab.Screen 
            name="Customers" 
            component={CustomersScreen}
            options={{ title: 'Customers' }}
          />
          <Tab.Screen 
            name="Profile" 
            children={() => (
              <ProfileScreen 
                onSignOut={handleSignOut}
                onToggleTheme={toggleTheme}
                theme={theme}
              />
            )}
            options={{ title: 'Profile' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  // Show login form if not authenticated
  return (
    <View className={`flex-1 items-center justify-center p-5 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <Text className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        React Native Boilerplate
      </Text>
      <Text className={`text-base mb-8 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Please sign in to continue
      </Text>
      <TouchableOpacity
        className="w-full max-w-xs bg-blue-500 p-4 rounded-lg items-center mb-3"
        onPress={handleSignIn}
      >
        <Text className="text-white text-center font-semibold">Sign In (Demo)</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="w-full max-w-xs bg-green-500 p-4 rounded-lg items-center"
        onPress={toggleTheme}
      >
        <Text className="text-white text-center font-semibold">Toggle Theme</Text>
      </TouchableOpacity>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </View>
  );
}

