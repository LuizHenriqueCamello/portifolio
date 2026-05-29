import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SwipeNavigator } from '../../components/SwipeNavigator';

const ATIVIDADES = [
  {
    titulo: 'Desenvolvimento de Projetos Pessoais',
    tipo: 'Desenvolvimento',
    periodo: '2026 – Presente',
    descricao:
      'Criação de projetos independentes para aprender tecnologias como Next.js, React Native e Expo. Foco em transformar conhecimento acadêmico em aplicações reais e publicadas.',
    icon: 'laptop-outline',
    destaque: true,
  },
  {
    titulo: 'Biblioteca Comunitária Caranguejo Tabaiares',
    tipo: 'Projeto Social',
    periodo: '2024',
    descricao:
      'Participação em projeto social envolvendo tecnologia, organização e presença digital de uma biblioteca comunitária. Contribuição com comunicação digital e ferramentas online.',
    icon: 'book-outline',
    destaque: false,
  },
  {
    titulo: 'Projetos Acadêmicos — UNICAP',
    tipo: 'Acadêmico',
    periodo: '2024 – Presente',
    descricao:
      'Desenvolvimento de projetos práticos nas disciplinas do curso, incluindo implementações em C (tabelas hash, estruturas de dados) e Java (orientação a objetos).',
    icon: 'school-outline',
    destaque: false,
  },
  {
    titulo: 'Aprendizado Contínuo',
    tipo: 'Desenvolvimento Pessoal',
    periodo: '2026 – Presente',
    descricao:
      'Estudo de React Native, Expo, Next.js e desenvolvimento web moderno através de aulas da disciplina Programação Web e Mobile.',
    icon: 'trending-up-outline',
    destaque: false,
  },
];

const tipoColor: Record<string, string> = {
  Desenvolvimento: '#7C3AED',
  'Projeto Social': '#10B981',
  Acadêmico: '#3B82F6',
  'Desenvolvimento Pessoal': '#F59E0B',
};

export default function ProfissionalScreen() {
  return (
    <SwipeNavigator>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Atividades</Text>

        <Text style={styles.subtitle}>
          Projetos, participações e desenvolvimento pessoal
        </Text>

        <View style={{ marginBottom: 32 }}>
          {ATIVIDADES.map((item, idx) => {
            const cor = tipoColor[item.tipo] ?? '#7C3AED';

            return (
              <View
                key={idx}
                style={[
                  styles.card,
                  item.destaque && styles.cardDestaque,
                ]}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconBox,
                      { backgroundColor: cor + '22' },
                    ]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={20}
                      color={cor}
                    />
                  </View>

                  <View
                    style={[
                      styles.tipoBadge,
                      { backgroundColor: cor + '22' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.tipoText,
                        { color: cor },
                      ]}
                    >
                      {item.tipo}
                    </Text>
                  </View>
                </View>

                <Text style={styles.titulo}>
                  {item.titulo}
                </Text>

                <View style={styles.metaRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={13}
                    color="#6B7280"
                  />

                  <Text style={styles.periodo}>
                    {item.periodo}
                  </Text>
                </View>

                <Text style={styles.descricao}>
                  {item.descricao}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SwipeNavigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F14',
  },

  content: {
    padding: 20,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F9FAFB',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 22,
  },

  card: {
    backgroundColor: '#1A1A25',
    borderWidth: 1,
    borderColor: '#2D2D3E',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  cardDestaque: {
    borderColor: '#7C3AED55',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tipoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  tipoText: {
    fontSize: 11,
    fontWeight: '600',
  },

  titulo: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 6,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },

  periodo: {
    fontSize: 12,
    color: '#6B7280',
  },

  descricao: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 20,
  },
});