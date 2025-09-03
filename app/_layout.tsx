// app/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { AuthProvider, useAuth } from "../src/context/AuthContext";

function LoggedOutTabs() {
  // Só a tela de login, sem barra de abas
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" }, 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
        
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

function LoggedInTabs() {
 
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00BFFF",
        tabBarInactiveTintColor: "#aaa",
      }}
    >
      <Tabs.Screen
        name="cadastro"
        options={{
          title: "Cadastro",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="cadastrarAla" 
        options={{
          title: "Cadastro Ala",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="layers-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="mapa"
        options={{
          title: "Mapa",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="map" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="devs"
        options={{
          title: "Devs",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="logout"
        options={{
          title: "Logout",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="exit-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

function Gate() {
  const { isLogged } = useAuth();
  if (isLogged === null) return null; // opcional: Splash
  return isLogged ? <LoggedInTabs /> : <LoggedOutTabs />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
