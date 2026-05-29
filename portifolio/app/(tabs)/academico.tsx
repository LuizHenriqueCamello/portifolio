import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SwipeNavigator } from '@/components/SwipeNavigator';

export default function AcademicoScreen() {
  return (
    <SwipeNavigator>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.pageTitle}>Formação Acadêmica</Text>

        {/* Graduação */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconBox}>
              <Ionicons name="school" size={20} color="#7C3AED" />
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Em andamento</Text>
            </View>
          </View>

          <Text style={styles.grau}>Bacharelado</Text>
          <Text style={styles.curso}>Ciência da Computação</Text>

          <View style={styles.metaRow}>
            <Ionicons name="business-outline" size={13} color="#6B7280" />
            <Text style={styles.metaText}>
              UNICAP — Universidade Católica de Pernambuco
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={13} color="#6B7280" />
            <Text style={styles.metaText}>
              2024.1 – Em andamento • 5º Período
            </Text>
          </View>

          <Text style={styles.descricao}>
            Curso focado em fundamentos de computação, algoritmos,
            estruturas de dados, desenvolvimento de software e matemática
            aplicada. Disciplinas cursadas incluem Programação Web e Mobile,
            Programação Orientada a Objetos, Álgebra Linear e Estruturas de Dados.
          </Text>
        </View>

        {/* Disciplinas relevantes */}
        <View style={[styles.section, { marginBottom: 32 }]}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="layers-outline" size={17} color="#7C3AED" />
            {'  '}
            Disciplinas Relevantes
          </Text>

          {[
            {
              nome: 'Programação estruturada em C',
              desc: 'Ponteiros, bubble sort e algoritmos fundamentais.',
            },
            {
              nome: 'Fundamentos da programação',
              desc: 'Lógica de programação, scripts e introdução a bibliotecas.',
            },
            {
              nome: 'Programação Orientada a Objetos',
              desc: 'Conceitos de OOP com Java: herança, encapsulamento e polimorfismo.',
            },
            {
              nome: 'Análise e requisitos de software',
              desc: 'Metodologias ágeis, documentação e ciclo de vida de software.',
            },
            {
              nome: 'Estruturas de Dados',
              desc: 'Listas, filas, pilhas, árvores e tabelas hash.',
            },
          ].map((disc, idx) => (
            <View key={idx} style={styles.discRow}>
              <View style={styles.discBullet} />

              <View style={styles.discInfo}>
                <Text style={styles.discNome}>{disc.nome}</Text>
                <Text style={styles.discDesc}>{disc.desc}</Text>
              </View>
            </View>
          ))}
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
    marginBottom: 22,
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 14,
  },

  card: {
    backgroundColor: '#1A1A25',
    borderWidth: 1,
    borderColor: '#2D2D3E',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#7C3AED22',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusBadge: {
    backgroundColor: '#7C3AED22',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#A78BFA',
  },

  grau: {
    fontSize: 11,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  curso: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 8,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },

  metaText: {
    fontSize: 13,
    color: '#9CA3AF',
    flex: 1,
  },

  descricao: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 20,
    marginTop: 8,
  },

  discRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
    gap: 12,
  },

  discBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7C3AED',
    marginTop: 5,
    flexShrink: 0,
  },

  discInfo: {
    flex: 1,
  },

  discNome: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F9FAFB',
    marginBottom: 2,
  },

  discDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 19,
  },
});