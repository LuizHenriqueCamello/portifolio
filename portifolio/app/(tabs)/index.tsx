import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
  Pressable,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const TECHS = [
  'React Native',
  'Expo',
  'Next.js',
  'JavaScript',
  'TypeScript',
  'Python',
  'C',
  'Java',
  'Vercel',
  'GitHub',
];

// ── Tipagem correta dos modais ───────────────────────────────────────────────

type ModalData = {
  titulo: string;
  subtitulo: string;
  icone: keyof typeof Ionicons.glyphMap;
  cor: string;
  conteudo: {
    label: string;
    valor: string;
  }[];
  descricao: string;
  topicos: string[];
  linkLabel: string | null;
  link: string | null;
};

// ── Dados dos modais ─────────────────────────────────────────────────────────

const MODAL_UNICAP: ModalData = {
  titulo: 'Ciência da Computação',
  subtitulo: 'UNICAP • 2024.1 – Em andamento',
  icone: 'school',
  cor: '#7C3AED',
  conteudo: [
    {
      label: 'Curso',
      valor: 'Bacharelado em Ciência da Computação',
    },
    {
      label: 'Instituição',
      valor: 'Universidade Católica de Pernambuco (UNICAP)',
    },
    {
      label: 'Período atual',
      valor: '5º Período',
    },
    {
      label: 'Início',
      valor: '2024.1',
    },
  ],
  descricao:
    'O curso cobre fundamentos de computação, algoritmos, estruturas de dados e desenvolvimento de software. Disciplinas cursadas incluem programação em C, Python, Java, Cálculo, Álgebra Linear e Engenharia de Software.',
  topicos: [
    'Lógica de programação e algoritmos',
    'Programação em C (estruturas de dados, ponteiros, tabelas hash)',
    'Python e introdução a bibliotecas',
    'Orientação a Objetos com Java',
    'Engenharia de Software e metodologias ágeis',
    'Desenvolvimento web e mobile (projetos práticos)',
    'Aprendizado contínuo e projetos independentes',
  ],
  linkLabel: null,
  link: null,
};

const MODAL_ECOMMERCE: ModalData = {
  titulo: 'E-commerce',
  subtitulo: 'Next.js + Vercel • lutb.vercel.app',
  icone: 'globe',
  cor: '#3B82F6',
  conteudo: [
    {
      label: 'Tecnologias',
      valor: 'Next.js, JavaScript, Vercel',
    },
    {
      label: 'Status',
      valor: 'Em andamento',
    },
    {
      label: 'Cliente',
      valor: 'Projeto real para cliente',
    },
  ],
  descricao:
    'Sistema de e-commerce desenvolvido com Next.js para um cliente real. Possui CRUD completo, produtos dinâmicos e painel administrativo.',
  topicos: [
    'CRUD de produtos e categorias',
    'Coleções e banners editáveis pelo painel',
    'Produtos com banco de dados integrado',
    'Deploy na Vercel com domínio ativo',
    'Painel administrativo para o cliente',
    'Futura integração completa com Supabase',
  ],
  linkLabel: 'Abrir site',
  link: 'https://lutb.vercel.app',
};

const MODAL_BIBLIOTECA: ModalData = {
  titulo: 'Biblioteca Comunitária',
  subtitulo: 'Caranguejo Tabaiares • Projeto social',
  icone: 'people',
  cor: '#10B981',
  conteudo: [
    {
      label: 'Tipo',
      valor: 'Projeto universitário / social',
    },
    {
      label: 'Ferramenta',
      valor: 'Google Sites',
    },
    {
      label: 'Status',
      valor: 'Em andamento',
    },
  ],
  descricao:
    'Projeto universitário de apoio à Biblioteca Comunitária Caranguejo Tabaiares, com foco em modernização da presença digital e organização online.',
  topicos: [
    'Modernização do site existente via Google Sites',
    'Organização digital do acervo e informações',
    'Auxílio técnico aos responsáveis pela biblioteca',
    'Apoio à presença digital da comunidade',
    'Projeto vinculado a atividade acadêmica da UNICAP',
  ],
  linkLabel: null,
  link: null,
};

// ── Componente Modal interno ─────────────────────────────────────────────────

