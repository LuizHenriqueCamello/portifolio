import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Linking, Modal, Pressable, Animated, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const CATEGORIAS = ['Todos', 'Next.js', 'C', 'Social'];

// ── Dados dos projetos ────────────────────────────────────────────────────────

const PROJETOS = [
  {
    nome: 'E-commerce',
    resumo: 'Sistema de e-commerce para cliente real com painel administrativo.',
    descricao: 'Sistema de e-commerce desenvolvido com Next.js para um cliente real. Possui CRUD completo, produtos dinâmicos, categorias, coleções e banners editáveis pelo painel administrativo. Os produtos já utilizam banco de dados e futuramente o restante do sistema será integrado ao Supabase.',
    techs: ['Next.js', 'JavaScript', 'Vercel'],
    categoria: 'Next.js',
    status: 'Em andamento',
    icon: 'cart' as const,
    destaque: true,
    links: [
      { label: 'Abrir site', url: 'https://lutb.vercel.app', icone: 'globe-outline' as const, cor: '#3B82F6' },
    ],
    extras: [
      { label: 'CRUD de produtos e categorias', ok: true },
      { label: 'Coleções e banners editáveis', ok: true },
      { label: 'Painel administrativo', ok: true },
      { label: 'Deploy na Vercel', ok: true },
      { label: 'Integração Supabase completa', ok: false },
    ],
    colaborativo: false,
  },
  {
    nome: 'Jogo de Dados',
    resumo: 'Jogo multiplayer local de dados com Next.js — 5 rodadas, vence quem ganhar mais.',
    descricao: 'Jogo multiplayer local desenvolvido com Next.js onde dois jogadores disputam 5 rodadas de dados. Cada jogador possui dois dados e quem vencer mais rodadas ganha a partida.',
    techs: ['Next.js', 'JavaScript', 'Vercel'],
    categoria: 'Next.js',
    status: 'Concluído',
    icon: 'dice' as const,
    destaque: false,
    links: [
      { label: 'Ver vídeo', url: 'https://youtu.be/1Dyw4pwrORw?si=34noNlHDL7IRl-uv', icone: 'logo-youtube' as const, cor: '#EF4444' },
      { label: 'GitHub', url: 'https://github.com/LuizHenriqueCamello/jogodados1.git', icone: 'logo-github' as const, cor: '#9CA3AF' },
    ],
    extras: [],
    colaborativo: false,
  },
  {
    nome: 'Tabela Hash em C',
    resumo: 'Projeto acadêmico simulando sistema de login com tabela hash em C.',
    descricao: 'Projeto acadêmico em C simulando um sistema simples de login utilizando tabela hash para armazenamento e busca eficiente de usuários e senhas. Desenvolvido de forma colaborativa.',
    techs: ['C'],
    categoria: 'C',
    status: 'Concluído',
    icon: 'terminal' as const,
    destaque: false,
    links: [
      { label: 'Ver repositório', url: 'https://github.com/MarcelaCantalice/TabelaHashing.git', icone: 'logo-github' as const, cor: '#9CA3AF' },
    ],
    extras: [],
    colaborativo: true,
  },
  {
    nome: 'Biblioteca Comunitária',
    resumo: 'Presença digital da Biblioteca Caranguejo Tabaiares via Google Sites.',
    descricao: 'Projeto universitário de apoio à Biblioteca Comunitária Caranguejo Tabaiares. Foco em modernização do site existente, organização digital e auxílio técnico aos responsáveis pela biblioteca.',
    techs: ['Google Sites', 'Comunicação Digital', 'Redes Sociais'],
    categoria: 'Social',
    status: 'Em andamento',
    icon: 'book' as const,
    destaque: false,
    links: [],
    extras: [],
    colaborativo: true,
  },
];

type Projeto = typeof PROJETOS[0];

// ── Modal de detalhe do projeto ───────────────────────────────────────────────

