import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
       <Tabs.Screen
        name="index" // ✅ agora a primeira aba usa index.tsx
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cadastro"
        options={{
          title: 'Cadastrar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: 'Escanear',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="qr-code-scanner" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="map" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="devs"
        options={{
          title: 'Devs',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