function DetalheModal({
  visible,
  data,
  onClose,
}: {
  visible: boolean;
  data: ModalData | null;
  onClose: () => void;
}) {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!data) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Animated.View
          style={[
            styles.modalSheet,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Pressable onPress={() => {}}>
            <View style={styles.modalHandle} />

            <View style={styles.modalHeader}>
              <View
                style={[
                  styles.modalIconBox,
                  { backgroundColor: data.cor + '22' },
                ]}
              >
                <Ionicons
                  name={data.icone}
                  size={24}
                  color={data.cor}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.modalTitulo}>{data.titulo}</Text>
                <Text style={styles.modalSub}>{data.subtitulo}</Text>
              </View>

              <TouchableOpacity
                onPress={onClose}
                style={styles.modalCloseBtn}
              >
                <Ionicons name="close" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.metaGrid}>
              {data.conteudo.map((item, i) => (
                <View key={i} style={styles.metaItem}>
                  <Text style={styles.metaLabel}>{item.label}</Text>
                  <Text style={styles.metaValor}>{item.valor}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.modalDescricao}>
              {data.descricao}
            </Text>

            <View style={styles.topicosSection}>
              {data.topicos.map((topico, i) => (
                <View key={i} style={styles.topicoRow}>
                  <View
                    style={[
                      styles.topicoBullet,
                      { backgroundColor: data.cor },
                    ]}
                  />
                  <Text style={styles.topicoTexto}>{topico}</Text>
                </View>
              ))}
            </View>

            {data.link && data.linkLabel && (
              <TouchableOpacity
                style={[
                  styles.linkBtn,
                  { backgroundColor: data.cor },
                ]}
                onPress={() => Linking.openURL(data.link!)}
              >
                <Ionicons
                  name="open-outline"
                  size={16}
                  color="#fff"
                />
                <Text style={styles.linkBtnText}>
                  {data.linkLabel}
                </Text>
              </TouchableOpacity>
            )}
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

// ── Card animado ─────────────────────────────────────────────────────────────

function AnimatedCard({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
    }).start();

  const onPressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={1}
    >
      <Animated.View
        style={[style, { transform: [{ scale }] }]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}

// ── Tela principal ────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const [modalData, setModalData] =
    useState<ModalData | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const abrirModal = (data: ModalData) => {
    setModalData(data);
    setModalVisible(true);
  };

  const fecharModal = () => setModalVisible(false);

  const ProfileImage = () => {
    try {
      const img = require('../../assets/images/profile.jpg');

      return (
        <Image
          source={img}
          style={styles.avatarImage}
        />
      );
    } catch {
      return (
        <View style={styles.avatarFallback}>
          <Text style={styles.avatarInitials}>LH</Text>
        </View>
      );
    }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            styles.hero,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatarRing}>
              <ProfileImage />
            </View>

            <View style={styles.statusDot} />
          </View>

          <Text style={styles.name}>
            Luiz Henrique Camelo
          </Text>

          <Text style={styles.role}>
            Estudante de Ciência da Computação
          </Text>

          <Text style={styles.bio}>
            Aprendendo desenvolvimento web e mobile,
            com foco em interfaces modernas e lógica de
            programação. Trabalho com React Native,
            Expo e Next.js, tenho experiência acadêmica
            com C e Python e participo de projetos reais
            envolvendo tecnologia e desenvolvimento de
            software.
          </Text>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons
                name="school-outline"
                size={13}
                color="#A78BFA"
              />

              <Text style={styles.badgeText}>
                UNICAP
              </Text>
            </View>

            <View style={styles.badge}>
              <Ionicons
                name="time-outline"
                size={13}
                color="#A78BFA"
              />

              <Text style={styles.badgeText}>
                5º Período
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={[styles.section, { opacity: fadeAnim }]}
        >
          <Text style={styles.sectionTitle}>
            Tecnologias
          </Text>

          <View style={styles.techGrid}>
            {TECHS.map((tech) => (
              <View key={tech} style={styles.techChip}>
                <Text style={styles.techText}>
                  {tech}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View
          style={[styles.section, { opacity: fadeAnim }]}
        >
          <Text style={styles.sectionTitle}>
            Destaques
          </Text>

          <AnimatedCard
            style={styles.card}
            onPress={() => abrirModal(MODAL_UNICAP)}
          >
            <View style={styles.cardInner}>
              <View style={styles.cardIcon}>
                <Ionicons
                  name="school"
                  size={22}
                  color="#7C3AED"
                />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                  Ciência da Computação
                </Text>

                <Text style={styles.cardSub}>
                  UNICAP • 2024.1 – Em andamento
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={16}
                color="#3D3D5E"
              />
            </View>
          </AnimatedCard>

          <AnimatedCard
            style={styles.card}
            onPress={() => abrirModal(MODAL_ECOMMERCE)}
          >
            <View style={styles.cardInner}>
              <View
                style={[
                  styles.cardIcon,
                  { backgroundColor: '#3B82F622' },
                ]}
              >
                <Ionicons
                  name="globe"
                  size={22}
                  color="#3B82F6"
                />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                  E-commerce publicado
                </Text>

                <Text style={styles.cardSub}>
                  Next.js + Vercel • lutb.vercel.app
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={16}
                color="#3D3D5E"
              />
            </View>
          </AnimatedCard>

          <AnimatedCard
            style={styles.card}
            onPress={() => abrirModal(MODAL_BIBLIOTECA)}
          >
            <View style={styles.cardInner}>
              <View
                style={[
                  styles.cardIcon,
                  { backgroundColor: '#10B98122' },
                ]}
              >
                <Ionicons
                  name="people"
                  size={22}
                  color="#10B981"
                />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                  Biblioteca Comunitária
                </Text>

                <Text style={styles.cardSub}>
                  Caranguejo Tabaiares • Projeto social
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={16}
                color="#3D3D5E"
              />
            </View>
          </AnimatedCard>
        </Animated.View>

        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              marginBottom: 32,
            },
          ]}
        >
          <Text style={styles.sectionTitle}>
            Contato
          </Text>

          <View style={styles.emailBox}>
            <Ionicons
              name="mail-outline"
              size={16}
              color="#A78BFA"
            />

            <Text style={styles.emailText}>
              luiz.00000852839@unicap.br
            </Text>
          </View>

          <View style={styles.contactRow}>
            <TouchableOpacity
              style={styles.contactBtn}
              onPress={() =>
                Linking.openURL(
                  'https://github.com/LuizHenriqueCamello'
                )
              }
            >
              <Ionicons
                name="logo-github"
                size={20}
                color="#F9FAFB"
              />

              <Text style={styles.contactBtnText}>
                GitHub
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactBtn}
              onPress={() =>
                Linking.openURL(
                  'mailto:luiz.00000852839@unicap.br'
                )
              }
            >
              <Ionicons
                name="send-outline"
                size={18}
                color="#F9FAFB"
              />

              <Text style={styles.contactBtnText}>
                Enviar e-mail
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>

      <DetalheModal
        visible={modalVisible}
        data={modalData}
        onClose={fecharModal}
      />
    </>
  );
}