function ProjetoModal({ visible, projeto, onClose }: {
  visible: boolean;
  projeto: Projeto | null;
  onClose: () => void;
}) {
  const slideAnim = useRef(new Animated.Value(height)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0, useNativeDriver: true, tension: 65, friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height, duration: 220, useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!projeto) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
          <Pressable onPress={() => {}}>
            <View style={styles.handle} />

            {/* Header */}
            <View style={styles.sheetHeader}>
              <View style={styles.sheetIconBox}>
                <Ionicons name={projeto.icon} size={22} color="#7C3AED" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.sheetTitleRow}>
                  <Text style={styles.sheetTitulo}>{projeto.nome}</Text>
                  {projeto.colaborativo && (
                    <View style={styles.colabBadge}>
                      <Ionicons name="people" size={10} color="#F59E0B" />
                      <Text style={styles.colabText}>Colaborativo</Text>
                    </View>
                  )}
                </View>
                <View style={styles.sheetStatusRow}>
                  <View style={[
                    styles.statusBadge,
                    projeto.status === 'Em andamento' ? styles.statusActive : styles.statusDone,
                  ]}>
                    <Text style={[
                      styles.statusText,
                      projeto.status === 'Em andamento' ? styles.statusTextActive : styles.statusTextDone,
                    ]}>
                      {projeto.status}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Ionicons name="close" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Techs */}
            <View style={styles.techRow}>
              {projeto.techs.map((t) => (
                <View key={t} style={styles.techChip}>
                  <Text style={styles.techText}>{t}</Text>
                </View>
              ))}
            </View>

            {/* Descrição */}
            <Text style={styles.sheetDescricao}>{projeto.descricao}</Text>

            {/* Extras (checklist) */}
            {projeto.extras.length > 0 && (
              <View style={styles.extrasSection}>
                {projeto.extras.map((ex, i) => (
                  <View key={i} style={styles.extraRow}>
                    <Ionicons
                      name={ex.ok ? 'checkmark-circle' : 'ellipse-outline'}
                      size={16}
                      color={ex.ok ? '#10B981' : '#3D3D5E'}
                    />
                    <Text style={[styles.extraText, !ex.ok && styles.extraTextPending]}>
                      {ex.label}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Links */}
            {projeto.links.length > 0 && (
              <View style={styles.linksSection}>
                {projeto.links.map((link, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[styles.linkBtn, { borderColor: link.cor + '55' }]}
                    onPress={() => Linking.openURL(link.url)}
                  >
                    <Ionicons name={link.icone} size={16} color={link.cor} />
                    <Text style={[styles.linkText, { color: link.cor }]}>{link.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

// ── Card animado ──────────────────────────────────────────────────────────────

function AnimatedCard({ children, onPress, style }: {
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 50 }).start()}
      onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }).start()}
      activeOpacity={1}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}

// ── Tela principal ────────────────────────────────────────────────────────────

export default function ProjetosScreen() {
  const [catAtiva, setCatAtiva] = useState('Todos');
  const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filtrados = catAtiva === 'Todos'
    ? PROJETOS
    : PROJETOS.filter((p) => p.categoria === catAtiva);

  const abrir = (proj: Projeto) => {
    setProjetoSelecionado(proj);
    setModalVisible(true);
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Projetos</Text>

        {/* Filtros */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtros}
          contentContainerStyle={{ gap: 8, paddingRight: 20 }}
        >
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.filtroBtn, catAtiva === cat && styles.filtroBtnActive]}
              onPress={() => setCatAtiva(cat)}
            >
              <Text style={[styles.filtroText, catAtiva === cat && styles.filtroTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Cards */}
        <View style={{ marginBottom: 32 }}>
          {filtrados.map((proj, idx) => (
            <AnimatedCard key={idx} style={styles.card} onPress={() => abrir(proj)}>
              {proj.destaque && (
                <View style={styles.destaqueTag}>
                  <Ionicons name="star" size={11} color="#F59E0B" />
                  <Text style={styles.destaqueText}>Destaque</Text>
                </View>
              )}

              <View style={styles.cardHeader}>
                <View style={styles.iconBox}>
                  <Ionicons name={proj.icon} size={20} color="#7C3AED" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.nomeProjeto}>{proj.nome}</Text>
                  {proj.colaborativo && (
                    <View style={styles.colabInline}>
                      <Ionicons name="people" size={11} color="#F59E0B" />
                      <Text style={styles.colabInlineText}>Colaborativo</Text>
                    </View>
                  )}
                </View>
                <View style={[
                  styles.statusBadge,
                  proj.status === 'Em andamento' ? styles.statusActive : styles.statusDone,
                ]}>
                  <Text style={[
                    styles.statusText,
                    proj.status === 'Em andamento' ? styles.statusTextActive : styles.statusTextDone,
                  ]}>
                    {proj.status}
                  </Text>
                </View>
              </View>

              <Text style={styles.resumoProjeto}>{proj.resumo}</Text>

              <View style={styles.techRow}>
                {proj.techs.map((t) => (
                  <View key={t} style={styles.techChip}>
                    <Text style={styles.techText}>{t}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.verMaisRow}>
                <Text style={styles.verMaisText}>Ver detalhes</Text>
                <Ionicons name="chevron-forward" size={14} color="#7C3AED" />
              </View>
            </AnimatedCard>
          ))}
        </View>
      </ScrollView>

      <ProjetoModal
        visible={modalVisible}
        projeto={projetoSelecionado}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

// ── Estilos ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F14' },
  content: { padding: 20 },
  pageTitle: { fontSize: 24, fontWeight: '800', color: '#F9FAFB', marginBottom: 16 },

  filtros: { marginBottom: 20 },
  filtroBtn: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#1E1E2A', borderWidth: 1, borderColor: '#2D2D3E',
  },
  filtroBtnActive: { backgroundColor: '#7C3AED', borderColor: '#7C3AED' },
  filtroText: { color: '#6B7280', fontSize: 13, fontWeight: '500' },
  filtroTextActive: { color: '#fff' },

  card: {
    backgroundColor: '#1A1A25', borderWidth: 1, borderColor: '#2D2D3E',
    borderRadius: 16, padding: 16, marginBottom: 12,
  },
  destaqueTag: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    alignSelf: 'flex-start', backgroundColor: '#F59E0B22',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, marginBottom: 10,
  },
  destaqueText: { color: '#F59E0B', fontSize: 11, fontWeight: '600' },

  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  iconBox: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: '#7C3AED22', alignItems: 'center', justifyContent: 'center',
  },
  nomeProjeto: { fontSize: 15, fontWeight: '700', color: '#F9FAFB' },
  colabInline: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 2 },
  colabInlineText: { fontSize: 10, color: '#F59E0B' },

  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
  statusActive: { backgroundColor: '#7C3AED22' },
  statusDone: { backgroundColor: '#10B98122' },
  statusText: { fontSize: 10, fontWeight: '600' },
  statusTextActive: { color: '#A78BFA' },
  statusTextDone: { color: '#34D399' },

  resumoProjeto: { fontSize: 13, color: '#9CA3AF', lineHeight: 19, marginBottom: 10 },
  techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 10 },
  techChip: {
    backgroundColor: '#7C3AED1A', borderWidth: 1, borderColor: '#7C3AED33',
    paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20,
  },
  techText: { color: '#A78BFA', fontSize: 11 },

  verMaisRow: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingTop: 8, borderTopWidth: 1, borderTopColor: '#2D2D3E',
  },
  verMaisText: { fontSize: 12, color: '#7C3AED', fontWeight: '600' },

  // Modal
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#16161F', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 20, paddingBottom: 36, maxHeight: height * 0.85,
  },
  handle: {
    width: 36, height: 4, borderRadius: 2,
    backgroundColor: '#3D3D5E', alignSelf: 'center', marginBottom: 20,
  },
  sheetHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, marginBottom: 12 },
  sheetIconBox: {
    width: 46, height: 46, borderRadius: 13,
    backgroundColor: '#7C3AED22', alignItems: 'center', justifyContent: 'center',
  },
  sheetTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  sheetTitulo: { fontSize: 18, fontWeight: '700', color: '#F9FAFB' },
  colabBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: '#F59E0B22', paddingHorizontal: 7, paddingVertical: 3, borderRadius: 20,
  },
  colabText: { fontSize: 10, color: '#F59E0B', fontWeight: '600' },
  sheetStatusRow: { marginTop: 4 },
  closeBtn: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#1E1E2A', alignItems: 'center', justifyContent: 'center',
  },

  sheetDescricao: { fontSize: 14, color: '#9CA3AF', lineHeight: 21, marginBottom: 14 },

  extrasSection: { gap: 8, marginBottom: 16 },
  extraRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  extraText: { fontSize: 13, color: '#D1D5DB' },
  extraTextPending: { color: '#4B5563' },

  linksSection: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  linkBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12,
    backgroundColor: '#1E1E2A', borderWidth: 1,
  },
  linkText: { fontSize: 13, fontWeight: '600' },
});