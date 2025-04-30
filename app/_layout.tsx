import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Tabs
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: 'black', borderTopColor: '#111' },
          tabBarActiveTintColor: '#00BFFF',
          tabBarInactiveTintColor: '#888',
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';
            if (route.name === 'index') iconName = 'home';
            else if (route.name === 'scanner') iconName = 'qr-code';
            else if (route.name === 'editar') iconName = 'create';
            else if (route.name === 'mapa') iconName = 'map';
            else if (route.name === 'devs') iconName = 'people';
            
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      />
    </SafeAreaProvider>
  );
}
