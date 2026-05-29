import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Tema
        tabBarActiveTintColor: '#7C3AED',
        tabBarInactiveTintColor: '#6B7280',

        // Barra inferior
        tabBarStyle: {
          backgroundColor: '#0F0F14',
          borderTopColor: '#1E1E2A',
          borderTopWidth: 1,

          // ↓ aumenta altura da barra
          height: Platform.OS === 'ios' ? 92 : 72,

          // ↓ cria "zona morta" inferior
          paddingBottom: Platform.OS === 'ios' ? 24 : 12,

          // ↓ sobe os ícones
          paddingTop: 6,
        },

        // ↓ sobe texto
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginBottom: 2,
        },

        // ↓ sobe ícones
        tabBarIconStyle: {
          marginTop: 2,
        },

        // Header
        headerStyle: {
          backgroundColor: '#0F0F14',
        },

        headerTintColor: '#F9FAFB',

        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },

        // ↓ impede efeito estranho de swipe horizontal
        sceneStyle: {
          backgroundColor: '#0F0F14',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={21}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={21}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="academico"
        options={{
          title: 'Acadêmico',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'school' : 'school-outline'}
              size={21}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profissional"
        options={{
          title: 'Atividades',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'rocket' : 'rocket-outline'}
              size={21}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="projetos"
        options={{
          title: 'Projetos',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'code-slash' : 'code-slash-outline'}
              size={21}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="jogo"
        options={{
          title: 'Jogo',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused
                  ? 'game-controller'
                  : 'game-controller-outline'
              }
              size={21}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}