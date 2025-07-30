import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';

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
      <View className={`flex-1 items-center justify-center p-5 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <Text className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Dashboard
        </Text>
        <Text className={`text-base mb-8 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Welcome to your dashboard!
        </Text>
        <TouchableOpacity
          className="w-full max-w-xs bg-blue-500 p-4 rounded-lg items-center mb-3"
          onPress={handleSignOut}
        >
          <Text className="text-white text-center font-semibold">Sign Out</Text>
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