// ── Estilos ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F14',
  },

  content: {
    padding: 20,
  },

  hero: {
    alignItems: 'center',
    paddingVertical: 24,
  },

  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },

  avatarRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2.5,
    borderColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#1E1E2A',
  },

  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  avatarFallback: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#7C3AED22',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarInitials: {
    fontSize: 34,
    fontWeight: '700',
    color: '#A78BFA',
  },

  statusDot: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#0F0F14',
  },

  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 4,
    textAlign: 'center',
  },

  role: {
    fontSize: 14,
    color: '#A78BFA',
    marginBottom: 12,
    textAlign: 'center',
  },

  bio: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 21,
    paddingHorizontal: 8,
    marginBottom: 16,
  },

  badgeRow: {
    flexDirection: 'row',
    gap: 10,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#1E1E2A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2D2D3E',
  },

  badgeText: {
    fontSize: 12,
    color: '#D1D5DB',
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F9FAFB',
    marginBottom: 14,
  },

  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  techChip: {
    backgroundColor: '#1E1E2A',
    borderWidth: 1,
    borderColor: '#7C3AED44',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },

  techText: {
    color: '#A78BFA',
    fontSize: 13,
    fontWeight: '500',
  },

  card: {
    backgroundColor: '#1A1A25',
    borderWidth: 1,
    borderColor: '#2D2D3E',
    borderRadius: 14,
    marginBottom: 10,
  },

  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },

  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#7C3AED22',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F9FAFB',
    marginBottom: 2,
  },

  cardSub: {
    fontSize: 12,
    color: '#6B7280',
  },

  emailBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1A1A25',
    borderWidth: 1,
    borderColor: '#2D2D3E',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 10,
  },

  emailText: {
    fontSize: 13,
    color: '#D1D5DB',
    flex: 1,
  },

  contactRow: {
    flexDirection: 'row',
    gap: 10,
  },

  contactBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#1A1A25',
    borderWidth: 1,
    borderColor: '#2D2D3E',
    borderRadius: 12,
    paddingVertical: 12,
  },

  contactBtnText: {
    color: '#F9FAFB',
    fontSize: 13,
    fontWeight: '500',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },

  modalSheet: {
    backgroundColor: '#16161F',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 36,
    maxHeight: height * 0.82,
  },

  modalHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3D3D5E',
    alignSelf: 'center',
    marginBottom: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },

  modalIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalTitulo: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F9FAFB',
  },

  modalSub: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E1E2A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  metaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },

  metaItem: {
    backgroundColor: '#1E1E2A',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: '45%',
    flex: 1,
  },

  metaLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 3,
  },

  metaValor: {
    fontSize: 13,
    color: '#F9FAFB',
    fontWeight: '500',
  },

  modalDescricao: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 21,
    marginBottom: 14,
  },

  topicosSection: {
    gap: 8,
    marginBottom: 20,
  },

  topicoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },

  topicoBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    flexShrink: 0,
  },

  topicoTexto: {
    fontSize: 13,
    color: '#D1D5DB',
    lineHeight: 20,
    flex: 1,
  },

  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 14,
  },

  linkBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});