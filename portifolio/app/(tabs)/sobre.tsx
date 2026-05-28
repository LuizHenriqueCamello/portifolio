import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SKILLS = [
  { category: 'Mobile & Web', items: ['React Native', 'Expo', 'Next.js', 'React'] },
  { category: 'Linguagens', items: ['JavaScript', 'TypeScript', 'Python', 'C', 'Java'] },
  { category: 'Ferramentas', items: ['Git', 'GitHub', 'Vercel', 'HTML/CSS'] },
];

const IDIOMAS = [
  { lang: 'Português', level: 'Nativo', pct: 100 },
  { lang: 'Inglês', level: 'Intermediário', pct: 55 },
];

export default function SobreScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Perfil */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#7C3AED" />
        </View>
        <Text style={styles.name}>Luiz Henrique Camelo</Text>
        <Text style={styles.tagline}>Estudante de Ciência da Computação — UNICAP</Text>
        <Text style={styles.description}>
          Estou aprendendo desenvolvimento web e mobile, com foco em criar interfaces modernas e trabalhar com 
          lógica de programação. Tenho interesse em desenvolvimento de aplicações utilizando React Native, 
          Expo e Next.js, além de experiência acadêmica com programação em C e Python. Também participo de 
          projetos reais e acadêmicos envolvendo tecnologia e desenvolvimento de software.
        </Text>
      </View>

      {/* Habilidades */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="code-slash-outline" size={17} color="#7C3AED" />{'  '}Habilidades
        </Text>
        {SKILLS.map((group) => (
          <View key={group.category} style={styles.skillGroup}>
            <Text style={styles.skillCategory}>{group.category}</Text>
            <View style={styles.skillChips}>
              {group.items.map((item) => (
                <View key={item} style={styles.chip}>
                  <Text style={styles.chipText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Idiomas */}
      <View style={[styles.section, { marginBottom: 32 }]}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="globe-outline" size={17} color="#7C3AED" />{'  '}Idiomas
        </Text>
        {IDIOMAS.map((idioma) => (
          <View key={idioma.lang} style={styles.langRow}>
            <View style={styles.langInfo}>
              <Text style={styles.langName}>{idioma.lang}</Text>
              <Text style={styles.langLevel}>{idioma.level}</Text>
            </View>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${idioma.pct}%` as any }]} />
            </View>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F14' },
  content: { padding: 20 },

  profileCard: {
    backgroundColor: '#1A1A25', borderWidth: 1, borderColor: '#2D2D3E',
    borderRadius: 18, padding: 24, alignItems: 'center', marginBottom: 24,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#7C3AED22', borderWidth: 2, borderColor: '#7C3AED',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  name: { fontSize: 22, fontWeight: '700', color: '#F9FAFB', marginBottom: 4 },
  tagline: { fontSize: 13, color: '#A78BFA', marginBottom: 14, textAlign: 'center' },
  description: { fontSize: 14, color: '#9CA3AF', textAlign: 'center', lineHeight: 22 },

  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#F9FAFB', marginBottom: 14 },

  skillGroup: { marginBottom: 16 },
  skillCategory: {
    fontSize: 11, color: '#6B7280', fontWeight: '600',
    marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  skillChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: '#1E1E2A', borderWidth: 1, borderColor: '#7C3AED33',
    paddingHorizontal: 13, paddingVertical: 6, borderRadius: 20,
  },
  chipText: { color: '#A78BFA', fontSize: 13 },

  langRow: { marginBottom: 14 },
  langInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  langName: { color: '#F9FAFB', fontSize: 14, fontWeight: '500' },
  langLevel: { color: '#6B7280', fontSize: 12 },
  barBg: { height: 6, backgroundColor: '#1E1E2A', borderRadius: 3 },
  barFill: { height: 6, backgroundColor: '#7C3AED', borderRadius: 3 },
});